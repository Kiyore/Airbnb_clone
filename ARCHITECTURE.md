# Production-Scale Vacation Rental Marketplace Architecture

## Executive Summary
This document outlines the distributed system architecture for a global vacation-rental marketplace operating at Airbnb scale (100M+ listings, 1.5B+ cumulative guest arrivals, and 50,000+ peak search QPS). 

The architecture is partitioned into five distinct layers:
1. **Edge & Frontend Delivery Layer**
2. **API Gateway & Microservices Fabric**
3. **Geospatial Search & Real-Time Discovery Engine**
4. **Distributed Storage & Concurrency-Safe Booking Tier (Saga Pattern)**
5. **Multi-Region Cloud Infrastructure & Reliability Engineering**

A visual vector diagram is available in [`public/architecture-diagram.svg`](./public/architecture-diagram.svg) and interactively within the web application.

---

```
                       +-----------------------------------+
                       |    CLIENTS (Web, iOS, Android)    |
                       +-----------------+-----------------+
                                         |
                                         v
                       +-----------------------------------+
                       |    CLOUDFLARE ANYCAST EDGE CDN    |
                       |  (TLS 1.3, WAF, BotID, Edge SSR)  |
                       +-----------------+-----------------+
                                         |
                                         v
                       +-----------------------------------+
                       |        ENVOY API GATEWAY          |
                       | (Rate Limiting, GraphQL Router)   |
                       +-----------------+-----------------+
                                         |
         +-------------------------------+-------------------------------+
         |                               |                               |
         v                               v                               v
+-----------------+             +-----------------+             +-----------------+
| SEARCH SERVICE  |             | BOOKING SERVICE |             | LISTING SERVICE |
| (OpenSearch/H3) |             |  (Saga / Locks) |             | (Metadata/Media)|
+--------+--------+             +--------+--------+             +--------+--------+
         |                               |                               |
         +---------------+---------------+---------------+---------------+
                         |                               |
                         v                               v
         +-------------------------------+ +-------------------------------+
         |     REDIS CLUSTER (L1/L2)     | |      APACHE KAFKA CLUSTER     |
         | (Availability Bitmaps, Redlock| |  (CDC, Payment Events, Async) |
         +---------------+---------------+ +---------------+---------------+
                         |                               |
                         +---------------+---------------+
                                         |
                                         v
         +---------------------------------------------------------------+
         |             SHARDED POSTGRESQL CLUSTER (VITESS)               |
         |           (ACID Ledger, Read Replicas, Master HA)             |
         +---------------------------------------------------------------+
```

---

## 1. Frontend & Edge Scaling Strategy

### Edge Caching & Next.js SSR / ISR
- **Global Edge PoPs**: Cloudflare's Anycast network terminates TLS connections within 15–30ms of 95% of the world's population.
- **Incremental Static Regeneration (ISR)**: Static listing metadata (titles, photos, general amenities, neighborhood descriptions) is pre-rendered and cached at the Edge with a stale-while-revalidate window.
- **Dynamic Micro-Hydration**: Dynamic components such as the **Availability Calendar**, **Dynamic Pricing Widget**, and **User Wishlist Heart** are client-side hydrated via lightweight React hooks, avoiding full-page re-renders.
- **Image Pipeline**: High-resolution host photography is processed via a Serverless Lambda@Edge / Cloudflare Images pipeline that resizes images on the fly, applies intelligent chroma subsampling, and serves them in modern **AVIF** and **WebP** formats with responsive `srcset` definitions.

---

## 2. API Gateway & Microservices Fabric

### Envoy Proxy & GraphQL Federation
- **Envoy Proxy Gateway**: Handles authentication, protocol translation (HTTP/2 to gRPC), DDoS throttling, and route verification.
- **Federated GraphQL (Apollo Router / Hive)**: Exposes a single unified GraphQL schema composed from domain-driven subgraphs:
  - `SearchSubgraph`: Spatial radius, filters, keyword matches.
  - `BookingSubgraph`: Dates, party size, pricing quotes, transaction locks.
  - `ListingSubgraph`: Property specifications, house rules, host profiles.
  - `ReviewSubgraph`: Categorized score aggregates, verified guest ratings.
- **Inter-Service Communication**: Microservices communicate internally using **gRPC over HTTP/2** with Protobuf definitions, ensuring serialization speeds 7–10x faster than traditional REST JSON.

---

## 3. Geospatial Search & Real-Time Discovery Engine

### Uber H3 Spatial Indexing & OpenSearch
- **Spatial Grid Partitioning**: Conventional bounding box SQL queries degrade severely under heavy spatial load. This architecture utilizes **Uber's H3 Spatial Index** (discrete hexagonal hierarchical global grid). Every listing is indexed at H3 resolution 7 (~1.2 km² radius) and resolution 9 (~100 m² radius).
- **Sub-15ms Query Execution**: When a user pans or zooms the map over Candolim, Goa, the client queries H3 cell IDs. OpenSearch evaluates spatial containment using pre-computed integer cell indexes rather than trigonometric polygon math.
- **Availability Bitmaps**: Real-time calendar availability is encoded as 365-bit bitsets for each listing in Redis. A search query for dates *Oct 28 to Nov 2* executes an instantaneous bitwise `AND` operation against thousands of listings in microseconds.

---

## 4. Concurrency-Safe Booking & Saga Orchestration

### Preventing Double Bookings (Redlock & Saga Pattern)
- **Distributed Mutex (Redis Redlock)**: When a guest clicks "Reserve", the Booking Service acquires an atomic distributed lock on the composite key `listing:{id}:dates:{range}` in Redis with a 120-second TTL.
- **Saga Orchestrator State Machine**:
  ```
  [Start Booking]
         │
         ▼
  1. Acquire Redis Mutex (Redlock)
         │  ──(Failed: Room Taken)──► Emit Abort & Notify User
         ▼
  2. Create Pending Reservation in DB (PostgreSQL)
         │
         ▼
  3. Authorize Payment via Payment Gateway (Stripe / Razorpay)
         │  ──(Payment Declined)────► Release Mutex & Mark Canceled
         ▼
  4. Commit Reservation to PostgreSQL Master
         │
         ▼
  5. Publish 'booking.confirmed' Event to Apache Kafka
         │
         ▼
  6. Async Consumers: Send Email/SMS, Update Host Calendar, Notify Payout Service
  ```

---

## 5. Storage Tier & Database Sharding

### Sharded PostgreSQL via Vitess
- **Horizontal Sharding**: Data is sharded by `tenant_region_id` and `host_id` using **Vitess** as the sharding proxy layer. This ensures single-shard queries for 98% of operational transactions while providing cross-shard aggregation transparently when needed.
- **Read/Write Splitting**: Write operations (bookings, listing updates, review submissions) target the Primary Master instance. High-volume read traffic (reviews, host profile browsing) is distributed across regional read-replicas.
- **Change Data Capture (CDC)**: A **Debezium** CDC connector reads the PostgreSQL Write-Ahead Log (WAL) and streams changes to Kafka, keeping the OpenSearch cluster and Redis caches synchronized with under 200ms latency.
- **Media Persistence**: S3 multi-region buckets with Cross-Region Replication (CRR) provide 99.999999999% (11 9s) durability for uploaded images.

---

## 6. Multi-Region Deployment & Disaster Recovery

- **AWS EKS Multi-AZ Kubernetes**: Microservices are containerized with Docker and deployed across 3 Availability Zones (AZs) per region with Horizontal Pod Autoscalers (HPA) scaling pods based on CPU, memory, and custom Kafka consumer lag metrics.
- **GitOps Continuous Delivery**: Managed via **ArgoCD** with automated canary deployments and zero-downtime rolling updates.
- **Observability**: End-to-end tracing with OpenTelemetry, Prometheus metrics collection, Grafana dashboards, and Datadog APM monitors tracking p95 and p99 latency thresholds.

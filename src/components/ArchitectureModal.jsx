import React, { useState } from 'react';
import { X, Server, Database, Globe, Search, Cpu, Cloud, Shield, Layers, Download, Check } from 'lucide-react';

export default function ArchitectureModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('diagram');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadSVG = () => {
    const link = document.createElement('a');
    link.href = '/architecture-diagram.svg';
    link.download = 'vacation-rental-marketplace-architecture.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-gray-100 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-gray-900 via-slate-900 to-gray-800 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-400/30">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Production-Scale Vacation Rental Architecture
              </h2>
              <p className="text-xs text-gray-400">
                Airbnb-grade High Availability, Geospatial Search & Resilient Booking Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadSVG}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg border border-white/20 transition"
              title="Download Architecture SVG file"
            >
              {downloadSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloadSuccess ? 'Downloaded!' : 'Export Diagram'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition text-gray-300 hover:text-white"
              aria-label="Close architecture modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-6">
          <button
            onClick={() => setActiveTab('diagram')}
            className={`py-3 px-4 font-semibold text-sm border-b-2 transition ${
              activeTab === 'diagram'
                ? 'border-[#FF385C] text-[#FF385C]'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            Interactive Blueprint
          </button>
          <button
            onClick={() => setActiveTab('scaling')}
            className={`py-3 px-4 font-semibold text-sm border-b-2 transition ${
              activeTab === 'scaling'
                ? 'border-[#FF385C] text-[#FF385C]'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            Scaling Strategy Breakdown
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'diagram' ? (
            <div className="space-y-6">
              {/* Architecture Blueprint visual cards */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* 1. Frontend & Edge */}
                <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-sky-700 font-bold text-sm mb-2">
                      <Globe className="w-4 h-4" />
                      <span>1. Edge & CDN</span>
                    </div>
                    <ul className="text-xs text-sky-950 space-y-1.5">
                      <li>• Cloudflare Anycast CDN</li>
                      <li>• Global TLS Termination</li>
                      <li>• Next.js Edge SSR & ISR</li>
                      <li>• Responsive Image WebP/AVIF</li>
                    </ul>
                  </div>
                  <div className="mt-3 pt-2 border-t border-sky-200 text-[11px] font-semibold text-sky-700">
                    p99 Latency &lt; 45ms
                  </div>
                </div>

                {/* 2. Gateway & Auth */}
                <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm mb-2">
                      <Shield className="w-4 h-4" />
                      <span>2. API Gateway</span>
                    </div>
                    <ul className="text-xs text-indigo-950 space-y-1.5">
                      <li>• Envoy / Kong Gateway</li>
                      <li>• Bot Detection & Rate Limit</li>
                      <li>• Apollo GraphQL Federation</li>
                      <li>• JWT Auth & Permissions</li>
                    </ul>
                  </div>
                  <div className="mt-3 pt-2 border-t border-indigo-200 text-[11px] font-semibold text-indigo-700">
                    OAuth2 / mTLS
                  </div>
                </div>

                {/* 3. Microservices */}
                <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-purple-700 font-bold text-sm mb-2">
                      <Cpu className="w-4 h-4" />
                      <span>3. Core Services</span>
                    </div>
                    <ul className="text-xs text-purple-950 space-y-1.5">
                      <li>• Search & Geospatial</li>
                      <li>• Listing & Inventory</li>
                      <li>• Booking Orchestrator (Saga)</li>
                      <li>• Pricing & Dynamic Yield</li>
                    </ul>
                  </div>
                  <div className="mt-3 pt-2 border-t border-purple-200 text-[11px] font-semibold text-purple-700">
                    gRPC & Async Kafka
                  </div>
                </div>

                {/* 4. Storage & Search */}
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-amber-700 font-bold text-sm mb-2">
                      <Search className="w-4 h-4" />
                      <span>4. Search & Cache</span>
                    </div>
                    <ul className="text-xs text-amber-950 space-y-1.5">
                      <li>• OpenSearch H3 Hexagon</li>
                      <li>• Redis Cluster L1 Cache</li>
                      <li>• CDC Debezium Pipeline</li>
                      <li>• Distributed Redlock</li>
                    </ul>
                  </div>
                  <div className="mt-3 pt-2 border-t border-amber-200 text-[11px] font-semibold text-amber-700">
                    10M+ Listings / sec
                  </div>
                </div>

                {/* 5. Database & Cloud */}
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-2">
                      <Database className="w-4 h-4" />
                      <span>5. DB & Cloud</span>
                    </div>
                    <ul className="text-xs text-emerald-950 space-y-1.5">
                      <li>• PostgreSQL + Vitess Sharding</li>
                      <li>• AWS S3 Object Storage</li>
                      <li>• Multi-AZ EKS Kubernetes</li>
                      <li>• GitOps ArgoCD & Datadog</li>
                    </ul>
                  </div>
                  <div className="mt-3 pt-2 border-t border-emerald-200 text-[11px] font-semibold text-emerald-700">
                    99.999% SLA Uptime
                  </div>
                </div>
              </div>

              {/* High-Level SVG Architecture Flow Diagram */}
              <div className="p-4 bg-slate-900 rounded-2xl text-white shadow-inner overflow-x-auto">
                <div className="text-xs font-mono text-gray-400 mb-2">
                  System Dataflow Blueprint (End-to-End Request Pipeline)
                </div>
                <svg viewBox="0 0 900 320" className="w-full h-auto min-w-[700px]">
                  {/* Clients */}
                  <rect x="20" y="40" width="120" height="240" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <text x="80" y="70" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">Clients</text>
                  <text x="80" y="110" fill="#94a3b8" fontSize="11" textAnchor="middle">Next.js Web</text>
                  <text x="80" y="145" fill="#94a3b8" fontSize="11" textAnchor="middle">iOS App</text>
                  <text x="80" y="180" fill="#94a3b8" fontSize="11" textAnchor="middle">Android App</text>
                  <text x="80" y="215" fill="#94a3b8" fontSize="11" textAnchor="middle">Host Portal</text>

                  {/* Flow Arrow */}
                  <path d="M 140 160 L 190 160" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Edge CDN & Gateway */}
                  <rect x="190" y="40" width="140" height="240" rx="10" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                  <text x="260" y="70" fill="#818cf8" fontSize="14" fontWeight="bold" textAnchor="middle">Edge & Gateway</text>
                  <text x="260" y="110" fill="#cbd5e1" fontSize="11" textAnchor="middle">Cloudflare Anycast</text>
                  <text x="260" y="145" fill="#cbd5e1" fontSize="11" textAnchor="middle">Envoy Proxy</text>
                  <text x="260" y="180" fill="#cbd5e1" fontSize="11" textAnchor="middle">WAF & Rate Limiter</text>
                  <text x="260" y="215" fill="#cbd5e1" fontSize="11" textAnchor="middle">GraphQL Gateway</text>

                  {/* Flow Arrow */}
                  <path d="M 330 160 L 380 160" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Microservices Cluster */}
                  <rect x="380" y="20" width="220" height="280" rx="10" fill="#1e293b" stroke="#c084fc" strokeWidth="2" />
                  <text x="490" y="48" fill="#c084fc" fontSize="14" fontWeight="bold" textAnchor="middle">Kubernetes Microservices</text>
                  
                  <rect x="400" y="65" width="180" height="42" rx="6" fill="#334155" />
                  <text x="490" y="90" fill="#f8fafc" fontSize="11" fontWeight="600" textAnchor="middle">Search & Discovery (Geo)</text>

                  <rect x="400" y="120" width="180" height="42" rx="6" fill="#334155" />
                  <text x="490" y="145" fill="#f8fafc" fontSize="11" fontWeight="600" textAnchor="middle">Booking Saga Orchestrator</text>

                  <rect x="400" y="175" width="180" height="42" rx="6" fill="#334155" />
                  <text x="490" y="200" fill="#f8fafc" fontSize="11" fontWeight="600" textAnchor="middle">Listing & Calendar Service</text>

                  <rect x="400" y="230" width="180" height="42" rx="6" fill="#334155" />
                  <text x="490" y="255" fill="#f8fafc" fontSize="11" fontWeight="600" textAnchor="middle">Dynamic Pricing Engine</text>

                  {/* Flow Arrow */}
                  <path d="M 600 160 L 650 160" stroke="#c084fc" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Storage, Cache & Data Engine */}
                  <rect x="650" y="20" width="230" height="280" rx="10" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                  <text x="765" y="48" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle">Data & Storage Tier</text>

                  <rect x="670" y="65" width="190" height="42" rx="6" fill="#334155" />
                  <text x="765" y="90" fill="#f8fafc" fontSize="11" fontWeight="600" textAnchor="middle">OpenSearch (H3 Geo Cluster)</text>

                  <rect x="670" y="120" width="190" height="42" rx="6" fill="#334155" />
                  <text x="765" y="145" fill="#f8fafc" fontSize="11" fontWeight="600" textAnchor="middle">Redis Redlock Availability</text>

                  <rect x="670" y="175" width="190" height="42" rx="6" fill="#334155" />
                  <text x="765" y="200" fill="#f8fafc" fontSize="11" fontWeight="600" textAnchor="middle">PostgreSQL + Vitess Shards</text>

                  <rect x="670" y="230" width="190" height="42" rx="6" fill="#334155" />
                  <text x="765" y="255" fill="#f8fafc" fontSize="11" fontWeight="600" textAnchor="middle">AWS S3 + CloudFront (Images)</text>

                  {/* Marker definition */}
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-sm text-[#222222]">
              <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
                <h4 className="font-bold text-base text-[#222222] mb-2">
                  1. Frontend Scaling & Optimization
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Utilizes Next.js with Edge Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR). Critical static shell assets are cached at 300+ Edge POPs. Dynamic property calendars and pricing computations are hydrated via lightweight sub-second client hooks. Images are lazily fetched from global CDNs using modern AVIF/WebP formats with content-aware responsive srcsets.
                </p>
              </div>

              <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
                <h4 className="font-bold text-base text-[#222222] mb-2">
                  2. Backend Microservices & Saga Booking Orchestration
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Decoupled into autonomous microservices managed in Kubernetes. The <strong>Booking Orchestrator</strong> uses the <strong>Saga Pattern</strong> with compensating transactions: (1) Reserve inventory with Redis distributed Redlock &rarr; (2) Authorize payment via Stripe/Razorpay &rarr; (3) Commit DB transaction &rarr; (4) Send async notifications via Apache Kafka.
                </p>
              </div>

              <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
                <h4 className="font-bold text-base text-[#222222] mb-2">
                  3. Geospatial Search & Discovery (Uber H3 Indexing)
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Search handles tens of thousands of QPS using an OpenSearch / Elasticsearch cluster. Properties are indexed using <strong>Uber H3 Hexagonal Hierarchical Spatial Indexing</strong>, allowing instant radius and polygon queries across map boundaries. Real-time listing availability filters leverage inverted bitsets for microsecond filtering.
                </p>
              </div>

              <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
                <h4 className="font-bold text-base text-[#222222] mb-2">
                  4. Distributed Storage & Database Sharding
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Transactional integrity is guaranteed with horizontally sharded PostgreSQL orchestrated via <strong>Vitess</strong>. Read-replicas handle heavy browsing traffic while writes are routed through primary master nodes. Photos and media are stored in multi-region AWS S3 with CDN delivery.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

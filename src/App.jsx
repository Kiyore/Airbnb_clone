import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SubNavbar from './components/SubNavbar';
import ListingHeader from './components/ListingHeader';
import HeroGrid from './components/HeroGrid';
import OverviewInfo from './components/OverviewInfo';
import Highlights from './components/Highlights';
import Description from './components/Description';
import Amenities from './components/Amenities';
import CalendarPicker from './components/CalendarPicker';
import BookingCard from './components/BookingCard';
import ReviewsSection from './components/ReviewsSection';
import LocationSection from './components/LocationSection';
import HostProfile from './components/HostProfile';
import ThingsToKnow from './components/ThingsToKnow';
import Footer from './components/Footer';
import PhotoTourModal from './components/PhotoTourModal';
import LightboxModal from './components/LightboxModal';
import ShareModal from './components/ShareModal';
import AmenitiesModal from './components/AmenitiesModal';
import ReservationSuccessModal from './components/ReservationSuccessModal';
import { listingData } from './data/listingData';

export default function App() {
  // Navigation & Modals State
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [isSaved, setIsSaved] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);
  const [isReservationSuccessOpen, setIsReservationSuccessOpen] = useState(false);

  // SubNavbar Active Tab State
  const [activeTab, setActiveTab] = useState('photos');

  // Reservation & Calendar State (Default: Oct 18 to Oct 23, 2026 for 5 nights matching reference)
  const [checkIn, setCheckIn] = useState(new Date(2026, 9, 18));
  const [checkOut, setCheckOut] = useState(new Date(2026, 9, 23));
  const [guests, setGuests] = useState({ adults: 2, children: 0, infants: 0 });

  // Toast notification for Wishlist Save
  const [toastMessage, setToastMessage] = useState('');

  // All tour photos for lightbox
  const allTourPhotos = listingData.tourSections.flatMap((s) => s.photos);

  const handleToggleSave = () => {
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    setToastMessage(nextSaved ? 'Saved to your Wishlist!' : 'Removed from your Wishlist');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOpenTour = (startIdx = 0) => {
    setIsPhotoTourOpen(true);
  };

  const handleOpenLightbox = (index = 0) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleSelectPhotoForLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleGuestChange = (type, delta) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(type === 'adults' ? 1 : 0, prev[type] + delta),
    }));
  };

  const handleDateChange = (start, end) => {
    setCheckIn(start);
    setCheckOut(end);
  };

  const handleClearDates = () => {
    setCheckIn(null);
    setCheckOut(null);
  };

  const handleScrollToReviews = () => {
    const el = document.getElementById('reviews-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToCalendar = () => {
    const el = document.getElementById('calendar-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTabClick = (targetId, tabId) => {
    setActiveTab(tabId);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Main Navbar */}
      <Navbar savedCount={isSaved ? 1 : 0} />

      {/* Sticky Sub-Navigation Bar (Appears on scroll past hero) */}
      <SubNavbar
        pricing={listingData.pricing}
        rating={listingData.rating}
        onReserve={() => setIsReservationSuccessOpen(true)}
        activeTab={activeTab}
        onTabClick={handleTabClick}
      />

      {/* Main Listing View Container */}
      <main className="max-w-[1280px] mx-auto px-6 w-full flex-1">
        {/* Title & Action Buttons */}
        <ListingHeader
          title={listingData.title}
          onShare={() => setIsShareOpen(true)}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
        />

        {/* 5-Photo Hero Grid with "Show all photos" */}
        <div id="hero-section">
          <HeroGrid
            photos={listingData.photos}
            onOpenTour={handleOpenTour}
            onOpenLightbox={handleOpenLightbox}
          />
        </div>

        {/* Two-Column Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-8 pb-12">
          {/* Left Column (Details, Amenities, Calendar) */}
          <div className="lg:col-span-7 space-y-2">
            <OverviewInfo
              subtitle={listingData.subtitle}
              stats={listingData.stats}
              rating={listingData.rating}
              host={listingData.host}
              onScrollToReviews={handleScrollToReviews}
            />

            <Highlights highlights={listingData.highlights} />

            <Description
              description={listingData.description}
              sleepingArrangement={listingData.sleepingArrangement}
            />

            <div id="amenities-section">
              <Amenities
                amenities={listingData.amenities}
                onShowAll={() => setIsAmenitiesOpen(true)}
              />
            </div>

            <div id="calendar-section">
              <CalendarPicker
                checkIn={checkIn}
                checkOut={checkOut}
                onDateChange={handleDateChange}
                onClearDates={handleClearDates}
              />
            </div>
          </div>

          {/* Right Column (Sticky Reservation Widget with 10% Claim Banner) */}
          <div className="lg:col-span-5 relative">
            <BookingCard
              pricing={listingData.pricing}
              rating={listingData.rating}
              checkIn={checkIn}
              checkOut={checkOut}
              guests={guests}
              onGuestChange={handleGuestChange}
              onOpenCalendar={handleScrollToCalendar}
              onReserve={() => setIsReservationSuccessOpen(true)}
            />
          </div>
        </div>

        {/* Reviews Section with Laurel Wreath, 7-Column Breakdown & Topic Pills */}
        <div id="reviews-section">
          <ReviewsSection
            rating={listingData.rating}
            reviewRatings={listingData.reviewRatings}
            reviews={listingData.reviews}
            reviewTags={listingData.reviewTags}
          />
        </div>

        {/* Location & Map Section */}
        <div id="location-section">
          <LocationSection locationDetails={listingData.locationDetails} />
        </div>

        {/* Host Profile (Matching Reference Image 5) */}
        <HostProfile host={listingData.host} />

        {/* Things to Know */}
        <ThingsToKnow />
      </main>

      {/* Footer */}
      <Footer />

      {/* OVERLAY VIEW 1: Photo Tour Modal (Matching Reference Image 2 & 3) */}
      <PhotoTourModal
        isOpen={isPhotoTourOpen}
        onClose={() => setIsPhotoTourOpen(false)}
        tourSections={listingData.tourSections}
        onSelectPhotoForLightbox={handleSelectPhotoForLightbox}
        onShare={() => setIsShareOpen(true)}
      />

      {/* OVERLAY VIEW 2: Lightbox Modal (Single Photo Viewer) */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        photos={allTourPhotos}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
        onShare={() => setIsShareOpen(true)}
      />

      {/* Supporting Modals */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={listingData.title}
        photoUrl={listingData.photos[0].url}
      />

      <AmenitiesModal
        isOpen={isAmenitiesOpen}
        onClose={() => setIsAmenitiesOpen(false)}
        amenities={listingData.amenities}
      />

      <ReservationSuccessModal
        isOpen={isReservationSuccessOpen}
        onClose={() => setIsReservationSuccessOpen(false)}
        title={listingData.title}
        checkIn={checkIn}
        checkOut={checkOut}
        guests={guests}
        pricing={listingData.pricing}
      />

      {/* Wishlist Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#222222] text-white py-3 px-5 rounded-full shadow-2xl text-sm font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

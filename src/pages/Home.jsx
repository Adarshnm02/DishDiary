import React from 'react'
import Navbar from '../UIComponents/NavBar'
import HeroSection from '../UIComponents/HeroSection'
import BookingAd from "../UIComponents/BookingAd";
import Dishes from '@/UIComponents/Dishes';
import ReviewCarousel from '@/UIComponents/ReviewCarousel';

const Home = () => {
 
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <BookingAd/>
        <Dishes/>
        <ReviewCarousel/>
    </div>
  )
}

export default Home

import React from 'react'
import Navbar from '../UIComponents/NavBar'
import HeroSection from '../UIComponents/HeroSection'
import BookingAd from "../UIComponents/BookingAd";
import Dishes from '@/UIComponents/Dishes';
import ReviewCarousel from '@/UIComponents/ReviewCarousel';
import Footer from '@/UIComponents/Footer';

const Home = () => {
 
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <BookingAd/>
        <Dishes/>
        <ReviewCarousel/>
        <Footer/>
    </div>
  )
}

export default Home

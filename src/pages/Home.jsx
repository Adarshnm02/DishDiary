import React from 'react'
import Navbar from '../UIComponents/NavBar'
import HeroSection from '../UIComponents/HeroSection'
import RecipePromo from "../UIComponents/RecipePromo";
import Dishes from '@/UIComponents/Dishes';
import ReviewCarousel from '@/UIComponents/ReviewCarousel';
import Footer from '@/UIComponents/Footer';

const Home = () => {
 
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <RecipePromo/>
        <Dishes/>
        <ReviewCarousel/>
        <Footer/>
    </div>
  )
}

export default Home

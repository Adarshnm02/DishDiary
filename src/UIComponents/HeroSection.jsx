import React from 'react';
import { motion } from "framer-motion";
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";  

const HeroSection = () => {
  return (
    <div 
      className="relative h-[34vw] my-8 bg-cover bg-center mx-7 md:mx-20 rounded-2xl" 
      style={{ backgroundImage: 'url(/images/Dish.jpg)' }}
    >
      <motion.div 
        initial={{ opacity: 0, x: -100 }} 
        animate={{ opacity: 1, x: 0 }}   
        transition={{
          type: "spring",      
          stiffness: 60,       
          damping: 12,           
        }}
        className="absolute bottom-[10%] left-[6vw] max-w-[50%] flex flex-col items-start gap-[1.5vw] animate-fadeIn sm:left-[5vw] sm:max-w-[60%] sm:bottom-[8%] lg:max-w-[40%] lg:left-[8vw] lg:bottom-[12%]"
      >
        <h2 className="font-medium text-white text-[max(4.5vw,22px)] sm:text-[max(5vw,24px)] lg:text-[max(3.5vw,26px)]">
          Order your favorite food here
        </h2>
        <p className="text-white text-[1vw] sm:text-[1.2vw] lg:text-[0.9vw]">
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
        </p>
        <Button 
          className="bg-white text-[#747474] font-medium px-[2.3vw] py-[1vw] rounded-full text-[max(1vw,13px)] sm:px-[3vw] sm:py-[1.5vw] sm:text-[max(1.2vw,14px)] lg:px-[2vw] lg:py-[1.2vw] lg:text-[max(1vw,15px)] border-none"
        >
          <Menu icon="Menu" className="mr-2 h-4 w-4" />
          View Menu
        </Button>
      </motion.div>
    </div>
  );
}

export default HeroSection;

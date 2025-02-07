import React from "react";
import { motion } from "framer-motion";
import { Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="relative w-full px-4 sm:px-6 lg:px-8 mt-32">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[60vh] sm:h-[65vh] lg:h-[70vh] rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/Dish.jpg)",
            backgroundPosition: "center 30%",
          }}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 h-full flex flex-col justify-center max-w-2xl mx-auto sm:ml-12 lg:ml-24 p-6 sm:p-8"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Discover Your Next
            <span className="block text-orange-400">Favorite Dish</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-200 mb-8 max-w-xl"
          >
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise.
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-4">
            <Button
            onClick={() => navigate('/explore')} 
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 border-none">
              <Menu className="mr-2 h-5 w-5" />
              View Menu
            </Button>
            <Button
            onClick={() => navigate('/explore')}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-6 rounded-full text-lg font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105 border-white/30"
            >
              Explore More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChefHat, Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/UIComponents/NavBar";
import Footer from "@/UIComponents/Footer";

const NotFound = () => {
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
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-160px)] bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            variants={itemVariants}
            className="relative mb-8 inline-block"
          >
            <div className="absolute inset-0 bg-orange-200 rounded-full opacity-20 blur-2xl" />
            <ChefHat className="w-24 h-24 text-orange-500 relative z-10" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl font-bold text-gray-800 mb-4"
          >
            Oops! Recipe Not Found
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 mb-8"
          >
            Looks like this page is still cooking! Our chefs are working hard to
            prepare what you're looking for.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-lg mb-8"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              In the meantime, why not try:
            </h2>
            <ul className="text-gray-600 space-y-2">
              <li>• Exploring our delicious recipe collection</li>
              <li>• Checking out different cuisine categories</li>
              <li>• Finding inspiration for your next meal</li>
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => navigate("/")}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>

            <Button
              onClick={() => navigate("/explore")}
              variant="outline"
              className="hover:bg-orange-50"
            >
              <Search className="mr-2 h-4 w-4" />
              Explore Recipes
            </Button>

            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              className="hover:bg-orange-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-20 left-20 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-3xl" />
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;

import React from "react"
import { motion } from "framer-motion"
import { Utensils, ArrowRight, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

const RecipePromo = () => {
  const navigate = useNavigate()

  const features = [
    "Discover authentic recipes from around the world",
    "Step-by-step cooking instructions",
    "Complete ingredient lists with measurements"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  }

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-white overflow-hidden">
      <CardContent className="flex flex-col lg:flex-row items-center justify-between p-8 lg:p-12 gap-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center lg:text-left lg:w-1/2 flex flex-col items-center lg:items-start justify-center gap-6"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-4">
              Cooking Made Easy
            </span>
          </motion.div>

          <motion.h3
            variants={itemVariants}
            className="text-3xl lg:text-4xl font-bold leading-tight"
          >
            Explore delicious recipes from{" "}
            <span className="text-orange-600">master chefs</span>
          </motion.h3>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg"
          >
            Discover a world of culinary delights with our extensive collection of recipes. 
            From traditional favorites to modern cuisine, find the perfect dish for any occasion.
          </motion.p>

          <motion.ul
            variants={containerVariants}
            className="space-y-3 mt-2"
          >
            {features.map((feature, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-center gap-2 text-gray-700"
              >
                <Check className="h-5 w-5 text-orange-500" />
                {feature}
              </motion.li>
            ))}
          </motion.ul>
          
          <motion.div
            variants={itemVariants}
            className="flex gap-4 mt-4"
          >
            <Button
            onClick={() => navigate('/explore')}
             className="bg-orange-600 hover:bg-orange-700">
              <Utensils className="mr-2 h-4 w-4" />
              Explore Recipes
            </Button>
            <Button
            onClick={() => navigate('/explore')} 
            variant="outline" className="hover:bg-orange-50">
              View Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="lg:w-1/2 flex justify-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 12,
            delay: 0.3,
          }}
          viewport={{ once: true }}
        >
          {/* Decorative background element */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-200 rounded-full opacity-20 blur-3xl" />
          
          <motion.div
            className="grid grid-cols-2 gap-4 relative z-10"
            whileHover={{ rotate: -2 }}
            onClick={() => navigate('/explore')}
          >
            <img
              src="https://www.themealdb.com/images/category/beef.png"
              className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              alt="Delicious Beef Dish"
            />
            <img
              src="https://www.themealdb.com/images/category/chicken.png"
              className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              alt="Tasty Chicken Recipe"
            />
            <img
              src="https://www.themealdb.com/images/category/dessert.png"
              className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              alt="Sweet Dessert"
            />
            <img
              src="https://www.themealdb.com/images/category/pasta.png"
              className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              alt="Fresh Pasta Dish"
            />
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  )
}

export default RecipePromo
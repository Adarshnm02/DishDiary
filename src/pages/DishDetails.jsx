import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, ChefHat, Bookmark, Check } from 'lucide-react';
import Navbar from '@/UIComponents/NavBar';
import Footer from '@/UIComponents/Footer';

const DishDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const fetchDishDetails = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setDish(response.data.meals[0]);
      } catch (error) {
        console.error('Error fetching dish details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishDetails();
  }, [id]);

  const getIngredients = () => {
    if (!dish) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = dish[`strIngredient${i}`];
      const measure = dish[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  const getInstructions = () => {
    if (!dish) return [];
    return dish.strInstructions
      .split(/\r\n|\n|\r/)
      .filter(step => step.trim())
      .map(step => step.trim());
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!dish) {
    return <div>Dish not found</div>;
  }

  const instructions = getInstructions();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 mt-16">
        <div className="container mx-auto px-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-orange-500 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </motion.button>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative h-96"
            >
              <img
                src={dish.strMealThumb}
                alt={dish.strMeal}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">{dish.strMeal}</h1>
                    <div className="flex items-center text-white gap-4">
                      <span className="flex items-center">
                        <ChefHat className="w-5 h-5 mr-2" />
                        {dish.strCategory}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        30-45 mins
                      </span>
                      <span className="flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        4 servings
                      </span>
                    </div>
                  </div>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors">
                    <Bookmark className="w-5 h-5" />
                    Save Recipe
                  </button>
                </div>
              </div>
            </motion.div>

            <div className="p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                <div className="md:col-span-1">
                  <div className="bg-orange-50 rounded-xl p-6 sticky top-4">
                    <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                    <ul className="space-y-3">
                      {getIngredients().map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex items-center bg-white p-3 rounded-lg shadow-sm"
                        >
                          <img
                            src={`https://www.themealdb.com/images/ingredients/${item.ingredient}-Small.png`}
                            alt={item.ingredient}
                            className="w-10 h-10 object-cover rounded mr-3"
                          />
                          <span className="flex-1">
                            <span className="font-medium">{item.ingredient}</span>
                            <br />
                            <span className="text-sm text-gray-500">{item.measure}</span>
                          </span>
                          <Check className="w-5 h-5 text-gray-300" />
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h2 className="text-2xl font-semibold mb-6">Instructions</h2>
                  <div className="space-y-6">
                    {instructions.map((instruction, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className={`p-6 rounded-xl ${
                          activeStep === index ? 'bg-orange-50 border-2 border-orange-200' : 'bg-gray-50'
                        }`}
                        onClick={() => setActiveStep(index)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 leading-relaxed">{instruction}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DishDetails;
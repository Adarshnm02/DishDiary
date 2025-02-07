import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Search, ChevronRight, Utensils, ChevronLeft } from "lucide-react";
import Navbar from "@/UIComponents/NavBar";
import Footer from "@/UIComponents/Footer";

const Explore = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchDishes = async () => {
      setLoading(true);
      try {
        let response;
        if (selectedCategory === "All") {
          response = await axios.get(
            "https://www.themealdb.com/api/json/v1/1/search.php?s="
          );
        } else {
          response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
          );
        }
        const allDishes = response.data.meals || [];
        setDishes(allDishes);
        setTotalPages(Math.ceil(allDishes.length / itemsPerPage));
        setCurrentPage(1); // Reset to first page when changing category
      } catch (error) {
        console.error("Error fetching dishes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm.trim()) {
      const searchDishes = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
          );
          const searchResults = response.data.meals || [];
          setDishes(searchResults);
          setTotalPages(Math.ceil(searchResults.length / itemsPerPage));
          setCurrentPage(1);
        } catch (error) {
          console.error("Error searching dishes:", error);
        } finally {
          setLoading(false);
        }
      };
      const debounceTimer = setTimeout(searchDishes, 500);
      return () => clearTimeout(debounceTimer);
    } else {
      fetchDishes();
    }
  }, [selectedCategory, searchTerm]);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleDishClick = (dishId) => {
    navigate(`/dish/${dishId}`);
  };

  // Get current page items
  const getCurrentPageDishes = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return dishes.slice(indexOfFirstItem, indexOfLastItem);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 mt-16">
            {/* Categories Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:w-1/4"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategoryClick("All")}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left ${
                      selectedCategory === "All"
                        ? "bg-orange-100 text-orange-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span>All</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                  {categories.map((category) => (
                    <motion.button
                      key={category.idCategory}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCategoryClick(category.strCategory)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left ${
                        selectedCategory === category.strCategory
                          ? "bg-orange-100 text-orange-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <span>{category.strCategory}</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="md:w-3/4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for meals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </motion.div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
              ) : (
                <>
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl font-semibold mb-6"
                  >
                    {selectedCategory === "All"
                      ? "All Dishes"
                      : `${selectedCategory} Dishes`}
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {getCurrentPageDishes().map((dish) => (
                      <motion.div
                        key={dish.idMeal}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDishClick(dish.idMeal)}
                        className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
                      >
                        <div className="relative h-48">
                          <img
                            src={dish.strMealThumb}
                            alt={dish.strMeal}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                            {dish.strMeal}
                          </h3>
                          <p className="text-sm text-gray-500 mt-2">
                            {dish.strArea} •{" "}
                            {dish.strCategory || selectedCategory}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Pagination */}
                  {dishes.length > 0 && (
                    <div className="flex justify-center items-center mt-8 gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage((curr) => Math.max(curr - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg bg-white shadow-md disabled:opacity-50 hover:bg-orange-50"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="px-4 py-2 rounded-lg bg-white shadow-md">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setCurrentPage((curr) =>
                            Math.min(curr + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg bg-white shadow-md disabled:opacity-50 hover:bg-orange-50"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}

                  {dishes.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                      No dishes found. Try a different search or category.
                    </div>
                  )}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-16 text-center"
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="relative h-64">
                        <img
                          src={
                            categories.find(
                              (cat) => cat.strCategory === selectedCategory
                            )?.strCategoryThumb ||
                            "https://www.themealdb.com/images/category/miscellaneous.png"
                          }
                          alt="Category"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                          <h3 className="text-3xl font-bold mb-4">
                            Discover{" "}
                            {selectedCategory === "All"
                              ? "World Cuisine"
                              : selectedCategory}
                          </h3>
                          <p className="text-lg max-w-2xl mx-auto">
                            {selectedCategory === "All"
                              ? "Embark on a culinary journey through our diverse collection of world-class dishes. From comfort food to gourmet delights, find your next favorite meal here."
                              : `Satisfy your cravings with our delicious selection of ${selectedCategory.toLowerCase()} dishes. Fresh, flavorful, and ready to be served!`}
                          </p>
                          <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
                            Order Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Explore;

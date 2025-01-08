import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Dishes = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const getAllCategory = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  return (
    <div className="lg:mb-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 my-20"
      >
        <div>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-3">
            Explore Our Categories
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover a world of flavors and find your next favorite dish from
            our carefully curated categories
          </p>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mx-4 sm:mx-8 lg:mx-20">
        {currentCategories && currentCategories.length > 0 ? (
          currentCategories.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
              onClick={() => navigate(`/dishes/${item.strCategory}`)}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                <CardHeader className="p-4 space-y-0">
                  <div className="overflow-hidden rounded-lg">
                    <motion.img
                      src={item.strCategoryThumb}
                      alt={item.strCategory}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="text-center p-4">
                  <CardTitle className=" text-lg font-semibold">
                    {item.strCategory}
                  </CardTitle>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 py-8">
            No categories found
          </p>
        )}
      </div>


      <div className="flex justify-center mt-10">
        <Button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className="bg-orange-100 text-orange-600 hover:bg-orange-200 disabled:bg-gray-100 disabled:text-gray-400"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Prev
        </Button>
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-2 ${
              currentPage === index + 1
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-orange-100 text-orange-600 hover:bg-orange-200"
            }`}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className="bg-orange-100 text-orange-600 hover:bg-orange-200 disabled:bg-gray-100 disabled:text-gray-400"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default Dishes;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <div>
        <h2 className="text-5xl text-center mt-20 mb-10">Categories</h2>
        <p className="text-xl text-center mt-2 mb-5 text-gray-600">
          Explore our delicious categories and find your next favorite dish!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-5 mx-20">
        {currentCategories && currentCategories.length > 0 ? (
          currentCategories.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, transformOrigin: "center" }}
              className="cursor-pointer"
              onClick={() => navigate(`/dishes/${item.strCategory}`)}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <img
                    src={item.strCategoryThumb}
                    alt={item.strCategory}
                    className="w-full h-auto rounded-md"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-center text-lg font-semibold">
                    {item.strCategory}
                  </CardTitle>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full">No categories found</p>
        )}
      </div>

      <div className="flex justify-center mt-10">
        <Button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className="mx-2 bg-gray-200 text-black hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-500"
        >
          Previous
        </Button>
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-2 ${
              currentPage === index + 1
                ? "bg-gray-300 text-black hover:bg-gray-400"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className="mx-2 bg-gray-200 text-black hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-500"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Dishes;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from '@/UIComponents/NavBar';
import Footer from '@/UIComponents/Footer';


const CategoryDishes = () => {
    const { category } = useParams();
    const [dishes, setDishes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalDishes, setTotalDishes] = useState(0);
    const itemsPerPage = 12;

    const getDishesByCategory = async (page = 1) => {
        try {
            const response = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
            );

            const allDishes = response.data.meals || [];
            setTotalDishes(allDishes.length);

            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedDishes = allDishes.slice(startIndex, endIndex);

            setDishes(paginatedDishes);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getDishesByCategory(currentPage);
    }, [currentPage, category]);

    const totalPages = Math.ceil(totalDishes / itemsPerPage);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <main className="flex-grow">
                <motion.h2 
                    className="text-5xl text-center mt-20 mb-10"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {category} Dishes
                </motion.h2>
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {dishes.length > 0 ? (
                        dishes.map((dish, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <img
                                            src={dish.strMealThumb}
                                            alt={dish.strMeal}
                                            className="w-full h-auto rounded-t-lg"
                                        />
                                    </CardHeader>
                                    <CardContent>
                                        <CardTitle className="text-lg text-center">
                                            {dish.strMeal}
                                        </CardTitle>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-center text-lg col-span-full">No dishes found</p>
                    )}
                </motion.div>

                <div className="flex justify-center items-center mt-10 space-x-4">
                    <Button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span className="text-lg">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || totalDishes <= currentPage * itemsPerPage}
                    >
                        Next
                    </Button>
                </div>

                <motion.div 
                    className="mt-20 flex justify-center items-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="mr-10">
                        <img src="/images/Dish_in_table.jpg" className="w-[500px] rounded-2xl" alt="Burger" />
                    </div>
                    <div className="flex flex-col justify-center items-center text-center">
                        <h1 className="text-2xl font-semibold">Order your Food Now</h1>
                        <p>Are you hungry? Time for some food!</p>
                        <Button className="mt-4">Order Now</Button>
                    </div>
                </motion.div>
            </main>
            <Footer/>
        </div>
    );
};

export default CategoryDishes;

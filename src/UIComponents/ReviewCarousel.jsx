

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ReviewCarousel = () => {
    const [reviews, setReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const reviewsSet = [
      {
        userId: {
          profilePicture: "./images/image.png",
          userName: "John Doe",
        },
        review: "This platform is fantastic! The user experience is seamless, and the support team is highly responsive. Highly recommend it!",
      },
      {
        userId: {
          profilePicture: "./reviewPerson.png",
          userName: "Jane Smith",
        },
        review: "Amazing service, highly recommend it! Their features are robust, and the customization options are extensive. Great for business professionals!",
      },
      {
        userId: {
          profilePicture: "./images/image.png",
          userName: "Emily Johnson",
        },
        review: "Great experience overall! The platform is intuitive, and the analytics provided are invaluable for decision-making.",
      },
      {
        userId: {
          profilePicture: "./reviewPerson1.png",
          userName: "Michael Brown",
        },
        review: "A game-changer for managing projects. The collaborative features and real-time updates have significantly improved our workflow.",
      },
      {
        userId: {
          profilePicture: "./reviewPerson.png",
          userName: "Sophia Lee",
        },
        review: "Exceptional service! The integration with third-party tools is seamless, and the overall performance is outstanding.",
      },
      {
        userId: {
          profilePicture: "./reviewPerson3.png",
          userName: "David Wilson",
        },
        review: "I've been using this platform for over a year, and it consistently exceeds my expectations. The user interface is clean and easy to navigate.",
      }
    ];
    
    // Fetch reviews on component mount
    useEffect(() => {
        setReviews(reviewsSet);
      }, []);
  
    // Auto-rotate reviews every 5 seconds
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 5000);
  
      return () => clearInterval(timer);
    }, [reviews.length]);
  
    // Handle previous navigation
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    };
  
    // Handle next navigation
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };
  
    if (reviews.length === 0) {
      return <div>Loading reviews...</div>;
    }
  
    return (
      <div className="max-w-3xl mx-auto p-5 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full">
              <CardContent className="flex flex-col items-center text-center p-6">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={reviews[currentIndex].userId.profilePicture} alt={reviews[currentIndex].userId.userName} />
                  <AvatarFallback>{reviews[currentIndex].userId.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold">{reviews[currentIndex].userId.userName}</h3>
                <p className="text-sm text-gray-600 mt-2 mb-5">{reviews[currentIndex].review}</p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
        <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
          <Button variant="outline" size="icon" onClick={handlePrev} className="rounded-full">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNext} className="rounded-full">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-center mt-4">
          {reviews.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'}`}
              whileHover={{ scale: 1.2 }}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default ReviewCarousel;
  
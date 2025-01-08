"use client"

import React from "react"
import { motion } from "framer-motion"
import { BookOpen, ArrowRight, Check } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const BookingAd = () => {

  const features = [
    "Easy setup process",
    "No technical skills required",
    "Free to get started"
  ];

  const containerVariants = {
    hidden: {opacity: 0},
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
              Quick Setup
            </span>
          </motion.div>

          <motion.h3
            variants={itemVariants}
            className="text-3xl lg-text-4xl font-bold leading-tight"
          >
            Add online ordering to your website in{" "}
            <span className="text-orange-600">minutes</span>
          </motion.h3>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg"
            >
            Transform your website with our free online food ordering system. Let your customers order directly from your menu with zero hassle.
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
                <Check className="h-5 w-5 text-green-500" />
                {feature}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div 
            variants={itemVariants}
            className="flex gap-4 mt-4"
          >
            <Button className="bg-orange-600 hover:bg-orange-700">
              <BookOpen className="mr-2 h-4 w-4" />
              Start Now
            </Button>
            <Button variant="outline" className="hover:bg-orange-50">
              Learn More
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
          
          <motion.img
            src="/images/booking.png"
            className="w-full max-w-[600px] object-contain relative z-10 hover:scale-105 transition-transform duration-300"
            alt="Booking Illustration"
            whileHover={{ rotate: -2 }}
          />
        </motion.div>
      </CardContent>
    </Card>
  )
}

export default BookingAd


"use client"

import React from "react"
import { motion } from "framer-motion"
import { BookOpen } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const BookingAd = () => {
  return (
    <Card className="bg-background p-7">
      <CardContent className="flex flex-col lg:flex-row items-center justify-between p-6 lg:p-10">
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 12,
          }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center lg:text-left lg:w-1/2 flex flex-col items-center lg:items-start justify-center gap-4"
        >
          <h3 className="text-2xl lg:text-3xl font-semibold">
            How to add online ordering to your website in just a few minutes?
          </h3>
          <p className="text-muted-foreground ml-3">
            With our free online food ordering system, your clients can now order
            food online, straight from your website.
          </p>
          <Button variant="outline" className="mt-4">
            <BookOpen className="mr-2 h-4 w-4" />
            Add Online Ordering
          </Button>
        </motion.div>

        <div className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 12,
              delay: 0.2,
            }}
            src="/images/booking.png"
            className="w-full max-w-[600px] object-contain"
            alt="Booking Illustration"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingAd


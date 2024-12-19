import React from 'react'
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About DishDiary</h3>
            <p className="text-sm">
            DishDiary is your go-to platform for discovering delicious recipes and connecting with food enthusiasts around the world.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm hover:underline">Home</a></li>
              <li><a href="#" className="text-sm hover:underline">Recipes</a></li>
              <li><a href="#" className="text-sm hover:underline">Categories</a></li>
              <li><a href="#" className="text-sm hover:underline">About Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-2">Stay updated with our latest recipes!</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="bg-primary-foreground text-primary" />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2023 DishDiary. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Button variant="ghost" size="icon">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


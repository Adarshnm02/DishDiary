import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, PenSquare, Phone, User, LogOut, ChefHat, Compass } from 'lucide-react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

function Navbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    // <nav className="flex items-center justify-between p-7 bg-orange-200 border-b px-24">
    <nav className={`flex item-center px-24 justify-between fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-lg' 
        : 'bg-gradient-to-r from-orange-100 to-orange-200'
    }`}>
       <div className="w-full max-w-[1400px] mx-auto px-6 md:px-8 flex items-center justify-between h-20">
      <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors">
      <ChefHat className="h-8 w-8" />
      <span className="font-serif">DishDiary</span>
      </Link>

      <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="space-x-2">
            {[
              { path: "/", icon: Home, label: "Home" },
              { path: "/explore", icon: Compass, label: "Explore"},
              { path: "/404", icon: PenSquare, label: "Add a Review" },
              { path: "/404", icon: Phone, label: "Contact" },
            ].map(({ path, icon: Icon, label }) => (
              <NavigationMenuItem key={path}>
                <NavigationMenuLink asChild>
                  <Link
                    to={path}
                    className={`${navigationMenuTriggerStyle()} ${
                      isActiveRoute(path)
                        ? 'bg-orange-100 text-orange-800'
                        : 'hover:bg-orange-50'
                    } transition-all duration-200 transform hover:scale-105`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-orange-100 transition-colors">
            <User className="h-5 w-5 text-orange-600" />
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className='w-48'>
          <DropdownMenuItem className="hover:bg-orange-50 cursor-pointer">
            <User className='mr-2 h-4 w-4 text-orange-600'/>
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
          onSelect={handleLogout}
          className="hover:bg-orange-50 cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4 text-orange-600" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    </nav>
  );
}

export default Navbar
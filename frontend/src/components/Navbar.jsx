import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import avatarImg from "../assets/avatar.png";

const navigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const dropdownRef = useRef(null);
  const cartItems = useSelector(state => state.cart.cartItems);
  const { currentUser, logout } = useAuth();
  const token = localStorage.getItem('token');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogOut = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <nav className="max-w-screen-2xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left side */}
          <div className="flex items-center md:gap-16 gap-4">
            <Link to="/" className="hover:scale-110 transition-transform">
              <HiMiniBars3CenterLeft className="size-6 hover:text-blue-600 transition-colors" />
            </Link>

            {/* Search input */}
            <div className="relative sm:w-72 w-40">
              <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                <IoSearchOutline className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? 'text-blue-600' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search here"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center md:space-x-6 space-x-4">
            <div className="relative" ref={dropdownRef}>
              {currentUser ? (
                <>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <img
                      src={avatarImg}
                      alt="User avatar"
                      className={`size-8 rounded-full transition-all duration-300 ${
                        currentUser ? 'ring-2 ring-blue-500 hover:ring-blue-600' : ''
                      } ${isDropdownOpen ? 'ring-blue-600 scale-110' : ''}`}
                    />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden transform transition-all duration-200 ease-out">
                      <ul className="py-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              onClick={() => setIsDropdownOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                        <li className="border-t">
                          <button
                            onClick={handleLogOut}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : token ? (
                <Link to="/dashboard" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                  Dashboard
                </Link>
              ) : (
                <Link to="/login" className="hover:scale-110 transition-transform">
                  <FaUserAlt className="size-6 hover:text-blue-600 transition-colors" />
                </Link>
              )}
            </div>

            <button className="hidden sm:block hover:scale-110 transition-transform">
              <HiOutlineHeart className="size-6 hover:text-blue-600 transition-colors" />
            </button>

            <Link
              to="/cart"
              className="relative flex items-center gap-2 bg-primary hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-md"
            >
              <HiOutlineShoppingCart className="size-5" />
              {cartItems.length > 0 && (
                <span className="text-sm font-medium">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
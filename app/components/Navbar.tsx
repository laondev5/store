"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Heart,
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  Bell,
  MapPin,
  Phone,
  HelpCircle,
} from "lucide-react";
import { useCartStore } from "@/lib/stores/cart-store";
import { useWishlistStore } from "@/lib/stores/wishlist-store";
import { useProductStore } from "@/lib/stores/product-store";

export default function Navbar() {
  const { data: session } = useSession();
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { searchProducts } = useProductStore();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  const categories = [
    "Living Room",
    "Bedroom",
    "Dining Room",
    "Office",
    "Kitchen",
    "Bathroom",
    "Outdoor",
    "Lighting",
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchProducts(searchQuery);
      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target as Node)
      ) {
        setIsCategoryMenuOpen(false);
      }
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-100 py-2 text-sm hidden md:block">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-1" />
              <span>+1 (888) 123-4567</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Store Locator</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/help"
              className="text-gray-600 hover:text-black flex items-center"
            >
              <HelpCircle className="w-4 h-4 mr-1" />
              <span>Help & FAQs</span>
            </Link>
            {!session && (
              <Link
                href="/auth/signin"
                className="text-gray-600 hover:text-black"
              >
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="text-2xl font-bold">
              Furniro
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-6">
              <form onSubmit={handleSearch} className="relative w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for products, brands and more..."
                    className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-black"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-black">
                Home
              </Link>

              {/* Categories Dropdown */}
              <div className="relative" ref={categoryMenuRef}>
                <button
                  className="flex items-center text-gray-700 hover:text-black"
                  onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                >
                  <span>Categories</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                {isCategoryMenuOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg w-48 py-2 z-20">
                    {categories.map((category, index) => (
                      <Link
                        key={index}
                        href={`/shop?category=${encodeURIComponent(category)}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsCategoryMenuOpen(false)}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/shop" className="text-gray-700 hover:text-black">
                Shop
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-black">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-black">
                Contact
              </Link>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              {/* Account Dropdown */}
              <div className="relative" ref={accountMenuRef}>
                <button
                  className="text-gray-700 hover:text-black"
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                >
                  <User className="w-6 h-6" />
                </button>

                {isAccountMenuOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg w-48 py-2 z-20">
                    <Link
                      href="/auth/signin"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/register"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      Register
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <Link
                      href="/account/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/account/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/wishlist"
                className="text-gray-700 hover:text-black relative"
              >
                <Heart className="w-6 h-6" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="text-gray-700 hover:text-black relative"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-black"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-black py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              {/* Categories for Mobile */}
              <div className="relative">
                <button
                  className="flex items-center text-gray-700 hover:text-black py-2 w-full text-left"
                  onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-4 h-4 ml-1 transition-transform ${
                      isCategoryMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCategoryMenuOpen && (
                  <div className="pl-4 space-y-2 mt-2">
                    {categories.map((category, index) => (
                      <Link
                        key={index}
                        href={`/shop?category=${encodeURIComponent(category)}`}
                        className="block py-1 text-gray-700 hover:text-black"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/shop"
                className="text-gray-700 hover:text-black py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-black py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-black py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="border-t border-gray-200 pt-4">
                <Link
                  href="/auth/signin"
                  className="flex items-center text-gray-700 hover:text-black py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5 mr-2" />
                  <span>Sign In / Register</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

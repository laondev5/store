import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "@/components/ui/Footer";


export default function Blog() {
  // Dummy blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Going all-in with millennial design",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      category: "Wood",
      date: "14 Oct 2022",
      author: "Admin",
      image: "/images/blog1.jpg",
      comments: 3,
    },
    {
      id: 2,
      title: "Exploring new ways of decorating",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      category: "Handmade",
      date: "14 Oct 2022",
      author: "Admin",
      image: "/images/blog2.jpg",
      comments: 5,
    },
    {
      id: 3,
      title: "Handmade pieces that took time to make",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      category: "Wood",
      date: "14 Oct 2022",
      author: "Admin",
      image: "/images/blog3.jpg",
      comments: 7,
    },
  ];

  // Dummy categories data
  const categories = [
    { id: 1, name: "Furniture", count: 2 },
    { id: 2, name: "Design", count: 8 },
    { id: 3, name: "Handmade", count: 7 },
    { id: 4, name: "Interior", count: 1 },
    { id: 5, name: "Wood", count: 6 },
  ];

  // Dummy recent posts data
  const recentPosts = [
    {
      id: 1,
      title: "Going all-in with millennial design",
      date: "14 Oct 2022",
      image: "/images/recent1.jpg",
    },
    {
      id: 2,
      title: "Exploring new ways of decorating",
      date: "14 Oct 2022",
      image: "/images/recent2.jpg",
    },
    {
      id: 3,
      title: "Handmade pieces that took time to make",
      date: "14 Oct 2022",
      image: "/images/recent3.jpg",
    },
    {
      id: 4,
      title: "Colorful office interiors",
      date: "14 Oct 2022",
      image: "/images/recent4.jpg",
    },
    {
      id: 5,
      title: "Modern home in Milan",
      date: "14 Oct 2022",
      image: "/images/recent5.jpg",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Page Header */}
      <section className="relative h-[200px] bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-10 h-10 text-amber-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4H10V10H6V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 4H18V8H14V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 12H18V20H14V12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 14H10V20H6V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog</h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Link href="/" className="hover:text-amber-600">Home</Link>
            <span>❯</span>
            <span>Blog</span>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content - Blog Posts */}
            <div className="w-full md:w-2/3">
              {blogPosts.map((post) => (
                <div key={post.id} className="mb-16">
                  <div className="mb-6 rounded-lg overflow-hidden bg-gray-200 h-[400px] relative">
                    <div className="absolute inset-0 bg-gray-300"></div>
                    {/* Blog image would go here */}
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" className="w-4 h-4">
                        <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="currentColor"/>
                        <path d="M8 9C3.58172 9 0 12.5817 0 17H16C16 12.5817 12.4183 9 8 9Z" fill="currentColor"/>
                      </svg>
                      <span>{post.author}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" className="w-4 h-4">
                        <path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="currentColor" fillOpacity="0.2"/>
                        <path d="M8 3.5V8L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      <span>{post.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" className="w-4 h-4">
                        <path d="M2 0C0.9 0 0 0.9 0 2V11C0 12.1 0.9 13 2 13H3V16L6 13H14C15.1 13 16 12.1 16 11V2C16 0.9 15.1 0 14 0H2Z" fill="currentColor" fillOpacity="0.2"/>
                        <path d="M5 7H11M5 4H11M5 10H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{post.comments}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" className="w-4 h-4">
                        <path d="M15.2 6.4L9.6 0.8C9.2 0.4 8.8 0 8 0H2C0.8 0 0 0.8 0 2V8C0 8.8 0.4 9.2 0.8 9.6L6.4 15.2C6.8 15.6 7.2 16 8 16C8.8 16 9.2 15.6 9.6 15.2L15.2 9.6C15.6 9.2 16 8.8 16 8C16 7.2 15.6 6.8 15.2 6.4Z" fill="currentColor" fillOpacity="0.2"/>
                        <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" fill="currentColor"/>
                      </svg>
                      <span>{post.category}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-semibold mb-4">
                    <Link href={`/blog/${post.id}`} className="hover:text-amber-600">
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  
                  <Link 
                    href={`/blog/${post.id}`}
                    className="text-amber-700 font-medium inline-block"
                  >
                    Read more
                  </Link>
                </div>
              ))}
              
              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <Link 
                    href="#" 
                    className="w-8 h-8 flex items-center justify-center bg-amber-700 text-white"
                  >
                    1
                  </Link>
                  <Link 
                    href="#" 
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200"
                  >
                    2
                  </Link>
                  <Link 
                    href="#" 
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200"
                  >
                    3
                  </Link>
                  <Link 
                    href="#" 
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200"
                  >
                    Next
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="w-full md:w-1/3">
              {/* Search */}
              <div className="mb-8">
                <div className="flex border border-gray-300 rounded overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full p-3 focus:outline-none"
                  />
                  <button className="bg-gray-100 px-4 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Categories */}
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-6">Categories</h3>
                <ul className="space-y-3">
                  {categories.map((category) => (
                    <li key={category.id} className="flex justify-between items-center">
                      <Link href="#" className="text-gray-600 hover:text-amber-600">
                        {category.name}
                      </Link>
                      <span className="text-gray-400">{category.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Recent Posts */}
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-6">Recent Posts</h3>
                <div className="space-y-6">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 relative">
                        <div className="absolute inset-0 bg-gray-300 rounded-lg"></div>
                        {/* Thumbnail image would go here */}
                      </div>
                      <div>
                        <h4 className="font-medium mb-1 line-clamp-2">
                          <Link href="#" className="hover:text-amber-600">
                            {post.title}
                          </Link>
                        </h4>
                        <p className="text-sm text-gray-400">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
} 
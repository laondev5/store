import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="relative h-[200px] bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-10 h-10 text-amber-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">About Us</h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Link href="/" className="hover:text-amber-600">Home</Link>
            <span>❯</span>
            <span>About</span>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Furniro is a global furniture retailer founded in 2020 with a vision to create a better everyday life for people who
              love their homes. We offer a wide range of well-designed, functional home furnishing products at prices so low that as
              many people as possible can afford them.
            </p>
            <p className="text-gray-600">
              Our business idea supports this vision by offering a wide range of well-designed, functional home furnishing products 
              at prices so low that as many people as possible will be able to afford them.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="h-[400px] bg-gray-200 rounded-lg"></div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                Our mission is to offer a wide range of well-designed, functional home furnishing products at prices 
                so low that as many people as possible will be able to afford them.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-amber-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Best quality materials</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-amber-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Modern and functional design</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-amber-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Production with care and precision</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-amber-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Support of local craftsmen</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Team Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((member) => (
                <div key={member}>
                  <div className="rounded-full w-48 h-48 bg-gray-200 mx-auto mb-6"></div>
                  <h3 className="text-xl font-semibold mb-1">John Doe</h3>
                  <p className="text-amber-600 mb-3">Founder & CEO</p>
                  <p className="text-gray-600 mb-4">
                    With over 15 years of experience in furniture design and retail.
                  </p>
                  <div className="flex justify-center space-x-3">
                    <a href="#" className="text-gray-400 hover:text-amber-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-amber-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-amber-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="py-12 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-700 mb-2">7</div>
                <p className="text-gray-600">Years of Experience</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-700 mb-2">10k+</div>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-700 mb-2">15k+</div>
                <p className="text-gray-600">Products Sold</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-700 mb-2">25+</div>
                <p className="text-gray-600">Awards Won</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
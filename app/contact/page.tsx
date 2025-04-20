import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "@/components/ui/Footer";


export default function Contact() {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Page Header */}
      <section className="relative h-[200px] bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-10 h-10 text-amber-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact</h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Link href="/" className="hover:text-amber-600">Home</Link>
            <span>❯</span>
            <span>Contact</span>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get In Touch With Us</h2>
            <p className="text-gray-600">
              For More Information About Our Product & Services. Please Feel Free To Drop Us 
              An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6">
                      <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 21C16.4183 17 20 13.4183 20 10C20 6.13401 16.4183 3 12 3C7.58172 3 4 6.13401 4 10C4 13.4183 7.58172 17 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Address</h3>
                  <p className="text-gray-600">
                    236 5th SE Avenue, New<br />
                    York NY10000, United<br />
                    States
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6">
                      <path d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14.0993 20.763 10.4202 19.1065 7.65683 16.3432C4.8935 13.5798 3.23705 9.90074 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <p className="text-gray-600">
                    Mobile: +(84) 546-6789<br />
                    Hotline: +(84) 456-6789
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Working Time</h3>
                  <p className="text-gray-600">
                    Monday-Friday: 9:00 -<br />
                    22:00<br />
                    Saturday-Sunday: 9:00 -<br />
                    21:00
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form>
                <div className="mb-6">
                  <label htmlFor="name" className="block mb-2">Your name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Abc"
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2">Email address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Abc@def.com"
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="This is an optional"
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Hi! I'd like to ask about"
                    className="w-full p-3 border border-gray-300 rounded"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-amber-700 text-white font-medium uppercase tracking-wide"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
} 
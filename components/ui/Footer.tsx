import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-amber-50 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <span className="text-xl font-bold">
                Funiro.
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              400 University Drive Suite 200 Coral Gables,<br />
              FL 33134 USA
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-600 hover:text-amber-600">Home</Link></li>
              <li><Link href="/shop" className="text-gray-600 hover:text-amber-600">Shop</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-amber-600">About</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-amber-600">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Help</h4>
            <ul className="space-y-3">
              <li><Link href="/payment" className="text-gray-600 hover:text-amber-600">Payment Options</Link></li>
              <li><Link href="/returns" className="text-gray-600 hover:text-amber-600">Returns</Link></li>
              <li><Link href="/privacy" className="text-gray-600 hover:text-amber-600">Privacy Policies</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Newsletter</h4>
            <div className="flex border-b border-gray-400">
              <input 
                type="email" 
                placeholder="Enter Your Email Address" 
                className="bg-transparent p-2 w-full focus:outline-none" 
              />
              <button className="uppercase text-xs font-bold p-2">Subscribe</button>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-200 text-sm text-gray-600">
          <p>2023 furino. All rights reserved</p>
        </div>
      </div>
      
     
    </footer>
  );
};

export default Footer; 
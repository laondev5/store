import CartClient from "@/app/components/CartClient"
import Navbar from "../components/Navbar"   
import Footer from "@/components/ui/Footer"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CartClient />
      <Footer />
    </div>
  )
} 
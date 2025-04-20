'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Tags, 
  Truck, 
  FileText, 
  Settings, 
  Menu, 
  X,
  ChevronDown,
  LogOut,
  User,
  Bell,
  MessageSquare
} from 'lucide-react'

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href: string
  active: boolean
  subItems?: { label: string; href: string }[]
}

function SidebarItem({ icon, label, href, active, subItems }: SidebarItemProps) {
  const [expanded, setExpanded] = useState(false)
  const hasSubItems = subItems && subItems.length > 0
  const pathname = usePathname()
  
  return (
    <div>
      <div 
        className={`flex items-center px-4 py-3 ${
          active && !hasSubItems ? 'bg-[#B88E2F] text-[#ffffff]' : 'text-gray-700 hover:bg-gray-100'
        } rounded-md transition-colors cursor-pointer`} 
        onClick={() => hasSubItems ? setExpanded(!expanded) : null}
      >
        {hasSubItems ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <span className="mr-3">{icon}</span>
              <span>{label}</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </div>
        ) : (
          <Link href={href} className="flex items-center w-full">
            <span className="mr-3">{icon}</span>
            <span>{label}</span>
          </Link>
        )}
      </div>
      
      {hasSubItems && expanded && (
        <div className="ml-8 mt-1 space-y-1">
          {subItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.href}
              className={`block py-2 px-3 rounded-md ${
                active && pathname === item.href 
                  ? 'bg-[#B88E2F] bg-opacity-20 text-[#B88E2F]' 
                  : 'text-gray-600 hover:bg-gray-100'
              } text-sm transition-colors`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()
  
  const sidebarItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: 'Dashboard',
      href: '/admin',
      active: pathname === '/admin'
    },
    {
      icon: <Users size={20} />,
      label: 'Users',
      href: '/admin/users',
      active: pathname.startsWith('/admin/users'),
      subItems: [
        { label: 'All Users', href: '/admin/users' },
        { label: 'Add User', href: '/admin/users/add' }
      ]
    },
    {
      icon: <ShoppingBag size={20} />,
      label: 'Products',
      href: '/admin/products',
      active: pathname.startsWith('/admin/products'),
      subItems: [
        { label: 'All Products', href: '/admin/products' },
        { label: 'Add Product', href: '/admin/products/add' },
        { label: 'Categories', href: '/admin/products/categories' }
      ]
    },
    {
      icon: <Tags size={20} />,
      label: 'Orders',
      href: '/admin/orders',
      active: pathname.startsWith('/admin/orders')
    },
    {
      icon: <Truck size={20} />,
      label: 'Shipping',
      href: '/admin/shipping',
      active: pathname.startsWith('/admin/shipping')
    },
    {
      icon: <FileText size={20} />,
      label: 'Content',
      href: '/admin/content',
      active: pathname.startsWith('/admin/content'),
      subItems: [
        { label: 'FAQs', href: '/admin/content/faqs' },
        { label: 'Terms & Conditions', href: '/admin/content/terms' }
      ]
    },
    {
      icon: <Settings size={20} />,
      label: 'Settings',
      href: '/admin/settings',
      active: pathname.startsWith('/admin/settings'),
      subItems: [
        { label: 'General', href: '/admin/settings' },
        { label: 'Profile', href: '/admin/settings/profile' }
      ]
    }
  ]
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-white shadow-md"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full overflow-y-auto bg-white w-64 shadow-lg z-20 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-[#B88E2F]">Shop Admin</h1>
        </div>
        
        <div className="p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={item.active}
              subItems={item.subItems}
            />
          ))}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t z-20 bg-white">
          <button className="flex items-center text-red-500 px-4 py-2 rounded-md hover:bg-red-50 w-full">
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : ''}`}>
        {/* Navbar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex justify-between items-center px-6 py-3">
            <div className="flex items-center">
              <button 
                className="md:hidden p-2 mr-3 rounded-md hover:bg-gray-100"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <h2 className="text-lg font-semibold">
                {pathname === '/admin' ? 'Dashboard' : 
                 pathname.startsWith('/admin/users') ? 'Users' :
                 pathname.startsWith('/admin/products') ? 'Products' :
                 pathname.startsWith('/admin/orders') ? 'Orders' :
                 pathname.startsWith('/admin/shipping') ? 'Shipping' :
                 pathname.startsWith('/admin/content') ? 'Content' :
                 pathname.startsWith('/admin/settings') ? 'Settings' : 'Admin'}
              </h2>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <MessageSquare size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="flex items-center pl-3 border-l">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User size={18} />
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium">Admin User</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
} 
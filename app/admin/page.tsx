'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  ChevronUp, 
  ChevronDown, 
  Package,
  Calendar
} from 'lucide-react'

// Fake data for demo
const recentOrders = [
  { id: 'ORD-1234', customer: 'John Doe', date: '2023-10-15', status: 'Delivered', total: 250 },
  { id: 'ORD-1235', customer: 'Jane Smith', date: '2023-10-16', status: 'Processing', total: 175 },
  { id: 'ORD-1236', customer: 'Robert Brown', date: '2023-10-14', status: 'Shipped', total: 320 },
  { id: 'ORD-1237', customer: 'Sarah Wilson', date: '2023-10-13', status: 'Delivered', total: 145 },
  { id: 'ORD-1238', customer: 'Michael Clark', date: '2023-10-12', status: 'Processing', total: 210 },
]

const topProducts = [
  { id: 'PROD-1', name: 'Minimalist Sofa', sold: 45, revenue: 13500 },
  { id: 'PROD-2', name: 'Modern Coffee Table', sold: 38, revenue: 7600 },
  { id: 'PROD-3', name: 'Scandinavian Chair', sold: 36, revenue: 6480 },
  { id: 'PROD-4', name: 'Luxury Bed Frame', sold: 29, revenue: 14500 },
  { id: 'PROD-5', name: 'Wooden Bookshelf', sold: 24, revenue: 6000 },
]

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  trend: number
  trendLabel: string
}

function StatCard({ title, value, icon, trend, trendLabel }: StatCardProps) {
  const isPositive = trend >= 0
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="p-3 rounded-full bg-[#B88E2F] bg-opacity-10 text-[#B88E2F]">
          {icon}
        </div>
      </div>
      <div className="flex items-center mt-4">
        <span className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {Math.abs(trend)}%
        </span>
        <span className="text-gray-500 text-sm ml-2">{trendLabel}</span>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            <Calendar size={16} className="inline mr-2" />
            Last 30 days
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Revenue" 
          value="$12,628" 
          icon={<DollarSign size={20} />} 
          trend={12.5} 
          trendLabel="vs. previous month" 
        />
        <StatCard 
          title="Orders" 
          value="329" 
          icon={<ShoppingBag size={20} />} 
          trend={-2.3} 
          trendLabel="vs. previous month" 
        />
        <StatCard 
          title="Customers" 
          value="648" 
          icon={<Users size={20} />} 
          trend={5.7} 
          trendLabel="vs. previous month" 
        />
        <StatCard 
          title="Avg. Order Value" 
          value="$205" 
          icon={<TrendingUp size={20} />} 
          trend={3.2} 
          trendLabel="vs. previous month" 
        />
      </div>
      
      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-[#B88E2F] hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{order.customer}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{order.date}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-right">${order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Top Selling Products</h2>
            <Link href="/admin/products" className="text-sm text-[#B88E2F] hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Units Sold</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center">{product.sold}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-right">${product.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/products/add">
          <div className="p-4 bg-[#B88E2F] bg-opacity-10 hover:bg-opacity-20 rounded-md text-[#B88E2F] flex items-center justify-center gap-2 transition-colors">
            <ShoppingBag size={20} />
            <span>Add New Product</span>
          </div>
        </Link>
        <Link href="/admin/users/add">
          <div className="p-4 bg-blue-50 hover:bg-blue-100 rounded-md text-blue-600 flex items-center justify-center gap-2 transition-colors">
            <Users size={20} />
            <span>Add New User</span>
          </div>
        </Link>
        <Link href="/admin/orders">
          <div className="p-4 bg-green-50 hover:bg-green-100 rounded-md text-green-600 flex items-center justify-center gap-2 transition-colors">
            <Package size={20} />
            <span>Process Orders</span>
          </div>
        </Link>
      </div>
    </div>
  )
} 
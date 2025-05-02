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
import { prisma } from "@/lib/prisma";

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

async function getStats() {
  const [userCount, productCount, orderCount] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.count(),
  ]);

  const totalRevenue = await prisma.order.aggregate({
    _sum: {
      total: true,
    },
  });

  return {
    userCount,
    productCount,
    orderCount,
    totalRevenue: totalRevenue._sum.total || 0,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Users Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-semibold mt-1">{stats.userCount}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-semibold mt-1">{stats.productCount}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Package className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-semibold mt-1">{stats.orderCount}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <ShoppingBag className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-semibold mt-1">
                ${stats.totalRevenue.toFixed(2)}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/admin/products/add"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold mb-2">Add New Product</h3>
            <p className="text-gray-600 text-sm">
              Create and publish a new product listing
            </p>
          </a>
          <a
            href="/admin/orders"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold mb-2">Manage Orders</h3>
            <p className="text-gray-600 text-sm">
              View and process customer orders
            </p>
          </a>
          <a
            href="/admin/users"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold mb-2">User Management</h3>
            <p className="text-gray-600 text-sm">
              Manage user accounts and permissions
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
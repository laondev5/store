'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  FileText,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Eye
} from 'lucide-react'

// Fake data for demo
const ORDERS_DATA = [
  { 
    id: 'ORD-1234', 
    customer: { name: 'John Doe', email: 'john@example.com', id: 'USR-001' },
    date: '2023-10-15', 
    total: 250.99,
    status: 'Delivered',
    payment: 'Completed',
    items: 3,
    shipping: {
      address: '123 Main St, Anytown, AN 12345',
      method: 'Standard Shipping',
      tracking: 'TRK928374651'
    }
  },
  { 
    id: 'ORD-1235', 
    customer: { name: 'Jane Smith', email: 'jane@example.com', id: 'USR-002' },
    date: '2023-10-16', 
    total: 175.50,
    status: 'Processing',
    payment: 'Completed',
    items: 2,
    shipping: {
      address: '456 Oak Ave, Somewhere, SM 67890',
      method: 'Express Shipping',
      tracking: null
    }
  },
  { 
    id: 'ORD-1236', 
    customer: { name: 'Robert Brown', email: 'robert@example.com', id: 'USR-003' },
    date: '2023-10-14', 
    total: 320.25,
    status: 'Shipped',
    payment: 'Completed',
    items: 4,
    shipping: {
      address: '789 Pine Rd, Elsewhere, EL 54321',
      method: 'Standard Shipping',
      tracking: 'TRK546372819'
    }
  },
  { 
    id: 'ORD-1237', 
    customer: { name: 'Emily Wilson', email: 'emily@example.com', id: 'USR-004' },
    date: '2023-10-13', 
    total: 145.00,
    status: 'Delivered',
    payment: 'Completed',
    items: 1,
    shipping: {
      address: '321 Maple St, Nowhere, NW 13579',
      method: 'Standard Shipping',
      tracking: 'TRK192837465'
    }
  },
  { 
    id: 'ORD-1238', 
    customer: { name: 'Michael Clark', email: 'michael@example.com', id: 'USR-005' },
    date: '2023-10-12', 
    total: 210.75,
    status: 'Processing',
    payment: 'Pending',
    items: 2,
    shipping: {
      address: '654 Elm Blvd, Anyplace, AP 97531',
      method: 'Express Shipping',
      tracking: null
    }
  },
  { 
    id: 'ORD-1239', 
    customer: { name: 'Sarah Davis', email: 'sarah@example.com', id: 'USR-006' },
    date: '2023-10-11', 
    total: 89.99,
    status: 'Cancelled',
    payment: 'Refunded',
    items: 1,
    shipping: {
      address: '987 Cedar Ln, Someplace, SP 24680',
      method: 'Standard Shipping',
      tracking: null
    }
  },
  { 
    id: 'ORD-1240', 
    customer: { name: 'David Miller', email: 'david@example.com', id: 'USR-007' },
    date: '2023-10-10', 
    total: 435.50,
    status: 'Delivered',
    payment: 'Completed',
    items: 5,
    shipping: {
      address: '159 Birch Dr, Otherplace, OP 86420',
      method: 'Express Shipping',
      tracking: 'TRK675849321'
    }
  }
]

export default function OrdersPage() {
  const [orders, setOrders] = useState(ORDERS_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  
  const itemsPerPage = 5
  
  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })
  
  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage)
  
  const toggleExpandOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }
  
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    )
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing':
        return <Clock size={16} className="text-yellow-500" />
      case 'Shipped':
        return <Truck size={16} className="text-blue-500" />
      case 'Delivered':
        return <CheckCircle size={16} className="text-green-500" />
      case 'Cancelled':
        return <XCircle size={16} className="text-red-500" />
      case 'Pending':
        return <AlertCircle size={16} className="text-gray-500" />
      default:
        return null
    }
  }
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'Shipped':
        return 'bg-blue-100 text-blue-800'
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      case 'Pending':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  const getPaymentStatusClass = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Refunded':
        return 'bg-purple-100 text-purple-800'
      case 'Failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders by ID, customer name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
            >
              <option value="All">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600">
              <Filter size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className={expandedOrder === order.id ? 'bg-gray-50' : 'hover:bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        <button
                          onClick={() => toggleExpandOrder(order.id)}
                          className="flex items-center focus:outline-none"
                        >
                          <ChevronDown 
                            className={`w-4 h-4 mr-1 transition-transform ${
                              expandedOrder === order.id ? 'transform rotate-180' : ''
                            }`} 
                          />
                          {order.id}
                        </button>
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.items} items
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                      <div className="text-xs text-gray-500">{order.customer.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusClass(order.payment)}`}>
                        {order.payment}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/admin/orders/${order.id}`}>
                        <button className="text-blue-600 hover:text-blue-900 p-1">
                          <Eye size={18} />
                        </button>
                      </Link>
                    </td>
                  </tr>
                  
                  {/* Expanded Order Details */}
                  {expandedOrder === order.id && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Shipping Information</h4>
                            <p className="text-sm text-gray-600">{order.shipping.address}</p>
                            <p className="text-sm text-gray-600">Method: {order.shipping.method}</p>
                            {order.shipping.tracking && (
                              <p className="text-sm text-gray-600">
                                Tracking: <span className="font-medium">{order.shipping.tracking}</span>
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Payment Information</h4>
                            <p className="text-sm text-gray-600">
                              Status: <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusClass(order.payment)}`}>{order.payment}</span>
                            </p>
                            <p className="text-sm text-gray-600">Method: Credit Card</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Update Status</h4>
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => updateOrderStatus(order.id, 'Processing')}
                                className={`px-3 py-1 text-xs rounded ${
                                  order.status === 'Processing'
                                    ? 'bg-yellow-500 text-white'
                                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                }`}
                              >
                                Processing
                              </button>
                              <button
                                onClick={() => updateOrderStatus(order.id, 'Shipped')}
                                className={`px-3 py-1 text-xs rounded ${
                                  order.status === 'Shipped'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                }`}
                              >
                                Shipped
                              </button>
                              <button
                                onClick={() => updateOrderStatus(order.id, 'Delivered')}
                                className={`px-3 py-1 text-xs rounded ${
                                  order.status === 'Delivered'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                                }`}
                              >
                                Delivered
                              </button>
                              <button
                                onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                                className={`px-3 py-1 text-xs rounded ${
                                  order.status === 'Cancelled'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                }`}
                              >
                                Cancelled
                              </button>
                            </div>
                            <div className="mt-3">
                              <Link href={`/admin/orders/${order.id}`} className="text-sm text-blue-600 hover:underline">
                                View Full Order Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-4 py-3 bg-white border-t border-gray-200 sm:px-6 flex items-center justify-between">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(startIndex + itemsPerPage, filteredOrders.length)}
                </span>{' '}
                of <span className="font-medium">{filteredOrders.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === index + 1
                        ? 'bg-[#B88E2F] text-white border-[#B88E2F] z-10'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
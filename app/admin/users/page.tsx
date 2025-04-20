'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, 
  UserPlus, 
  Edit, 
  Trash, 
  PauseCircle, 
  PlayCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react'

// Fake data for demo
const USERS_DATA = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    role: 'Customer', 
    status: 'Active', 
    joinedDate: '2023-05-15',
    orders: 12,
    spent: 1245.50
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    role: 'Admin', 
    status: 'Active', 
    joinedDate: '2023-01-10',
    orders: 8,
    spent: 920.75
  },
  { 
    id: 3, 
    name: 'Robert Brown', 
    email: 'robert.brown@example.com', 
    role: 'Customer', 
    status: 'Paused', 
    joinedDate: '2023-07-22',
    orders: 3,
    spent: 350.25
  },
  { 
    id: 4, 
    name: 'Emily Wilson', 
    email: 'emily.wilson@example.com', 
    role: 'Customer', 
    status: 'Active', 
    joinedDate: '2023-03-05',
    orders: 20,
    spent: 2150.00
  },
  { 
    id: 5, 
    name: 'Michael Johnson', 
    email: 'michael.johnson@example.com', 
    role: 'Manager', 
    status: 'Active', 
    joinedDate: '2023-02-18',
    orders: 5,
    spent: 725.30
  },
  { 
    id: 6, 
    name: 'Sarah Davis', 
    email: 'sarah.davis@example.com', 
    role: 'Customer', 
    status: 'Paused', 
    joinedDate: '2023-04-30',
    orders: 7,
    spent: 890.45
  },
  { 
    id: 7, 
    name: 'David Miller', 
    email: 'david.miller@example.com', 
    role: 'Customer', 
    status: 'Active', 
    joinedDate: '2023-06-12',
    orders: 9,
    spent: 1100.20
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState(USERS_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  
  const itemsPerPage = 5
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)
  
  const toggleUserSelection = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    )
  }
  
  const toggleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(paginatedUsers.map((user) => user.id))
    }
  }
  
  const toggleUserStatus = (userId: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === 'Active' ? 'Paused' : 'Active',
            }
          : user
      )
    )
  }
  
  const deleteUser = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers((prev) => prev.filter((user) => user.id !== userId))
    }
  }
  
  const bulkDeleteUsers = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
      setUsers((prev) => prev.filter((user) => !selectedUsers.includes(user.id)))
      setSelectedUsers([])
    }
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link href="/admin/users/add">
          <button className="flex items-center px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#A17922] transition-colors">
            <UserPlus size={18} className="mr-2" />
            Add User
          </button>
        </Link>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent">
              <option value="">All Roles</option>
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent">
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Table Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-[#B88E2F] bg-opacity-10 p-3 rounded-lg mb-4 flex items-center justify-between">
          <span className="text-[#B88E2F] font-medium">{selectedUsers.length} users selected</span>
          <div className="flex gap-2">
            <button 
              onClick={bulkDeleteUsers}
              className="px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors flex items-center"
            >
              <Trash size={16} className="mr-1" /> Delete
            </button>
            <button className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors flex items-center">
              <PauseCircle size={16} className="mr-1" /> Pause
            </button>
          </div>
        </div>
      )}
      
      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-[#B88E2F] rounded border-gray-300 focus:ring-[#B88E2F]"
                      checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-[#B88E2F] rounded border-gray-300 focus:ring-[#B88E2F]"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'Admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : user.role === 'Manager'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        user.status === 'Active' ? 'bg-green-600' : 'bg-red-600'
                      } mr-1.5`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joinedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${user.spent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`p-1.5 rounded-md ${
                          user.status === 'Active'
                            ? 'text-amber-600 hover:bg-amber-50'
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={user.status === 'Active' ? 'Pause user' : 'Activate user'}
                      >
                        {user.status === 'Active' ? <PauseCircle size={18} /> : <PlayCircle size={18} />}
                      </button>
                      <Link 
                        href={`/admin/users/edit/${user.id}`} 
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                        title="Edit user"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                        title="Delete user"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
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
                  {Math.min(startIndex + itemsPerPage, filteredUsers.length)}
                </span>{' '}
                of <span className="font-medium">{filteredUsers.length}</span> results
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
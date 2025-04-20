'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  User, 
  Mail, 
  Lock, 
  UserCheck, 
  Phone, 
  MapPin, 
  ChevronLeft, 
  Save
} from 'lucide-react'

export default function AddUserPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Customer',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    status: 'Active'
  })
  
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Here you would typically make an API call to create the user
      // For demonstration, we'll just show an alert and redirect
      alert('User created successfully!')
      router.push('/admin/users')
    }
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link href="/admin/users" className="mr-4">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <ChevronLeft size={20} />
            </button>
          </Link>
          <h1 className="text-2xl font-bold">Add New User</h1>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex items-center px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#A17922] transition-colors"
        >
          <Save size={18} className="mr-2" />
          Save User
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`pl-10 pr-4 py-2 w-full border ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent`}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`pl-10 pr-4 py-2 w-full border ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent`}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`pl-10 pr-4 py-2 w-full border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserCheck size={18} className="text-gray-400" />
                    </div>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                    >
                      <option value="Customer">Customer</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="pl-4 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                    >
                      <option value="Active">Active</option>
                      <option value="Paused">Paused</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Password Section */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold mb-4">Password</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`pl-10 pr-4 py-2 w-full border ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent`}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`pl-10 pr-4 py-2 w-full border ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Address Section */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold mb-4">Address Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State / Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP / Postal Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Japan">Japan</option>
                    <option value="China">China</option>
                    <option value="India">India</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Link href="/admin/users">
              <button
                type="button"
                className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#A17922] transition-colors"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 
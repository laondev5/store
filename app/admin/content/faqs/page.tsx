'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Plus, 
  Edit, 
  Trash, 
  ChevronDown,
  ChevronUp,
  Save,
  X
} from 'lucide-react'

// Fake data for demo
const FAQS_DATA = [
  {
    id: '1',
    question: 'How long does shipping take?',
    answer: 'Shipping usually takes 3-5 business days for standard shipping and 1-2 business days for express shipping within the continental US. International shipping may take 7-14 business days depending on the destination.',
    category: 'Shipping & Delivery',
    isPublished: true
  },
  {
    id: '2',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for all unused and undamaged items in their original packaging. Returns must be initiated within 30 days of receiving your order. Please note that custom orders are not eligible for returns unless there is a manufacturing defect.',
    category: 'Returns & Refunds',
    isPublished: true
  },
  {
    id: '3',
    question: 'How do I track my order?',
    answer: 'Once your order ships, you will receive a shipping confirmation email with a tracking number. You can use this tracking number on our website under "Track Order" or directly on the carrier\'s website to track the status and location of your package.',
    category: 'Shipping & Delivery',
    isPublished: true
  },
  {
    id: '4',
    question: 'Do you offer assembly services?',
    answer: 'Yes, we offer assembly services for an additional fee. You can select this option during checkout. Our professional assembly team will contact you to schedule a convenient time for assembly after your items are delivered.',
    category: 'Services',
    isPublished: true
  },
  {
    id: '5',
    question: 'How do I care for wooden furniture?',
    answer: 'To care for wooden furniture, dust regularly with a soft cloth, avoid direct sunlight which can cause fading, use coasters under beverages, clean spills immediately, and apply furniture polish every 3-6 months. Avoid cleaning products containing ammonia or silicone.',
    category: 'Product Care',
    isPublished: true
  },
  {
    id: '6',
    question: 'Do you offer financing options?',
    answer: 'Yes, we offer several financing options through our partners. You can apply during checkout for instant approval on purchases over $300. We offer plans with 0% interest if paid in full within 6, 12, or 24 months, depending on the total purchase amount.',
    category: 'Payment & Financing',
    isPublished: false
  }
]

// Available categories
const FAQ_CATEGORIES = [
  'Shipping & Delivery',
  'Returns & Refunds',
  'Payment & Financing',
  'Product Care',
  'Services',
  'General'
]

interface FaqModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (faq: { id?: string; question: string; answer: string; category: string; isPublished: boolean }) => void
  title: string
  initialData?: { id: string; question: string; answer: string; category: string; isPublished: boolean }
}

function FaqModal({ isOpen, onClose, onSave, title, initialData }: FaqModalProps) {
  const [question, setQuestion] = useState(initialData?.question || '')
  const [answer, setAnswer] = useState(initialData?.answer || '')
  const [category, setCategory] = useState(initialData?.category || FAQ_CATEGORIES[0])
  const [isPublished, setIsPublished] = useState(initialData?.isPublished ?? true)
  
  if (!isOpen) return null
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: initialData?.id,
      question,
      answer,
      category,
      isPublished
    })
    setQuestion('')
    setAnswer('')
    setCategory(FAQ_CATEGORIES[0])
    setIsPublished(true)
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question*
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Answer*
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={5}
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category*
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
            >
              {FAQ_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="h-4 w-4 text-[#B88E2F] rounded border-gray-300 focus:ring-[#B88E2F]"
              />
              <span className="ml-2 text-sm text-gray-700">Publish FAQ</span>
            </label>
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#A17922] transition-colors"
            >
              <Save size={16} className="inline mr-1" />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function FaqsPage() {
  const [faqs, setFaqs] = useState(FAQS_DATA)
  const [expandedFaqs, setExpandedFaqs] = useState<string[]>([])
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false)
  const [editingFaq, setEditingFaq] = useState<(typeof FAQS_DATA)[0] | null>(null)
  const [categoryFilter, setCategoryFilter] = useState('All')
  
  const filteredFaqs = categoryFilter === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === categoryFilter)
  
  const toggleFaqExpand = (faqId: string) => {
    setExpandedFaqs((prev) =>
      prev.includes(faqId)
        ? prev.filter((id) => id !== faqId)
        : [...prev, faqId]
    )
  }
  
  const openAddFaqModal = () => {
    setEditingFaq(null)
    setIsFaqModalOpen(true)
  }
  
  const openEditFaqModal = (faq: typeof FAQS_DATA[0]) => {
    setEditingFaq(faq)
    setIsFaqModalOpen(true)
  }
  
  const handleSaveFaq = (faqData: { id?: string; question: string; answer: string; category: string; isPublished: boolean }) => {
    if (faqData.id) {
      // Edit existing FAQ
      setFaqs((prev) =>
        prev.map((faq) =>
          faq.id === faqData.id
            ? { ...faq, ...faqData }
            : faq
        )
      )
    } else {
      // Add new FAQ
      const newFaq = {
        id: `${faqs.length + 1}`,
        question: faqData.question,
        answer: faqData.answer,
        category: faqData.category,
        isPublished: faqData.isPublished
      }
      setFaqs((prev) => [...prev, newFaq])
    }
    setIsFaqModalOpen(false)
  }
  
  const deleteFaq = (faqId: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      setFaqs((prev) => prev.filter((faq) => faq.id !== faqId))
    }
  }
  
  const toggleFaqPublished = (faqId: string) => {
    setFaqs((prev) =>
      prev.map((faq) =>
        faq.id === faqId
          ? { ...faq, isPublished: !faq.isPublished }
          : faq
      )
    )
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
        <button
          onClick={openAddFaqModal}
          className="flex items-center px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#A17922] transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add FAQ
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700 mr-2">Filter by category:</span>
          <button
            onClick={() => setCategoryFilter('All')}
            className={`px-3 py-1 text-sm rounded-full ${
              categoryFilter === 'All'
                ? 'bg-[#B88E2F] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {FAQ_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={`px-3 py-1 text-sm rounded-full ${
                categoryFilter === category
                  ? 'bg-[#B88E2F] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* FAQs List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => (
          <div 
            key={faq.id} 
            className={`bg-white rounded-lg shadow-sm overflow-hidden border ${
              !faq.isPublished ? 'border-gray-300 border-dashed' : 'border-gray-200'
            }`}
          >
            <div 
              className={`px-6 py-4 flex justify-between items-center cursor-pointer ${
                expandedFaqs.includes(faq.id) ? 'bg-gray-50' : ''
              }`}
              onClick={() => toggleFaqExpand(faq.id)}
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900 mr-2">{faq.question}</h3>
                  {!faq.isPublished && (
                    <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">Draft</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">{faq.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFaqPublished(faq.id)
                  }}
                  className={`p-1.5 rounded ${
                    faq.isPublished
                      ? 'text-green-600 hover:bg-green-50'
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                  title={faq.isPublished ? 'Unpublish' : 'Publish'}
                >
                  {faq.isPublished ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    openEditFaqModal(faq)
                  }}
                  className="p-1.5 text-amber-600 hover:bg-amber-50 rounded"
                  title="Edit FAQ"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteFaq(faq.id)
                  }}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                  title="Delete FAQ"
                >
                  <Trash size={18} />
                </button>
                {expandedFaqs.includes(faq.id) ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </div>
            </div>
            
            {expandedFaqs.includes(faq.id) && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <p className="text-gray-700 whitespace-pre-line">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
        
        {filteredFaqs.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500">No FAQs found for this category.</p>
            <button
              onClick={openAddFaqModal}
              className="mt-4 px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#A17922] transition-colors"
            >
              Add Your First FAQ
            </button>
          </div>
        )}
      </div>
      
      {/* FAQ Modal */}
      <FaqModal
        isOpen={isFaqModalOpen}
        onClose={() => setIsFaqModalOpen(false)}
        onSave={handleSaveFaq}
        title={editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
        initialData={editingFaq || undefined}
      />
    </div>
  )
} 
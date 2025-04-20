'use client'

import { useState } from 'react'
import { 
  Save, 
  AlertCircle,
  List,
  Heading1,
  Heading2,
  Bold,
  Italic,
  Underline
} from 'lucide-react'

// Sample terms content
const INITIAL_TERMS = `# Terms and Conditions

Last Updated: October 15, 2023

## Introduction

Welcome to Our Shop. These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms.

## Definitions

- "Company", "We", "Us", "Our" refers to Our Shop.
- "Website" refers to www.ourshop.com.
- "User", "You", "Your" refers to the individual accessing or using our Website.
- "Terms" refers to these Terms and Conditions.

## Account Registration

To access certain features of our Website, you may be required to register for an account. You agree to provide accurate information and keep your information updated. You are responsible for maintaining the confidentiality of your account credentials.

## Products and Services

### Product Descriptions
We strive to describe our products as accurately as possible. However, we do not warrant that product descriptions or other content on the Website is accurate, complete, reliable, current, or error-free.

### Pricing and Payment
All prices are subject to change without notice. We reserve the right to refuse or cancel orders if we detect pricing errors.

### Shipping and Delivery
Shipping times are estimates and not guaranteed. We are not responsible for delays caused by customs, weather, or other factors outside our control.

## Intellectual Property

All content on this Website, including text, graphics, logos, images, and software, is the property of Our Shop and is protected by copyright, trademark, and other intellectual property laws.

## Privacy Policy

Your use of our Website is also governed by our Privacy Policy, which is incorporated into these Terms by reference.

## Limitation of Liability

To the fullest extent permitted by law, Our Shop shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Website.

## Changes to Terms

We reserve the right to modify these Terms at any time. Your continued use of the Website after such changes constitutes your acceptance of the new Terms.

## Contact Us

If you have any questions about these Terms, please contact us at:
- Email: support@ourshop.com
- Phone: (555) 123-4567
- Address: 123 Main Street, Anytown, ST 12345`

export default function TermsPage() {
  const [termsContent, setTermsContent] = useState(INITIAL_TERMS)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<string | null>(null)
  
  const handleSave = () => {
    // In a real application, you would save to a database or API
    setIsSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
      setLastSaved(new Date().toLocaleTimeString())
    }, 1000)
  }
  
  const formatTextBlock = (format: string) => {
    // In a real application, you would use a rich text editor library
    // This is just a simple implementation for demonstration
    
    const textarea = document.getElementById('terms-editor') as HTMLTextAreaElement
    if (!textarea) return
    
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = termsContent.substring(start, end)
    
    let formattedText = selectedText
    
    switch (format) {
      case 'h1':
        formattedText = `\n# ${selectedText}\n`
        break
      case 'h2':
        formattedText = `\n## ${selectedText}\n`
        break
      case 'bold':
        formattedText = `**${selectedText}**`
        break
      case 'italic':
        formattedText = `*${selectedText}*`
        break
      case 'underline':
        formattedText = `<u>${selectedText}</u>`
        break
      case 'list':
        formattedText = selectedText
          .split('\n')
          .map(line => `- ${line}`)
          .join('\n')
        break
    }
    
    const newContent = 
      termsContent.substring(0, start) + 
      formattedText + 
      termsContent.substring(end)
    
    setTermsContent(newContent)
  }
  
  // Convert markdown-like syntax to HTML for display
  const renderTermsContent = () => {
    let html = termsContent
    
    // Convert h1 headings
    html = html.replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>')
    
    // Convert h2 headings
    html = html.replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>')
    
    // Convert bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    
    // Convert italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // Convert lists
    html = html.replace(/^- (.*?)$/gm, '<li class="ml-6 mb-1">$1</li>')
    html = html.replace(/(<li.*?<\/li>)\n(<li.*?<\/li>)/g, '$1$2')
    html = html.replace(/(<li.*?<\/li>)(?:\n)?/g, '<ul class="list-disc my-3">$1</ul>')
    
    // Convert paragraphs
    html = html.replace(/^(?!<h|<ul|<li)(.+)$/gm, '<p class="my-2">$1</p>')
    
    return html
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Terms and Conditions</h1>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#A17922] transition-colors disabled:opacity-70"
            >
              {isSaving ? 'Saving...' : (
                <>
                  <Save size={18} className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#A17922] transition-colors"
          >
            Edit Terms
          </button>
        )}
      </div>
      
      {lastSaved && (
        <div className="bg-green-50 text-green-700 px-4 py-2 rounded-md mb-4 flex items-center">
          <AlertCircle size={18} className="mr-2" />
          Last saved at {lastSaved}
        </div>
      )}
      
      {isEditing ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 p-3 flex items-center gap-2">
            <button 
              onClick={() => formatTextBlock('h1')}
              className="p-2 rounded hover:bg-gray-100"
              title="Heading 1"
            >
              <Heading1 size={18} />
            </button>
            <button 
              onClick={() => formatTextBlock('h2')}
              className="p-2 rounded hover:bg-gray-100"
              title="Heading 2"
            >
              <Heading2 size={18} />
            </button>
            <span className="border-l border-gray-300 h-6 mx-1"></span>
            <button 
              onClick={() => formatTextBlock('bold')}
              className="p-2 rounded hover:bg-gray-100"
              title="Bold"
            >
              <Bold size={18} />
            </button>
            <button 
              onClick={() => formatTextBlock('italic')}
              className="p-2 rounded hover:bg-gray-100"
              title="Italic"
            >
              <Italic size={18} />
            </button>
            <button 
              onClick={() => formatTextBlock('underline')}
              className="p-2 rounded hover:bg-gray-100"
              title="Underline"
            >
              <Underline size={18} />
            </button>
            <span className="border-l border-gray-300 h-6 mx-1"></span>
            <button 
              onClick={() => formatTextBlock('list')}
              className="p-2 rounded hover:bg-gray-100"
              title="Bullet List"
            >
              <List size={18} />
            </button>
          </div>
          <textarea
            id="terms-editor"
            value={termsContent}
            onChange={(e) => setTermsContent(e.target.value)}
            className="w-full p-6 min-h-[600px] font-mono text-sm focus:outline-none"
          ></textarea>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: renderTermsContent() }}></div>
        </div>
      )}
      
      <div className="mt-6 text-right">
        <button
          onClick={() => window.print()}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Print Terms
        </button>
      </div>
    </div>
  )
} 
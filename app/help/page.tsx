"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "@/components/ui/Footer";

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all items in their original condition. Items must be unused and in their original packaging with all tags attached. Shipping costs for returns are the responsibility of the customer unless the item is defective.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Domestic shipping typically takes 3-5 business days. International shipping can take 7-14 business days depending on the destination. Express shipping options are available at checkout for faster delivery.",
  },
  {
    question: "Do you offer assembly services?",
    answer:
      "Yes, we offer professional assembly services for most furniture items. You can add this service during checkout. The cost varies depending on the complexity of the item and your location.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Shop Pay. For orders over $1000, we also offer financing options through Affirm.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can also log into your account and view order status and tracking information in the 'My Orders' section.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location. You can see exact shipping costs during checkout after entering your delivery address.",
  },
  {
    question: "What is your warranty policy?",
    answer:
      "All our furniture comes with a 1-year warranty against manufacturing defects. Some items may have extended warranty options available. Warranty claims must be submitted with photos and a description of the issue.",
  },
  {
    question: "Can I modify or cancel my order?",
    answer:
      "Orders can be modified or cancelled within 24 hours of placement. After this period, the order may have already been processed for shipping and cannot be changed. Please contact customer service as soon as possible for any order changes.",
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Help & FAQs</h1>
          <p className="text-gray-600 text-center mt-2">
            Find answers to commonly asked questions
          </p>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full flex items-center justify-between p-4 bg-white rounded-lg border hover:border-amber-500 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-left">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-amber-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 bg-gray-50 rounded-b-lg border-x border-b">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Please contact our
            friendly team.
          </p>
          <a
            href="/contact"
            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}

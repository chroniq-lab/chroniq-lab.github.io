'use client'

import { useState } from 'react'

interface CitationSectionProps {
  citation: string
}

export default function CitationSection({ citation }: CitationSectionProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(citation)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy citation:', error)
    }
  }

  return (
    <div className="not-prose bg-blue-50 rounded-lg p-6 my-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Citation</h3>
      <div className="bg-white rounded border p-4">
        <p className="text-sm text-gray-700 font-mono leading-relaxed">
          {citation}
        </p>
        <button 
          onClick={handleCopy}
          className="mt-3 inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Citation
            </>
          )}
        </button>
      </div>
    </div>
  )
}

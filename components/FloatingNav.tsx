'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Achievement } from '@/lib/achievements'

interface FloatingNavProps {
  previousAchievement: Achievement | null
  nextAchievement: Achievement | null
  currentIndex: number
  totalCount: number
}

export default function FloatingNav({ 
  previousAchievement, 
  nextAchievement, 
  currentIndex, 
  totalCount 
}: FloatingNavProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show floating nav when scrolled down 200px
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsExpanded(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      if (e.key === 'ArrowLeft' && previousAchievement) {
        window.location.href = `/achievements/${previousAchievement.slug}`
      } else if (e.key === 'ArrowRight' && nextAchievement) {
        window.location.href = `/achievements/${nextAchievement.slug}`
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [previousAchievement, nextAchievement])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-300 ${
        isExpanded ? 'p-4 w-80' : 'p-3'
      }`}>
        {isExpanded ? (
          // Expanded view
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                Achievement {currentIndex + 1} of {totalCount}
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex space-x-2">
              {previousAchievement ? (
                <Link
                  href={`/achievements/${previousAchievement.slug}`}
                  className="flex-1 flex items-center p-2 text-sm bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="truncate">{previousAchievement.shortTitle}</span>
                </Link>
              ) : (
                <div className="flex-1 flex items-center p-2 text-sm text-gray-400 bg-gray-50 rounded">
                  <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>No previous</span>
                </div>
              )}
              
              {nextAchievement ? (
                <Link
                  href={`/achievements/${nextAchievement.slug}`}
                  className="flex-1 flex items-center p-2 text-sm bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                >
                  <span className="truncate">{nextAchievement.shortTitle}</span>
                  <svg className="w-4 h-4 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <div className="flex-1 flex items-center p-2 text-sm text-gray-400 bg-gray-50 rounded">
                  <span>No next</span>
                  <svg className="w-4 h-4 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="text-xs text-gray-500 text-center">
              Use ← → keys to navigate
            </div>
          </div>
        ) : (
          // Compact view
          <div className="flex items-center space-x-2">
            {previousAchievement && (
              <Link
                href={`/achievements/${previousAchievement.slug}`}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                title={`Previous: ${previousAchievement.shortTitle}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            )}
            
            <button
              onClick={() => setIsExpanded(true)}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Show navigation details"
            >
              {currentIndex + 1} / {totalCount}
            </button>
            
            {nextAchievement && (
              <Link
                href={`/achievements/${nextAchievement.slug}`}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                title={`Next: ${nextAchievement.shortTitle}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

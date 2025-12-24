'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Achievement } from '@/lib/achievements'

interface EnhancedNavigationProps {
  currentAchievement: Achievement
  allAchievements: Achievement[]
  previousAchievement: Achievement | null
  nextAchievement: Achievement | null
  currentIndex: number
}

export default function EnhancedNavigation({
  currentAchievement,
  allAchievements,
  previousAchievement,
  nextAchievement,
  currentIndex
}: EnhancedNavigationProps) {
  const [showQuickNav, setShowQuickNav] = useState(false)
  const [navMode, setNavMode] = useState<'all' | 'category' | 'author'>('all')

  // Filter achievements based on navigation mode
  const getFilteredAchievements = () => {
    switch (navMode) {
      case 'category':
        return allAchievements.filter(a => a.category === currentAchievement.category)
      case 'author':
        return allAchievements.filter(a => 
          a.teamMembers.some(member => currentAchievement.teamMembers.includes(member))
        )
      default:
        return allAchievements
    }
  }

  const filteredAchievements = getFilteredAchievements()
  const filteredCurrentIndex = filteredAchievements.findIndex(a => a.slug === currentAchievement.slug)
  const filteredPrevious = filteredCurrentIndex > 0 ? filteredAchievements[filteredCurrentIndex - 1] : null
  const filteredNext = filteredCurrentIndex < filteredAchievements.length - 1 ? filteredAchievements[filteredCurrentIndex + 1] : null

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return // Don't interfere with form inputs
      }

      if (e.key === 'ArrowLeft' && filteredPrevious) {
        window.location.href = `/achievements/${filteredPrevious.slug}`
      } else if (e.key === 'ArrowRight' && filteredNext) {
        window.location.href = `/achievements/${filteredNext.slug}`
      } else if (e.key === 'Escape' && showQuickNav) {
        setShowQuickNav(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [filteredPrevious, filteredNext, showQuickNav])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowQuickNav(false)
    }

    if (showQuickNav) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showQuickNav])

  const progressPercentage = ((filteredCurrentIndex + 1) / filteredAchievements.length) * 100

  return (
    <div className="border-t border-gray-200 bg-white">
      {/* Progress Bar */}
      <div className="h-1 bg-gray-100">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Mode Selector */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setNavMode('all')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                navMode === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All ({allAchievements.length})
            </button>
            <button
              onClick={() => setNavMode('category')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                navMode === 'category'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {currentAchievement.category} ({allAchievements.filter(a => a.category === currentAchievement.category).length})
            </button>
            <button
              onClick={() => setNavMode('author')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                navMode === 'author'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Same Authors ({allAchievements.filter(a => a.teamMembers.some(member => currentAchievement.teamMembers.includes(member))).length})
            </button>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          {/* Previous Button */}
          <div className="flex-1">
            {filteredPrevious ? (
              <Link
                href={`/achievements/${filteredPrevious.slug}`}
                className="group inline-flex items-center text-gray-600 hover:text-gray-900 max-w-xs"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <div className="text-left min-w-0">
                    <div className="text-sm font-medium">Previous</div>
                    <div className="text-sm text-gray-500 truncate">{filteredPrevious.shortTitle}</div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="text-gray-400 text-sm">No previous {navMode === 'all' ? 'achievement' : navMode === 'category' ? 'in category' : 'by authors'}</div>
            )}
          </div>

          {/* Center: Current Position & Quick Navigation */}
          <div className="flex-1 flex flex-col items-center space-y-2">
            <div className="text-sm text-gray-500">
              {filteredCurrentIndex + 1} of {filteredAchievements.length}
            </div>
            
            {/* Quick Navigation Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowQuickNav(!showQuickNav)
                }}
                className="inline-flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Jump to...
                <svg className={`ml-1 w-4 h-4 transition-transform ${showQuickNav ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showQuickNav && (
                <div className="absolute top-full mt-1 w-80 max-h-64 bg-white border border-gray-200 rounded-md shadow-lg overflow-y-auto z-50">
                  {filteredAchievements.map((achievement, index) => (
                    <Link
                      key={achievement.slug}
                      href={`/achievements/${achievement.slug}`}
                      className={`block px-4 py-2 text-sm hover:bg-gray-50 ${
                        achievement.slug === currentAchievement.slug ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                      onClick={() => setShowQuickNav(false)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate flex-1">{achievement.shortTitle}</span>
                        <span className="text-xs text-gray-500 ml-2">{index + 1}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{achievement.category}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Keyboard Hint */}
            <div className="text-xs text-gray-400 hidden sm:block">
              Use ← → keys to navigate
            </div>
          </div>

          {/* Next Button */}
          <div className="flex-1 flex justify-end">
            {filteredNext ? (
              <Link
                href={`/achievements/${filteredNext.slug}`}
                className="group inline-flex items-center text-gray-600 hover:text-gray-900 max-w-xs"
              >
                <div className="flex items-center">
                  <div className="text-right min-w-0 mr-2">
                    <div className="text-sm font-medium">Next</div>
                    <div className="text-sm text-gray-500 truncate">{filteredNext.shortTitle}</div>
                  </div>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ) : (
              <div className="text-gray-400 text-sm text-right">No next {navMode === 'all' ? 'achievement' : navMode === 'category' ? 'in category' : 'by authors'}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

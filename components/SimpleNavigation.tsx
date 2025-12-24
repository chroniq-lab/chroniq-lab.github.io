'use client'

import Link from 'next/link'
import { Achievement } from '@/lib/achievements'

interface SimpleNavigationProps {
  previousAchievement: Achievement | null
  nextAchievement: Achievement | null
  currentIndex: number
  totalCount: number
}

export default function SimpleNavigation({
  previousAchievement,
  nextAchievement,
  currentIndex,
  totalCount
}: SimpleNavigationProps) {
  return (
    <div className="not-prose border-t border-gray-200 pt-8 mt-8">
      {/* Progress indicator */}
      <div className="text-center mb-6">
        <span className="text-sm text-gray-500">
          {currentIndex + 1} of {totalCount}
        </span>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center">
        {/* Previous Button */}
        <div className="flex-1">
          {previousAchievement ? (
            <Link
              href={`/achievements/${previousAchievement.slug}`}
              className="group inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors max-w-xs"
            >
              <svg className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div className="text-left min-w-0">
                <div className="text-sm font-medium text-gray-900">Previous</div>
                <div className="text-sm text-gray-500 truncate">{previousAchievement.shortTitle}</div>
              </div>
            </Link>
          ) : (
            <div className="text-gray-400 text-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>No previous achievement</span>
              </div>
            </div>
          )}
        </div>

        {/* Next Button */}
        <div className="flex-1 flex justify-end">
          {nextAchievement ? (
            <Link
              href={`/achievements/${nextAchievement.slug}`}
              className="group inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors max-w-xs"
            >
              <div className="text-right min-w-0 mr-3">
                <div className="text-sm font-medium text-gray-900">Next</div>
                <div className="text-sm text-gray-500 truncate">{nextAchievement.shortTitle}</div>
              </div>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <div className="text-gray-400 text-sm text-right">
              <div className="flex items-center">
                <span>No next achievement</span>
                <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { Achievement } from '@/lib/achievements'

interface BreadcrumbProps {
  achievement: Achievement
  allAchievements: Achievement[]
}

export default function Breadcrumb({ achievement, allAchievements }: BreadcrumbProps) {
  const categoryAchievements = allAchievements.filter(a => a.category === achievement.category)
  const categoryIndex = categoryAchievements.findIndex(a => a.slug === achievement.slug)
  
  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link 
              href="/" 
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Home
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link 
              href="/achievements" 
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Achievements
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link 
              href={`/achievements?category=${encodeURIComponent(achievement.category)}`}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {achievement.category}
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 font-medium truncate">
            {achievement.shortTitle}
          </li>
        </ol>
        
        {/* Achievement meta info */}
        <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
          <span>
            {categoryIndex + 1} of {categoryAchievements.length} in {achievement.category}
          </span>
          <span>•</span>
          <span>
            Published {new Date(achievement.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <span>•</span>
          <span>
            {achievement.teamMembers.length} author{achievement.teamMembers.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </nav>
  )
}

'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Achievement, loadAchievements } from '@/lib/achievements'

// Team members for filtering (matching the plan's requirement to pull from team page)
const teamMembers = [
  "Jithin Sam Varghese",
  "Zhongyu Li", 
  "Jiali Guo",
  "Ruwanthi Ekanayake",
  "Daniel Hua",
  "Theo Hung",
  "Aamna Soniwala",
  "Sophia Kim",
  "Krishna Sanaka"
]

// Data sources for filtering (as specified in the plan)
const dataSources = [
  "Epic Cosmos",
  "Cohorts", 
  "Survey",
  "Kiosk",
  "Others"
]

type ViewMode = 'grid' | 'list'

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTeamMember, setSelectedTeamMember] = useState<string>('')
  const [selectedDataSource, setSelectedDataSource] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await loadAchievements()
        setAchievements(data)
      } catch (error) {
        console.error('Failed to load achievements:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()
  }, [])

  // Get unique categories for filtering
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(achievements.map(a => a.category)))
    return uniqueCategories.sort()
  }, [achievements])

  // Filter achievements based on search and filters
  const filteredAchievements = useMemo(() => {
    return achievements.filter(achievement => {
      const matchesSearch = searchTerm === '' || 
        achievement.shortTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.longTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.summary.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesTeamMember = selectedTeamMember === '' || 
        achievement.teamMembers.includes(selectedTeamMember)

      const matchesDataSource = selectedDataSource === '' ||
        achievement.dataSources.includes(selectedDataSource)

      const matchesCategory = selectedCategory === '' ||
        achievement.category === selectedCategory

      return matchesSearch && matchesTeamMember && matchesDataSource && matchesCategory
    })
  }, [achievements, searchTerm, selectedTeamMember, selectedDataSource, selectedCategory])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading achievements...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Research Achievements
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our latest research publications, conference presentations, and personal achievements.
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search achievements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4 mb-4">
            {/* Team Member Filter */}
            <select
              value={selectedTeamMember}
              onChange={(e) => setSelectedTeamMember(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Team Members</option>
              {teamMembers.map(member => (
                <option key={member} value={member}>{member}</option>
              ))}
            </select>

            {/* Data Source Filter */}
            <select
              value={selectedDataSource}
              onChange={(e) => setSelectedDataSource(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Data Sources</option>
              {dataSources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle and Results Count */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {filteredAchievements.length} achievement{filteredAchievements.length !== 1 ? 's' : ''} found
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* No Results */}
        {filteredAchievements.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No achievements found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchTerm('')
                setSelectedTeamMember('')
                setSelectedDataSource('')
                setSelectedCategory('')
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAchievements.map((achievement) => (
                  <Link 
                    key={achievement.slug} 
                    href={`/achievements/${achievement.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                      {achievement.image && (
                        <div className="aspect-video relative overflow-hidden">
                          <Image
                            src={achievement.image}
                            alt={achievement.shortTitle}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                            {achievement.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatDate(achievement.date)}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {achievement.shortTitle}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {achievement.summary}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {achievement.teamMembers.slice(0, 2).map((member) => (
                            <span 
                              key={member} 
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                            >
                              {member}
                            </span>
                          ))}
                          {achievement.teamMembers.length > 2 && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                              +{achievement.teamMembers.length - 2} more
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {achievement.dataSources.slice(0, 2).map((source) => (
                            <span 
                              key={source} 
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                            >
                              {source}
                            </span>
                          ))}
                          {achievement.dataSources.length > 2 && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              +{achievement.dataSources.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {filteredAchievements.map((achievement) => (
                  <Link 
                    key={achievement.slug} 
                    href={`/achievements/${achievement.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
                      <div className="flex gap-6">
                        {achievement.image && (
                          <div className="flex-shrink-0 w-24 h-24 relative overflow-hidden rounded-lg">
                            <Image
                              src={achievement.image}
                              alt={achievement.shortTitle}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-200"
                              sizes="96px"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                              {achievement.category}
                            </span>
                            <span className="text-sm text-gray-500 flex-shrink-0">
                              {formatDate(achievement.date)}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {achievement.shortTitle}
                          </h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {achievement.summary}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {achievement.teamMembers.map((member) => (
                              <span 
                                key={member} 
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                              >
                                {member}
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {achievement.dataSources.map((source) => (
                              <span 
                                key={source} 
                                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                              >
                                {source}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

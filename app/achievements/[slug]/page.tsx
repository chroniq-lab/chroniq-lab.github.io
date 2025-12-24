import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import { Achievement } from '@/lib/achievements'
import CitationSection from '@/components/CitationSection'

// Generate static params for all achievement slugs
export async function generateStaticParams() {
  try {
    const achievementsDir = join(process.cwd(), 'public', 'achievements')
    const files = await readdir(achievementsDir)
    
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => ({
        slug: file.replace('.json', ''),
      }))
  } catch (error) {
    console.error('Failed to generate static params:', error)
    return []
  }
}

async function getAchievement(slug: string): Promise<Achievement | null> {
  try {
    const achievementPath = join(process.cwd(), 'public', 'achievements', `${slug}.json`)
    const fileContent = await readFile(achievementPath, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error(`Failed to load achievement: ${slug}`, error)
    return null
  }
}

async function getRelatedAchievements(currentAchievement: Achievement): Promise<Achievement[]> {
  try {
    const achievementsDir = join(process.cwd(), 'public', 'achievements')
    const files = await readdir(achievementsDir)
    
    const achievements: Achievement[] = []
    
    for (const file of files.filter(f => f.endsWith('.json'))) {
      if (file !== `${currentAchievement.slug}.json`) {
        try {
          const filePath = join(achievementsDir, file)
          const fileContent = await readFile(filePath, 'utf-8')
          const achievement: Achievement = JSON.parse(fileContent)
          achievements.push(achievement)
        } catch (error) {
          console.warn(`Failed to load achievement file: ${file}`, error)
        }
      }
    }
    
    // Find related achievements based on team members or data sources
    const related = achievements
      .filter(a => 
        a.teamMembers.some(member => currentAchievement.teamMembers.includes(member)) ||
        a.dataSources.some(source => currentAchievement.dataSources.includes(source)) ||
        a.category === currentAchievement.category
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3)
    
    return related
  } catch (error) {
    console.error('Failed to load related achievements:', error)
    return []
  }
}

async function getAllAchievements(): Promise<Achievement[]> {
  try {
    const achievementsDir = join(process.cwd(), 'public', 'achievements')
    const files = await readdir(achievementsDir)
    
    const achievements: Achievement[] = []
    
    for (const file of files.filter(f => f.endsWith('.json'))) {
      try {
        const filePath = join(achievementsDir, file)
        const fileContent = await readFile(filePath, 'utf-8')
        const achievement: Achievement = JSON.parse(fileContent)
        achievements.push(achievement)
      } catch (error) {
        console.warn(`Failed to load achievement file: ${file}`, error)
      }
    }
    
    // Sort by date (newest first)
    return achievements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Failed to load all achievements:', error)
    return []
  }
}

interface Props {
  params: {
    slug: string
  }
}

export default async function AchievementDetailPage({ params }: Props) {
  const achievement = await getAchievement(params.slug)
  
  if (!achievement) {
    notFound()
  }

  const relatedAchievements = await getRelatedAchievements(achievement)
  const allAchievements = await getAllAchievements()
  
  // Find current achievement index and navigation
  const currentIndex = allAchievements.findIndex(a => a.slug === achievement.slug)
  const previousAchievement = currentIndex > 0 ? allAchievements[currentIndex - 1] : null
  const nextAchievement = currentIndex < allAchievements.length - 1 ? allAchievements[currentIndex + 1] : null

  const formatDate = (dateString: string) => {
    // Parse date as local date to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day) // month is 0-indexed
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/achievements" 
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Back to Achievements
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-4">
            <time className="text-gray-500 font-medium">
              {formatDate(achievement.date)}
            </time>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
            {achievement.longTitle}
          </h1>

          {/* Tags */}
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500 mr-3">Team Members:</span>
              <div className="inline-flex flex-wrap gap-2">
                {achievement.teamMembers.map((member, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {member}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-500 mr-3">Data Sources:</span>
              <div className="inline-flex flex-wrap gap-2">
                {achievement.dataSources.map((source, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-900 text-white text-sm rounded-full">
                    {source}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        {achievement.image && (
          <div className="mb-12">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
              <Image
                src={achievement.image}
                alt={achievement.shortTitle}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div 
            className="text-xl text-gray-700 leading-relaxed mb-8"
            dangerouslySetInnerHTML={{ __html: achievement.summary }}
          />

          {/* Links Section */}
          <div className="not-prose bg-gray-50 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
            <div className="space-y-3">
              <div>
                <a
                  href={achievement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Read Full Publication
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              
              {achievement.youtubeLink && (
                <div>
                  <a
                    href={achievement.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Watch Video Presentation
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Citation Section */}
          {achievement.citation && (
            <CitationSection citation={achievement.citation} />
          )}

          {/* Placeholder for future content */}
          <div className="border-t pt-8">
            <p className="text-gray-600 italic">
              Full article content and detailed analysis will be added here in the future.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="not-prose flex justify-between items-center py-8 border-t border-gray-200">
            <div className="flex-1">
              {previousAchievement && (
                <Link 
                  href={`/achievements/${previousAchievement.slug}`}
                  className="group inline-flex items-center text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <div className="text-left">
                    <div className="text-sm font-medium">Previous</div>
                    <div className="text-sm text-gray-500 line-clamp-1">{previousAchievement.shortTitle}</div>
                  </div>
                </Link>
              )}
            </div>
            <div className="flex-1 text-right">
              {nextAchievement && (
                <Link 
                  href={`/achievements/${nextAchievement.slug}`}
                  className="group inline-flex items-center text-gray-600 hover:text-gray-900"
                >
                  <div className="text-right">
                    <div className="text-sm font-medium">Next</div>
                    <div className="text-sm text-gray-500 line-clamp-1">{nextAchievement.shortTitle}</div>
                  </div>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Related Achievements */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Achievements</h2>
          {relatedAchievements.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedAchievements.map((relatedAchievement) => (
                <Link
                  key={relatedAchievement.slug}
                  href={`/achievements/${relatedAchievement.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                    {relatedAchievement.image && (
                      <div className="aspect-video relative overflow-hidden">
                        <Image
                          src={relatedAchievement.image}
                          alt={relatedAchievement.shortTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                          {relatedAchievement.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(relatedAchievement.date)}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {relatedAchievement.shortTitle}
                      </h3>
                      <p className="text-gray-600 text-xs line-clamp-3">
                        {relatedAchievement.summary}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>No related achievements found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

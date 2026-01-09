export interface Achievement {
  id: number;
  slug: string;
  shortTitle: string;
  longTitle: string;
  date: string;
  link: string;
  youtubeLink?: string;
  image?: string;
  teamMembers: string[];
  dataSources: string[];
  summary: string;
  category: string;
  citation?: string;
  featured?: boolean;
}

/**
 * Load all achievements from JSON files in the public/achievements directory
 * This function runs on the client side and automatically discovers available achievements
 */
export async function loadAchievements(): Promise<Achievement[]> {
  try {
    // First, get the list of available achievement slugs from the API
    const slugsResponse = await fetch('/api/achievements');
    const { slugs } = await slugsResponse.json();

    const achievements: Achievement[] = [];

    // Load each achievement file
    for (const slug of slugs) {
      try {
        const response = await fetch(`/achievements/${slug}.json`);
        if (response.ok) {
          const achievement: Achievement = await response.json();
          achievements.push(achievement);
        }
      } catch (error) {
        console.warn(`Failed to load achievement: ${slug}`, error);
      }
    }

    // Sort achievements by date (newest first)
    return achievements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Failed to load achievements:', error);
    return [];
  }
}

/**
 * Load a specific achievement by slug
 */
export async function loadAchievementBySlug(slug: string): Promise<Achievement | null> {
  try {
    const response = await fetch(`/achievements/${slug}.json`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error(`Failed to load achievement: ${slug}`, error);
    return null;
  }
}

/**
 * Get all available achievement slugs
 * This function fetches the list of available achievements from the API
 */
export async function getAvailableAchievementSlugs(): Promise<string[]> {
  try {
    const response = await fetch('/api/achievements');
    const { slugs } = await response.json();
    return slugs;
  } catch (error) {
    console.error('Failed to get achievement slugs:', error);
    return [];
  }
}

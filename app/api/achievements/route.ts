import { NextRequest, NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import { join } from 'path'

export async function GET(request: NextRequest) {
  try {
    const achievementsDir = join(process.cwd(), 'public', 'achievements')
    
    // Read all files in the achievements directory
    const files = await readdir(achievementsDir)
    
    // Filter for JSON files and extract slugs
    const slugs = files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''))
    
    return NextResponse.json({ slugs })
  } catch (error) {
    console.error('Failed to read achievements directory:', error)
    return NextResponse.json({ slugs: [] })
  }
}

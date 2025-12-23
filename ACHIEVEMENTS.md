# Achievements System

This project now uses a dynamic achievements system that automatically loads achievement data from JSON files. Here's how to use it:

## Adding New Achievements

1. **Create a JSON file** in `public/achievements/[slug].json` with the following structure:

```json
{
  "id": 1,
  "slug": "your-achievement-slug",
  "shortTitle": "Brief Title",
  "longTitle": "Full Achievement Title",
  "date": "YYYY-MM-DD",
  "link": "https://link-to-publication-or-resource.com",
  "youtubeLink": "https://youtube.com/watch?v=VIDEO_ID", // Optional
  "image": "/images/achievements/your-image.jpg", // Optional
  "teamMembers": ["Team Member 1", "Team Member 2"],
  "dataSources": ["Data Source 1", "Data Source 2"],
  "summary": "Brief description of the achievement...",
  "category": "Research Publication" // or "Conference Presentation", etc.
}
```

2. **Add corresponding images** (if any) to `public/images/achievements/`

3. **The system automatically discovers** new JSON files - no code changes needed!

## Field Descriptions

- **id**: Unique identifier (number)
- **slug**: URL-friendly identifier used in the filename and URLs
- **shortTitle**: Brief title shown in grid view
- **longTitle**: Full title shown in list view and detail pages
- **date**: Publication or achievement date (YYYY-MM-DD format)
- **link**: Main link to publication, resource, or external page
- **youtubeLink**: Optional YouTube video link
- **image**: Optional path to achievement image (relative to /public)
- **teamMembers**: Array of team member names
- **dataSources**: Array of data sources used
- **summary**: Brief description for preview
- **category**: Achievement category (for future filtering)

## Existing Examples

Check the existing JSON files in `public/achievements/` for reference:
- `2025-12-zhongyu.json` - Research publication example
- `example-machine-learning-study.json` - ML research example  
- `conference-presentation-2024.json` - Conference presentation example

## How It Works

1. **API Route**: `/app/api/achievements/route.ts` automatically scans the `public/achievements/` directory
2. **Library Functions**: `/lib/achievements.ts` provides functions to load achievement data
3. **Page Component**: `/app/achievements/page.tsx` displays achievements with filtering and search
4. **Individual Pages**: `/app/achievements/[slug]/page.tsx` shows detailed achievement views

## Features

- **Automatic Discovery**: New JSON files are automatically detected
- **Filtering**: Filter by team member, data source, or search terms
- **Multiple Views**: Grid and list display modes
- **Responsive Design**: Works on all device sizes
- **Loading States**: Smooth loading experience
- **Error Handling**: Graceful handling of missing or invalid files

## Adding Team Members or Data Sources

The system automatically extracts unique team members and data sources from all achievements for the filter dropdowns. Simply add new names to the respective arrays in your JSON files.

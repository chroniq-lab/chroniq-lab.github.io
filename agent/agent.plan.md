# Chroniq Lab Website Plan

## Project Overview
A modern, responsive website for Chroniq Lab featuring statistical analysis tools, team information, and research achievements.

## Site Architecture

### 1. Landing Page
**Purpose**: Engage viewers and ask them to add information
- **Hero Section**: Clean, professional introduction to mission of Chroniq Lab
- **Features**:
  - Responsive design for mobile and desktop

### 2. Team Page
**Purpose**: Showcase lab members and expertise
- **Layout**: Grid-based photo gallery
- **Content per member**:
  - Professional headshot
  - Name
  - Title
  - Link (Personal Website or LinkedIn)
- **Features**:
  - Hover effects for additional information
  - Responsive grid layout
  - Professional photography styling
  - Filter/sort options (by role, expertise)
  - Alumni section with same content, but clearly demarcated

### 3. Achievements Page
**Purpose**: Blog-style showcase of research and accomplishments
- **Master Page Layout**:
  - URL format: /achievements/file-name-of-json-file from [public/achievements]
  - Grid view (default): Card-based layout with images
  - List view (alternative): Compact text-based layout
  - Search and filter functionality
- **Article Structure**:
  - Short title (for cards/lists)
  - Long title (for full article view)
  - Publication/achievement date
  - Central hero image
  - Option to embed YouTube link
  - Dual tagging system
  - Plain text summary of article
- **Filtering System**:
  - Tag 1: Team member filter (shows work by specific researchers): Pull from team/page.tsx
  - Tag 2: Data source filter (categorizes by research methodology/data type): ['Epic Cosmos', 'Cohorts', 'Survey','Kiosk','Others']
- **Features**:
  - Pagination for large content volumes
  - SEO-optimized article pages
  - Social sharing integration
  - Related articles suggestions

### 4. Tools
**Purpose**: Hosting different calculators
- Example: chroniq.org/tools/trajectory or chroniq.org/tools/position
- **Master Page Layout**:
   - Grid view (default): Card-based layout with images
   - List view (alternative): Compact text-based layout
- **Calculator Features**:
   - Minimalist data entry
   - Call API for specific calculator on AWS
   - Citation
- **Report Features**:
   - Extract report as image for sharing on social media
   - Template for image to be designed.

## Technical Implementation

### Frontend Technology Stack
- **Framework**: Modern JavaScript framework (React/Next.js or similar)
- **Styling**: CSS framework with custom components
- **Charts/Visualization**: D3.js or Chart.js for statistical displays
- **Responsive Design**: Mobile-first approach with breakpoints

### Backend Requirements
- **Content Management**: 
  - Blog post creation and editing system
  - Image upload and management
  - Tag management system
- **Statistical Calculator**:
  - API endpoints for data processing
  - Database for national distribution data
  - Calculation algorithms

### Database Schema
```
Articles:
- id, short_title, long_title, date, image_url, content
- team_member_tags (array)
- data_source_tags (array)

Team_Members:
- id, name, title, bio, photo_url, expertise

Statistical_Data:
- distribution parameters and reference datasets
```

## Content Strategy

### Landing Page Content
- Welcome message explaining Chroniq Lab's mission
- Clear instructions for statistical tool usage
- Sample questions and use cases
- Privacy policy for data handling

### Team Page Content
- Professional bios for each team member
- Research specializations and achievements
- Contact information and social links
- Lab culture and values section

### Achievements Content Categories
- Research publications
- Conference presentations
- Awards and recognition
- Data analysis projects
- Community impact studies

## Design Requirements

### Visual Identity
- Clean, academic aesthetic with modern touches
- Consistent color scheme reflecting data/research theme
- Typography: Professional, readable fonts
- Logo integration and brand consistency

### User Experience
- Intuitive navigation between sections
- Fast loading times and performance optimization
- Accessibility compliance (WCAG guidelines)
- Clear visual hierarchy and information flow

### Interactive Elements
- Statistical calculator with real-time feedback
- Smooth transitions between grid and list views
- Hover states and micro-interactions
- Mobile-optimized touch interactions

## Development Phases

### Phase 1: Foundation (Week 1-2)
- Set up development environment
- Create basic site structure and navigation
- Implement responsive layout framework
- Design system and component library

### Phase 2: Core Pages (Week 3-4)
- Landing page with statistical calculator
- Team page with photo grid
- Basic achievements page structure

### Phase 3: Advanced Features (Week 5-6)
- Blog article system with tagging
- Search and filter functionality
- Data visualization components
- Content management interface

### Phase 4: Testing & Deployment (Week 7-8)
- Cross-browser testing
- Performance optimization
- Content population
- SEO implementation and deployment

## Success Metrics
- User engagement with statistical calculator
- Time spent on achievements/blog content
- Mobile usability scores
- Page load performance metrics
- Search engine visibility

## Future Enhancements
- Newsletter signup integration
- Advanced statistical tools
- Research collaboration portal
- Data visualization gallery
- Interactive research demos
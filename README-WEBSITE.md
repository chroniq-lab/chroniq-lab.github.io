# Chroniq Lab Website

A modern, responsive website for Chroniq Lab featuring statistical analysis tools, team information, and research achievements.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

### Installing Node.js

#### macOS
1. **Using Homebrew (recommended):**
   ```bash
   # Install Homebrew if not already installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Node.js
   brew install node
   ```

2. **Using the official installer:**
   - Download from [nodejs.org](https://nodejs.org/)
   - Run the installer and follow the instructions

#### Verify Installation
```bash
node --version
npm --version
```

## Getting Started

1. **Clone and navigate to the project:**
   ```bash
   cd chroniq-lab.github.io
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

## Project Structure

```
chroniq-lab.github.io/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Landing page
│   └── team/
│       └── page.tsx       # Team page
├── components/
│   └── Navbar.tsx         # Navigation component
├── public/                # Static assets (create this directory)
│   └── images/
│       └── team/          # Team member photos
├── package.json           # Project dependencies
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## Features

### 🏠 Landing Page
- Clean, professional hero section
- Mission statement and lab overview
- Interactive elements with smooth transitions
- Responsive design for all devices

### 👥 Team Page
- Grid-based photo gallery of team members
- Hover effects showing additional information
- Filter functionality by role (Faculty, Graduate Student, Undergraduate, Alumni)
- Separate alumni section with clear demarcation
- Professional headshots with names, titles, and links

### 🎨 Design Features
- Modern, academic aesthetic
- Tailwind CSS for styling
- Responsive mobile-first design
- Smooth hover animations and transitions
- Professional color scheme

## Adding Team Members

To add new team members, edit the `teamMembers` array in `/app/team/page.tsx`:

```typescript
const teamMembers = [
  {
    id: 1,
    name: "Dr. Your Name",
    title: "Your Title",
    role: "Faculty", // Faculty, Graduate Student, Undergraduate
    expertise: ["Your", "Expertise", "Areas"],
    image: "/images/team/your-photo.jpg",
    link: "https://your-website.com",
    bio: "Your bio description..."
  }
  // ... more members
]
```

### Adding Photos

1. Create the directory structure:
   ```bash
   mkdir -p public/images/team
   ```

2. Add professional headshots to `/public/images/team/`
3. Update the `image` field in the team member data to match the filename

## Deployment

This website is configured for static export, making it perfect for GitHub Pages:

1. **Build the static site:**
   ```bash
   npm run build
   ```

2. **The built files will be in the `out/` directory**

3. **For GitHub Pages deployment:**
   - Push your code to the `main` branch
   - The site will be available at `https://chroniq-lab.github.io`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Colors
Edit the color scheme in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Your color palette
  }
}
```

### Content
- **Landing page content:** Edit `/app/page.tsx`
- **Team information:** Edit `/app/team/page.tsx`
- **Navigation:** Edit `/components/Navbar.tsx`

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Static Export** - For GitHub Pages compatibility

## Future Enhancements

The website is designed to be easily extensible:
- Achievements page (blog-style with filtering)
- Interactive statistical tools
- Content management system
- Advanced animations and interactions

## Support

If you encounter any issues:
1. Ensure Node.js is properly installed
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and `package-lock.json`, then run `npm install`

## License

This project is part of Chroniq Lab's research initiatives.

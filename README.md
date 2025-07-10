
# FlixStream - Modern Movie & TV Show Streaming Platform

A modern, responsive streaming platform built with React, TypeScript, and Tailwind CSS, integrated with The Movie Database (TMDB) API.

## Features

- 🎬 **Modern UI/UX**: Clean, Netflix-inspired design with smooth animations
- 🔍 **Search & Discovery**: Search movies and TV shows with real-time results
- 📱 **Responsive Design**: Works perfectly on all devices
- 🎯 **Category Filtering**: Browse by movies, TV shows, or all content
- ⭐ **Rich Content**: Trending, popular, top-rated, and now playing content
- 🎮 **Video Player**: Custom video player with modern controls
- 🌟 **TMDB Integration**: Real-time data from The Movie Database

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui, Lucide React icons
- **State Management**: React Query for API state management
- **API**: TMDB (The Movie Database) API
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Get your TMDB API key from [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
4. Replace the demo API key in `src/services/tmdb.ts` with your actual key
5. Start the development server: `npm run dev`

## API Key Setup

To use your own TMDB API key:

1. Open `src/services/tmdb.ts`
2. Replace the `TMDB_API_KEY` value with your actual API key
3. The current key is a demo key with limited functionality

## Features Overview

### 🏠 Homepage
- Hero section with featured movie
- Multiple content carousels (Trending, Popular, Top Rated)
- Smooth scrolling navigation
- Category filtering

### 🔍 Search
- Real-time search functionality
- Search across movies and TV shows
- Results displayed in responsive grid
- Search suggestions and auto-complete

### 🎬 Content Discovery
- Trending content (daily/weekly)
- Popular movies and TV shows
- Top-rated content
- Now playing movies
- Upcoming releases

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly navigation
- Responsive video player

### 🎮 Video Player
- Custom video player interface
- Play/pause controls
- Volume control
- Fullscreen support
- Progress tracking
- Settings menu

## Customization

### Colors & Themes
The app uses a custom color palette defined in `tailwind.config.ts`. You can customize:
- Primary/secondary colors
- Gradient backgrounds
- Glass morphism effects
- Dark theme variations

### Fonts
Currently using Inter and Space Grotesk fonts. You can change fonts in:
- `index.html` (Google Fonts links)
- `tailwind.config.ts` (font family configuration)

### Layout & Components
All components are modular and can be easily customized:
- `Header.tsx` - Navigation and search
- `HeroSection.tsx` - Featured content banner
- `MovieCard.tsx` - Content item display
- `VideoPlayer.tsx` - Video playback interface
- `ContentRow.tsx` - Horizontal content carousel

## Performance Features

- **Lazy Loading**: Images and content load on demand
- **Responsive Images**: Multiple image sizes from TMDB
- **Smooth Animations**: Hardware-accelerated CSS animations
- **Optimized API Calls**: React Query for caching and deduplication
- **Code Splitting**: Automatic code splitting with Vite

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is for educational purposes. TMDB API usage subject to their terms of service.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

Built with ❤️ using modern web technologies


import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ContentRow from '@/components/ContentRow';
import VideoPlayer from '@/components/VideoPlayer';
import SearchResults from '@/components/SearchResults';
import { Movie, TVShow, TMDBResponse } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<(Movie | TVShow)[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Movie | TVShow | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  // Fetch trending movies for hero section
  const { data: trendingMovies } = useQuery({
    queryKey: ['trending-movies'],
    queryFn: () => tmdbApi.getTrendingMovies('day'),
  });

  // Fetch popular movies
  const { data: popularMovies } = useQuery({
    queryKey: ['popular-movies'],
    queryFn: () => tmdbApi.getPopularMovies(),
  });

  // Fetch popular TV shows
  const { data: popularTVShows } = useQuery({
    queryKey: ['popular-tv'],
    queryFn: () => tmdbApi.getPopularTVShows(),
  });

  // Fetch top rated movies
  const { data: topRatedMovies } = useQuery({
    queryKey: ['top-rated-movies'],
    queryFn: () => tmdbApi.getTopRatedMovies(),
  });

  // Fetch top rated TV shows
  const { data: topRatedTVShows } = useQuery({
    queryKey: ['top-rated-tv'],
    queryFn: () => tmdbApi.getTopRatedTVShows(),
  });

  // Fetch now playing movies
  const { data: nowPlayingMovies } = useQuery({
    queryKey: ['now-playing'],
    queryFn: () => tmdbApi.getNowPlayingMovies(),
  });

  // Handle search
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchQuery('');
      setSearchResults([]);
      return;
    }

    setSearchQuery(query);
    setSearchLoading(true);

    try {
      const response = await tmdbApi.searchMulti(query);
      setSearchResults(response.results || []);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: 'Search Error',
        description: 'Failed to search. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSearchLoading(false);
    }
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Handle item click
  const handleItemClick = (item: Movie | TVShow) => {
    setSelectedItem(item);
    // In a real app, this would navigate to a detail page
    // For demo purposes, we'll show some info
    const isMovie = 'title' in item;
    const title = isMovie ? item.title : item.name;
    
    toast({
      title: `${isMovie ? 'Movie' : 'TV Show'} Selected`,
      description: `${title} - Click "Play Now" to start streaming`,
    });
  };

  // Handle play click
  const handlePlayClick = (item: Movie | TVShow) => {
    setSelectedItem(item);
    setShowPlayer(true);
  };

  // Handle close player
  const handleClosePlayer = () => {
    setShowPlayer(false);
    setSelectedItem(null);
  };

  // Handle close search
  const handleCloseSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  // Get hero movie (first trending movie)
  const heroMovie = trendingMovies?.results?.[0];

  // Filter content based on active category
  const getFilteredContent = (data: TMDBResponse<Movie | TVShow> | undefined) => {
    if (!data?.results) return [];
    
    if (activeCategory === 'all') return data.results;
    if (activeCategory === 'movie') {
      return data.results.filter(item => 'title' in item);
    }
    if (activeCategory === 'tv') {
      return data.results.filter(item => 'name' in item);
    }
    
    return data.results;
  };

  // Show search results if there's a search query
  if (searchQuery) {
    return (
      <>
        <Header
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          activeCategory={activeCategory}
        />
        <SearchResults
          query={searchQuery}
          results={searchResults}
          loading={searchLoading}
          onClose={handleCloseSearch}
          onItemClick={handleItemClick}
        />
        {showPlayer && selectedItem && (
          <VideoPlayer
            item={selectedItem}
            onClose={handleClosePlayer}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Header */}
      <Header
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        activeCategory={activeCategory}
      />

      {/* Hero Section */}
      {heroMovie && (
        <HeroSection
          movie={heroMovie}
          onPlayClick={handlePlayClick}
          onInfoClick={handleItemClick}
        />
      )}

      {/* Content Sections */}
      <div className="relative -mt-32 z-10">
        {/* Trending Now */}
        {trendingMovies && (
          <ContentRow
            title="🔥 Trending Now"
            items={getFilteredContent(trendingMovies)}
            onItemClick={handleItemClick}
          />
        )}

        {/* Popular Movies */}
        {popularMovies && activeCategory !== 'tv' && (
          <ContentRow
            title="🎬 Popular Movies"
            items={getFilteredContent(popularMovies)}
            onItemClick={handleItemClick}
          />
        )}

        {/* Popular TV Shows */}
        {popularTVShows && activeCategory !== 'movie' && (
          <ContentRow
            title="📺 Popular TV Shows"
            items={getFilteredContent(popularTVShows)}
            onItemClick={handleItemClick}
          />
        )}

        {/* Top Rated Movies */}
        {topRatedMovies && activeCategory !== 'tv' && (
          <ContentRow
            title="⭐ Top Rated Movies"
            items={getFilteredContent(topRatedMovies)}
            onItemClick={handleItemClick}
          />
        )}

        {/* Top Rated TV Shows */}
        {topRatedTVShows && activeCategory !== 'movie' && (
          <ContentRow
            title="🏆 Top Rated TV Shows"
            items={getFilteredContent(topRatedTVShows)}
            onItemClick={handleItemClick}
          />
        )}

        {/* Now Playing */}
        {nowPlayingMovies && activeCategory !== 'tv' && (
          <ContentRow
            title="🎪 Now Playing"
            items={getFilteredContent(nowPlayingMovies)}
            onItemClick={handleItemClick}
          />
        )}

        {/* Footer */}
        <footer className="section-padding py-12 mt-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold font-space text-gradient">FlixStream</span>
            </div>
            <p className="text-gray-400 mb-4">
              Stream the latest movies and TV shows in HD quality
            </p>
            <p className="text-xs text-gray-500">
              This is a demo application. Content is powered by TMDB API.
            </p>
          </div>
        </footer>
      </div>

      {/* Video Player Modal */}
      {showPlayer && selectedItem && (
        <VideoPlayer
          item={selectedItem}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
};

export default Index;

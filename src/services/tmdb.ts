
const TMDB_API_KEY = '4e44d9029b1270a757cddc766a1bcb63'; // Demo key - users should replace with their own
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const tmdbApi = {
  // Get trending movies
  getTrendingMovies: async (timeWindow: 'day' | 'week' = 'day') => {
    const response = await fetch(`${TMDB_BASE_URL}/trending/movie/${timeWindow}?api_key=${TMDB_API_KEY}`);
    return response.json();
  },

  // Get trending TV shows
  getTrendingTVShows: async (timeWindow: 'day' | 'week' = 'day') => {
    const response = await fetch(`${TMDB_BASE_URL}/trending/tv/${timeWindow}?api_key=${TMDB_API_KEY}`);
    return response.json();
  },

  // Get popular movies
  getPopularMovies: async (page: number = 1) => {
    const response = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`);
    return response.json();
  },

  // Get popular TV shows
  getPopularTVShows: async (page: number = 1) => {
    const response = await fetch(`${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&page=${page}`);
    return response.json();
  },

  // Get top rated movies
  getTopRatedMovies: async (page: number = 1) => {
    const response = await fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&page=${page}`);
    return response.json();
  },

  // Get top rated TV shows
  getTopRatedTVShows: async (page: number = 1) => {
    const response = await fetch(`${TMDB_BASE_URL}/tv/top_rated?api_key=${TMDB_API_KEY}&page=${page}`);
    return response.json();
  },

  // Get now playing movies
  getNowPlayingMovies: async (page: number = 1) => {
    const response = await fetch(`${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&page=${page}`);
    return response.json();
  },

  // Get upcoming movies
  getUpcomingMovies: async (page: number = 1) => {
    const response = await fetch(`${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&page=${page}`);
    return response.json();
  },

  // Search movies and TV shows
  searchMulti: async (query: string, page: number = 1) => {
    const response = await fetch(`${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
    return response.json();
  },

  // Get movie details
  getMovieDetails: async (movieId: number) => {
    const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits,similar`);
    return response.json();
  },

  // Get TV show details
  getTVShowDetails: async (tvId: number) => {
    const response = await fetch(`${TMDB_BASE_URL}/tv/${tvId}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits,similar`);
    return response.json();
  },

  // Get genres
  getMovieGenres: async () => {
    const response = await fetch(`${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`);
    return response.json();
  },

  getTVGenres: async () => {
    const response = await fetch(`${TMDB_BASE_URL}/genre/tv/list?api_key=${TMDB_API_KEY}`);
    return response.json();
  },

  // Helper functions
  getImageUrl: (imagePath: string, size: string = 'w500') => {
    if (!imagePath) return '/placeholder.svg';
    return `${TMDB_IMAGE_BASE_URL}/${size}${imagePath}`;
  },

  getBackdropUrl: (imagePath: string, size: string = 'w1280') => {
    if (!imagePath) return '/placeholder.svg';
    return `${TMDB_IMAGE_BASE_URL}/${size}${imagePath}`;
  }
};


import React from 'react';
import { Play, Info, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Movie } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';

interface HeroSectionProps {
  movie: Movie;
  onPlayClick: (movie: Movie) => void;
  onInfoClick: (movie: Movie) => void;
}

const HeroSection = ({ movie, onPlayClick, onInfoClick }: HeroSectionProps) => {
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';

  return (
    <div className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${tmdbApi.getBackdropUrl(movie.backdrop_path, 'w1280')})`
        }}
      >
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center section-padding">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold font-space text-white mb-4 animate-fade-in">
              {movie.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center space-x-6 mb-6 animate-slide-up">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <span className="text-white font-semibold text-lg">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-300">
                  ({movie.vote_count.toLocaleString()} votes)
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-300" />
                <span className="text-white font-semibold text-lg">{year}</span>
              </div>
              
              <div className="px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full">
                <span className="text-primary font-semibold text-sm">Movie</span>
              </div>
            </div>

            {/* Overview */}
            <p className="text-lg text-gray-200 leading-relaxed mb-8 max-w-xl animate-slide-up">
              {movie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 animate-scale-in">
              <Button
                onClick={() => onPlayClick(movie)}
                className="btn-primary flex items-center space-x-3 text-lg px-8 py-4"
              >
                <Play className="w-6 h-6" fill="white" />
                <span>Play Now</span>
              </Button>
              
              <Button
                onClick={() => onInfoClick(movie)}
                variant="outline"
                className="flex items-center space-x-3 text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Info className="w-6 h-6" />
                <span>More Info</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

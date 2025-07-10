
import React from 'react';
import { Star, Calendar, Play } from 'lucide-react';
import { Movie, TVShow } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';

interface MovieCardProps {
  item: Movie | TVShow;
  onClick: () => void;
}

const MovieCard = ({ item, onClick }: MovieCardProps) => {
  const isMovie = 'title' in item;
  const title = isMovie ? item.title : item.name;
  const releaseDate = isMovie ? item.release_date : item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';

  return (
    <div
      className="group relative bg-card rounded-xl overflow-hidden card-hover cursor-pointer"
      onClick={onClick}
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={tmdbApi.getImageUrl(item.poster_path, 'w500')}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-8 h-8 text-white ml-1" fill="white" />
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
          <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
          <span className="text-xs font-medium text-white">
            {item.vote_average.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{year}</span>
          </div>
          <span className="capitalize text-primary font-medium">
            {isMovie ? 'Movie' : 'TV Show'}
          </span>
        </div>
        
        {item.overview && (
          <p className="text-xs text-gray-400 mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {item.overview}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;

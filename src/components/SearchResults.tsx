
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MovieCard from './MovieCard';
import { Movie, TVShow } from '@/types/movie';

interface SearchResultsProps {
  query: string;
  results: (Movie | TVShow)[];
  loading: boolean;
  onClose: () => void;
  onItemClick: (item: Movie | TVShow) => void;
}

const SearchResults = ({ query, results, loading, onClose, onItemClick }: SearchResultsProps) => {
  if (!query && !loading) return null;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white font-space mb-2">
              Search Results
            </h1>
            {query && (
              <p className="text-gray-400">
                {loading ? 'Searching...' : `Found ${results.length} results for "${query}"`}
              </p>
            )}
          </div>
          
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-black/20 border-white/20 text-white hover:bg-white/20"
          >
            <X className="w-4 h-4 mr-2" />
            Close Search
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}

        {/* Results Grid */}
        {!loading && results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {results.map((item) => (
              <MovieCard
                key={item.id}
                item={item}
                onClick={() => onItemClick(item)}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && query && results.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
            <p className="text-gray-400">
              Try searching with different keywords or check your spelling
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

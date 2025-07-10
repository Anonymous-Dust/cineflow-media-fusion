
import React, { useState } from 'react';
import { X, Volume2, VolumeX, Play, Pause, Maximize, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Movie, TVShow } from '@/types/movie';

interface VideoPlayerProps {
  item: Movie | TVShow;
  onClose: () => void;
}

const VideoPlayer = ({ item, onClose }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const isMovie = 'title' in item;
  const title = isMovie ? item.title : item.name;

  // Demo video URLs - in production, you would integrate with actual streaming services
  const demoVideoUrls = [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  ];

  const videoUrl = demoVideoUrls[item.id % demoVideoUrls.length];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className={`absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white font-space">
              {title}
            </h1>
            <p className="text-gray-300 mt-1">
              {isMovie ? 'Movie' : 'TV Show'} • HD Quality
            </p>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 w-10 h-10 p-0"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Video Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Video Element */}
        <video
          className="w-full h-full object-contain"
          poster={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
          muted={isMuted}
          autoPlay={isPlaying}
          controls={false}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClick={togglePlay}
              className="w-20 h-20 bg-primary/80 hover:bg-primary rounded-full p-0 backdrop-blur-sm shadow-2xl"
            >
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </Button>
          </div>
        )}

        {/* Bottom Controls */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          {/* Progress Bar */}
          <div className="w-full bg-white/20 h-1 rounded-full mb-4">
            <div className="bg-primary h-full w-1/3 rounded-full"></div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlay}
                className="text-white hover:bg-white/20 w-10 h-10 p-0"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" fill="white" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="text-white hover:bg-white/20 w-10 h-10 p-0"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>

              <div className="text-white text-sm">
                0:23 / 1:45:30
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 w-10 h-10 p-0"
              >
                <Settings className="w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 w-10 h-10 p-0"
              >
                <Maximize className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Loading Indicator */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin opacity-0"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

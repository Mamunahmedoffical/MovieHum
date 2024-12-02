import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Movie } from "../types/movie";
import { IMAGE_BASE_URL, BACKDROP_SIZE } from "../config/api";

interface HeroProps {
  movie: Movie;
  onPrevious: () => void;
  onNext: () => void;
}

export const Hero: React.FC<HeroProps> = ({ movie, onPrevious, onNext }) => {
  const autoRotateRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    autoRotateRef.current = setInterval(onNext, 5000);
    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [onNext]);

  const handleManualNavigation = (action: () => void) => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
    }
    action();
    autoRotateRef.current = setInterval(onNext, 5000);
  };

  return (
    <div className="relative h-[600px] w-full group">
      <div className="absolute inset-0">
        <img
          src={`${IMAGE_BASE_URL}/${BACKDROP_SIZE}${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>

      <button
        onClick={() => handleManualNavigation(onPrevious)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
        aria-label="Previous movie"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={() => handleManualNavigation(onNext)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
        aria-label="Next movie"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-medium">
              Trending
            </span>
            {movie.vote_average > 7.5 && (
              <span className="bg-yellow-500 px-3 py-1 rounded-full text-sm font-medium text-black">
                Top IMDB {movie.vote_average.toFixed(1)}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">{movie.overview}</p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
};

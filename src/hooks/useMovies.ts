import { useState, useEffect } from 'react';
import { Movie, MovieResponse } from '../types/movie';
import { getPopularMovies, searchMovies, getRegionalMovies } from '../services/movieService';

interface UseMoviesProps {
  searchQuery: string;
  activeCategory: string;
  currentPage: number;
}

export const useMovies = ({ searchQuery, activeCategory, currentPage }: UseMoviesProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let response: MovieResponse;

        if (searchQuery) {
          response = await searchMovies(searchQuery, currentPage);
        } else if (activeCategory) {
          response = await getRegionalMovies(activeCategory, currentPage);
        } else {
          response = await getPopularMovies(currentPage);
        }

        setMovies(response.results);
        setTotalPages(response.total_pages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching movies');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, activeCategory, currentPage]);

  return { movies, totalPages, isLoading, error };
};
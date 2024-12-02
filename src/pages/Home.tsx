import React, { useEffect, useState, useCallback } from "react";
import { Hero } from "../components/Hero";
import { MovieCard } from "../components/MovieCard";
import { SearchBar } from "../components/SearchBar";
import { Pagination } from "../components/Pagination";
import { CategoryTabs } from "../components/CategoryTabs";
import { TopIMDBSection } from "../components/TopIMDBSection";
import { getTrendingMovies, getTopRatedMovies } from "../services/movieService";
import { useMovies } from "../hooks/useMovies";
import { Movie } from "../types/movie";

export const Home: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topIMDBMovies, setTopIMDBMovies] = useState<Movie[]>([]);
  const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { movies, totalPages, isLoading, error } = useMovies({
    searchQuery,
    activeCategory,
    currentPage,
  });

  const fetchTrendingMovies = async () => {
    try {
      const response = await getTrendingMovies();
      setTrendingMovies(response.results);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const fetchTopIMDBMovies = async () => {
    try {
      const response = await getTopRatedMovies();
      setTopIMDBMovies(response.results.slice(0, 4));
    } catch (error) {
      console.error("Error fetching top IMDB movies:", error);
    }
  };

  const rotateMovies = useCallback(() => {
    setCurrentTrendingIndex((prev) =>
      prev === trendingMovies.length - 1 ? 0 : prev + 1
    );
  }, [trendingMovies.length]);

  useEffect(() => {
    fetchTrendingMovies();
    fetchTopIMDBMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(rotateMovies, 5000); // Rotate every 5 seconds
    return () => clearInterval(interval);
  }, [rotateMovies]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: { id: string; language: string }) => {
    setActiveCategory(category.language);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousTrending = () => {
    setCurrentTrendingIndex((prev) =>
      prev === 0 ? trendingMovies.length - 1 : prev - 1
    );
  };

  const handleNextTrending = () => {
    setCurrentTrendingIndex((prev) =>
      prev === trendingMovies.length - 1 ? 0 : prev + 1
    );
  };

  if (!trendingMovies.length) return null;

  return (
    <div className="dark:bg-gray-900 transition-colors">
      {!searchQuery && !activeCategory && (
        <Hero
          movie={trendingMovies[currentTrendingIndex]}
          onPrevious={handlePreviousTrending}
          onNext={handleNextTrending}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        {!searchQuery && !activeCategory && (
          <TopIMDBSection movies={topIMDBMovies} />
        )}
        {error && <div className="text-red-600 text-center py-4">{error}</div>}
        {isLoading ? (
          <div className="text-center py-8 dark:text-gray-200">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

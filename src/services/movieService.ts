import axios from 'axios';
import { BASE_URL, API_KEY } from '../config/api';
import { Movie, MovieResponse } from '../types/movie';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getPopularMovies = async (page: number = 1): Promise<MovieResponse> => {
  const response = await api.get('/movie/popular', { params: { page } });
  return response.data;
};

export const getTrendingMovies = async (page: number = 1): Promise<MovieResponse> => {
  const response = await api.get('/trending/movie/week', { params: { page } });
  return response.data;
};

export const getTopRatedMovies = async (page: number = 1): Promise<MovieResponse> => {
  const response = await api.get('/movie/top_rated', {
    params: {
      page,
      'vote_count.gte': 1000,
    },
  });
  return response.data;
};

export const searchMovies = async (query: string, page: number = 1): Promise<MovieResponse> => {
  const response = await api.get('/search/movie', {
    params: { query, page },
  });
  return response.data;
};

export const getRegionalMovies = async (
  language: string,
  page: number = 1
): Promise<MovieResponse> => {
  const response = await api.get('/discover/movie', {
    params: {
      with_original_language: language,
      page,
      sort_by: 'popularity.desc',
    },
  });
  return response.data;
};

export const getUpcomingMovies = async (page: number = 1): Promise<MovieResponse> => {
  const response = await api.get('/movie/upcoming', { params: { page } });
  return response.data;
};
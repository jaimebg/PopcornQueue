import {useState, useCallback, useRef, useEffect} from 'react';
import type {Movie} from '../types/movie';
import {fetchPopularMovies} from '../services/tmdb';

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pageRef = useRef(1);
  const hasMoreRef = useRef(true);
  const loadingRef = useRef(false);

  const fetchMovies = useCallback(async (isRefresh = false) => {
    if (loadingRef.current || (!hasMoreRef.current && !isRefresh)) {
      return;
    }

    const currentPage = isRefresh ? 1 : pageRef.current;
    loadingRef.current = true;
    setLoading(true);

    if (isRefresh) {
      setRefreshing(true);
      setError(null);
    }

    try {
      const data = await fetchPopularMovies(currentPage);

      if (data.results) {
        setMovies(prev =>
          isRefresh ? data.results : [...prev, ...data.results],
        );
        pageRef.current = currentPage + 1;
        hasMoreRef.current = currentPage < data.total_pages;
      }
    } catch (err) {
      setError('Failed to fetch movies.');
      console.error(err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const refresh = useCallback(() => {
    hasMoreRef.current = true;
    fetchMovies(true);
  }, [fetchMovies]);

  return {movies, loading, refreshing, error, refresh, loadMore: fetchMovies};
}

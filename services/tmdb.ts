import Config from 'react-native-config';
import type {ApiListResponse} from '../types/movie';
import {TMDB_API_BASE_URL} from '../constants/theme';

export async function fetchPopularMovies(
  page: number,
): Promise<ApiListResponse> {
  const url = `${TMDB_API_BASE_URL}/movie/popular?language=en-US&page=${page}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${Config.TMDB_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<ApiListResponse>;
}

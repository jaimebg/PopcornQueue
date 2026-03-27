import type {Movie, ApiListResponse} from '../types/movie';
import {TMDB_IMAGE_BASE_URL} from '../constants/theme';

const movie: Movie = {
  id: 1,
  title: 'Inception',
  poster_path: '/poster.jpg',
  release_date: '2010-07-16',
  overview: 'A mind-bending thriller.',
  adult: false,
  backdrop_path: '/backdrop.jpg',
  genre_ids: [28, 12],
  original_language: 'en',
  original_title: 'Inception',
  popularity: 95.5,
  video: false,
  vote_average: 8.4,
  vote_count: 30000,
};

test('movie poster URL is built correctly', () => {
  const url = `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`;
  expect(url).toBe('https://image.tmdb.org/t/p/w500/poster.jpg');
});

test('release year is extracted from release_date', () => {
  const year = new Date(movie.release_date).getFullYear();
  expect(year).toBe(2010);
});

test('vote_average formats to one decimal', () => {
  const formatted = movie.vote_average.toFixed(1);
  expect(formatted).toBe('8.4');
});

test('ApiListResponse holds a page of movies', () => {
  const response: ApiListResponse = {
    page: 1,
    results: [movie],
    total_pages: 5,
    total_results: 100,
  };
  expect(response.results).toHaveLength(1);
  expect(response.results[0].title).toBe('Inception');
});

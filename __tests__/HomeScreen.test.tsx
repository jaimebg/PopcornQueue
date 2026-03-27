import React from 'react';
import {act, create, ReactTestRenderer} from 'react-test-renderer';
import Home from '../screens/HomeScreen';
import type {Movie, ApiListResponse} from '../types/movie';

const mockNavigate = jest.fn();
const mockNavigation = {navigate: mockNavigate} as any;

const mockMovie = (overrides: Partial<Movie> = {}): Movie => ({
  id: 1,
  title: 'Test Movie',
  poster_path: '/test.jpg',
  release_date: '2025-01-15',
  overview: 'A test movie overview.',
  adult: false,
  backdrop_path: '/backdrop.jpg',
  genre_ids: [28, 12],
  original_language: 'en',
  original_title: 'Test Movie',
  popularity: 100,
  video: false,
  vote_average: 7.5,
  vote_count: 1000,
  ...overrides,
});

const mockApiResponse = (
  movies: Movie[] = [mockMovie()],
  page: number = 1,
  totalPages: number = 5,
): ApiListResponse => ({
  page,
  results: movies,
  total_pages: totalPages,
  total_results: totalPages * 20,
});

beforeEach(() => {
  jest.clearAllMocks();
  (global.fetch as jest.Mock) = jest.fn();
});

function mockFetchSuccess(response: ApiListResponse) {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    json: () => Promise.resolve(response),
  });
}

function mockFetchFailure() {
  (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
}

test('fetches and displays movies on mount', async () => {
  const movies = [
    mockMovie({id: 1, title: 'Inception'}),
    mockMovie({id: 2, title: 'Interstellar'}),
  ];
  mockFetchSuccess(mockApiResponse(movies));

  let tree: ReactTestRenderer;
  await act(async () => {
    tree = create(<Home navigation={mockNavigation} route={{} as any} />);
  });

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
    expect.objectContaining({
      method: 'GET',
      headers: expect.objectContaining({
        accept: 'application/json',
      }),
    }),
  );

  const root = tree!.root;
  const allText = root.findAllByType('Text' as any);
  const inceptionText = allText.filter(
    node => node.props.children === 'Inception',
  );
  const interstellarText = allText.filter(
    node => node.props.children === 'Interstellar',
  );
  expect(inceptionText.length).toBeGreaterThan(0);
  expect(interstellarText.length).toBeGreaterThan(0);
});

test('displays error message when fetch fails', async () => {
  mockFetchFailure();
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

  let tree: ReactTestRenderer;
  await act(async () => {
    tree = create(<Home navigation={mockNavigation} route={{} as any} />);
  });

  const root = tree!.root;
  const errorTexts = root.findAllByType('Text' as any).filter(node =>
    typeof node.props.children === 'string' &&
    node.props.children.includes('Failed to fetch movies'),
  );
  expect(errorTexts.length).toBeGreaterThan(0);

  consoleSpy.mockRestore();
});

test('displays empty state when no movies returned', async () => {
  mockFetchSuccess(mockApiResponse([], 1, 1));

  let tree: ReactTestRenderer;
  await act(async () => {
    tree = create(<Home navigation={mockNavigation} route={{} as any} />);
  });

  const root = tree!.root;
  const emptyTexts = root.findAllByType('Text' as any).filter(node =>
    typeof node.props.children === 'string' &&
    node.props.children.includes('No movies found'),
  );
  expect(emptyTexts.length).toBeGreaterThan(0);
});

test('navigates to MovieDetails when a movie card is pressed', async () => {
  const movie = mockMovie({id: 42, title: 'The Matrix'});
  mockFetchSuccess(mockApiResponse([movie]));

  let tree: ReactTestRenderer;
  await act(async () => {
    tree = create(<Home navigation={mockNavigation} route={{} as any} />);
  });

  const root = tree!.root;
  const {Pressable} = require('react-native');
  const pressables = root.findAllByType(Pressable);
  const movieCard = pressables.find(p => p.props.onPress);

  expect(movieCard).toBeDefined();
  await act(async () => {
    movieCard!.props.onPress();
  });

  expect(mockNavigate).toHaveBeenCalledWith('MovieDetails', {movie});
});

test('sends Authorization header with API key', async () => {
  mockFetchSuccess(mockApiResponse());

  await act(async () => {
    create(<Home navigation={mockNavigation} route={{} as any} />);
  });

  const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
  const headers = fetchCall[1].headers;
  expect(headers.Authorization).toMatch(/^Bearer /);
});

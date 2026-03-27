import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import Config from 'react-native-config';
import type {Movie, ApiListResponse} from '../types/movie';
import type {HomeScreenProps} from '../types/navigation';

const NUM_COLUMNS = 2;
const ITEM_MARGIN = 12;

interface MovieCardProps {
  movie: Movie;
  onSelectMovie: (movie: Movie) => void;
  itemWidth: number;
  posterHeight: number;
}

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const ScreenHeader = (): React.JSX.Element => (
  <View style={styles.headerContainer}>
    <Image source={require('../assets/logo.png')} style={styles.logo} />
    <Text style={styles.headerTitle}>Popcorn Queue</Text>
  </View>
);

const MovieCard = React.memo(
  ({movie, onSelectMovie, itemWidth, posterHeight}: MovieCardProps): React.JSX.Element => {
    return (
      <Pressable
        style={[styles.cardContainer, {width: itemWidth}]}
        onPress={() => onSelectMovie(movie)}>
        <Image
          source={{uri: `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}}
          style={[styles.posterImage, {height: posterHeight}]}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.movieTitle} numberOfLines={1}>
            {movie.title}
          </Text>
          <Text style={styles.movieDetails}>
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : 'N/A'}
          </Text>
        </View>
      </Pressable>
    );
  },
);

function Home({navigation}: HomeScreenProps): React.JSX.Element {
  const {width} = useWindowDimensions();
  const itemWidth = useMemo(
    () => (width - (NUM_COLUMNS + 1) * ITEM_MARGIN) / NUM_COLUMNS,
    [width],
  );
  const posterHeight = useMemo(() => itemWidth * 1.5, [itemWidth]);

  const [loading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(
    async (isRefresh: boolean = false) => {
      const currentPage = isRefresh ? 1 : page;
      if (loading || (!hasMore && !isRefresh)) {
        return;
      }

      setLoading(true);
      if (isRefresh) {
        setIsRefreshing(true);
        setError(null);
      }

      const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${currentPage}`;
      const options: RequestInit = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${Config.TMDB_API_KEY}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const jsonData = (await response.json()) as ApiListResponse;

        if (jsonData.results) {
          setMovies(
            isRefresh
              ? jsonData.results
              : [...movies, ...jsonData.results],
          );
          setPage(currentPage + 1);
          setHasMore(currentPage < jsonData.total_pages);
        }
      } catch (err) {
        setError('Failed to fetch movies.');
        console.error(err);
      } finally {
        setLoading(false);
        setIsRefreshing(false);
      }
    },
    [loading, hasMore, page, movies],
  );

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectMovie = useCallback(
    (movie: Movie): void => {
      navigation.navigate('MovieDetails', {movie});
    },
    [navigation],
  );

  const handleRefresh = (): void => {
    setHasMore(true);
    setMovies([]);
    fetchMovies(true);
  };

  const renderFooter = (): React.JSX.Element | null => {
    if (!loading || isRefreshing) {
      return null;
    }
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#FF9811" />
    );
  };

  const renderEmptyState = (): React.JSX.Element | null => {
    if (loading) {
      return null;
    }
    return (
      <View style={styles.centeredMessage}>
        <Text style={styles.messageText}>
          {error ? `\u{1F622}\n${error}` : 'No movies found.'}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({item}) => (
          <MovieCard
            movie={item}
            onSelectMovie={handleSelectMovie}
            itemWidth={itemWidth}
            posterHeight={posterHeight}
          />
        )}
        keyExtractor={(item: Movie) => item.id.toString()}
        numColumns={NUM_COLUMNS}
        ListHeaderComponent={<ScreenHeader />}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyState}
        onEndReached={() => fetchMovies()}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={styles.listContentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  listContentContainer: {
    paddingHorizontal: ITEM_MARGIN / 2,
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  headerTitle: {
    fontFamily: 'Geist-Bold',
    color: 'white',
    fontSize: 24,
    marginTop: 10,
  },
  cardContainer: {
    margin: ITEM_MARGIN / 2,
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    overflow: 'hidden',
  },
  posterImage: {
    width: '100%',
  },
  infoContainer: {
    padding: 10,
  },
  movieTitle: {
    fontFamily: 'Geist-Regular',
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  movieDetails: {
    fontFamily: 'Geist-Regular',
    color: '#A9A9A9',
    fontSize: 12,
    marginTop: 4,
  },
  loader: {
    marginVertical: 20,
  },
  centeredMessage: {
    flex: 1,
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontFamily: 'Geist-Regular',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Home;

import React, {useCallback, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMovies} from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import ScreenHeader from '../components/ScreenHeader';
import {COLORS, LAYOUT} from '../constants/theme';
import type {Movie} from '../types/movie';
import type {HomeScreenProps} from '../types/navigation';

const keyExtractor = (item: Movie) => item.id.toString();

export default function HomeScreen({navigation}: HomeScreenProps) {
  const {width} = useWindowDimensions();
  const {movies, loading, refreshing, error, refresh, loadMore} = useMovies();

  const itemWidth = useMemo(
    () =>
      (width - (LAYOUT.NUM_COLUMNS + 1) * LAYOUT.ITEM_MARGIN) /
      LAYOUT.NUM_COLUMNS,
    [width],
  );
  const posterHeight = useMemo(() => itemWidth * 1.5, [itemWidth]);

  const handleSelectMovie = useCallback(
    (movie: Movie) => {
      navigation.navigate('MovieDetails', {movie});
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}: {item: Movie}) => (
      <MovieCard
        movie={item}
        onPress={handleSelectMovie}
        width={itemWidth}
        posterHeight={posterHeight}
      />
    ),
    [handleSelectMovie, itemWidth, posterHeight],
  );

  const renderFooter = useCallback(() => {
    if (!loading || refreshing) {
      return null;
    }
    return (
      <ActivityIndicator
        style={styles.loader}
        size="large"
        color={COLORS.accent}
      />
    );
  }, [loading, refreshing]);

  const renderEmpty = useCallback(() => {
    if (loading) {
      return null;
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {error ? `\u{1F622}\n${error}` : 'No movies found.'}
        </Text>
      </View>
    );
  }, [loading, error]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={LAYOUT.NUM_COLUMNS}
        ListHeaderComponent={ScreenHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onEndReached={() => loadMore()}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={refresh}
        contentContainerStyle={styles.listContent}
        contentInsetAdjustmentBehavior="automatic"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingHorizontal: LAYOUT.ITEM_MARGIN / 2,
  },
  loader: {
    marginVertical: 20,
  },
  emptyContainer: {
    flex: 1,
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Geist-Regular',
    color: COLORS.text,
    fontSize: 16,
    textAlign: 'center',
  },
});

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {TMDB_IMAGE_BASE_URL, COLORS} from '../constants/theme';
import type {MovieDetailsScreenProps} from '../types/navigation';

export default function MovieDetailsScreen({
  route,
}: MovieDetailsScreenProps) {
  const {movie} = route.params;
  const {width} = useWindowDimensions();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic">
      <Image
        source={{uri: `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}}
        style={[styles.poster, {height: width * 1.2}]}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.title} selectable>
          {movie.title}
        </Text>
        <Text style={styles.releaseDate}>
          Release Date: {new Date(movie.release_date).toLocaleDateString()}
        </Text>
        <View style={styles.ratingRow}>
          <Text style={styles.rating}>
            Rating: {movie.vote_average.toFixed(1)}/10
          </Text>
          <Text style={styles.voteCount}>
            ({movie.vote_count.toLocaleString()} votes)
          </Text>
        </View>
        <Text style={styles.overviewHeader}>Overview</Text>
        <Text style={styles.overview} selectable>
          {movie.overview}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
    gap: 8,
  },
  poster: {
    width: '100%',
    borderRadius: 12,
    borderCurve: 'continuous',
  },
  details: {
    gap: 8,
  },
  title: {
    fontFamily: 'Geist-Bold',
    fontSize: 28,
    color: COLORS.text,
  },
  releaseDate: {
    fontFamily: 'Geist-Regular',
    fontSize: 16,
    color: COLORS.textMuted,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rating: {
    fontFamily: 'Geist-Bold',
    fontSize: 16,
    color: COLORS.rating,
    fontVariant: ['tabular-nums'],
  },
  voteCount: {
    fontFamily: 'Geist-Regular',
    fontSize: 14,
    color: COLORS.textMuted,
    fontVariant: ['tabular-nums'],
  },
  overviewHeader: {
    fontFamily: 'Geist-Bold',
    fontSize: 20,
    color: COLORS.text,
    borderTopColor: COLORS.separator,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  overview: {
    fontFamily: 'Geist-Regular',
    fontSize: 16,
    color: COLORS.textLight,
    lineHeight: 24,
  },
});

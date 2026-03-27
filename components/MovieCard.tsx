import React from 'react';
import {StyleSheet, View, Text, Pressable, Image} from 'react-native';
import {TMDB_IMAGE_BASE_URL, COLORS, LAYOUT} from '../constants/theme';
import type {Movie} from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
  width: number;
  posterHeight: number;
}

function MovieCard({movie, onPress, width, posterHeight}: MovieCardProps) {
  return (
    <Pressable
      style={[styles.container, {width}]}
      onPress={() => onPress(movie)}>
      <Image
        source={{uri: `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}}
        style={[styles.poster, {height: posterHeight}]}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        <Text style={styles.year}>
          {movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : 'N/A'}
        </Text>
      </View>
    </Pressable>
  );
}

export default React.memo(MovieCard);

const styles = StyleSheet.create({
  container: {
    margin: LAYOUT.ITEM_MARGIN / 2,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
  },
  info: {
    padding: 10,
  },
  title: {
    fontFamily: 'Geist-Regular',
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
  year: {
    fontFamily: 'Geist-Regular',
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
});

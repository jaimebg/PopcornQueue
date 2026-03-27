import React, {useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import type {MovieDetailsScreenProps} from '../types/navigation';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetails = ({
  route,
  navigation,
}: MovieDetailsScreenProps): React.JSX.Element => {
  const {movie} = route.params;
  const {width} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const handleGoBack = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const posterUri = `${IMAGE_BASE_URL}${movie.poster_path}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Pressable style={[styles.backButton, {top: insets.top + 8}]} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>{'\u2190'} Back</Text>
      </Pressable>
      <ScrollView>
        <View style={styles.contentContainer}>
          <Image
            source={{uri: posterUri}}
            style={[styles.poster, {height: width * 1.2}]}
            resizeMode="cover"
          />

          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{movie.title}</Text>

            <Text style={styles.releaseDate}>
              Release Date:{' '}
              {new Date(movie.release_date).toLocaleDateString()}
            </Text>

            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>
                Rating: {movie.vote_average.toFixed(1)}/10
              </Text>
              <Text style={styles.voteCount}>
                ({movie.vote_count} votes)
              </Text>
            </View>

            <Text style={styles.overviewHeader}>Overview</Text>
            <Text style={styles.overview}>{movie.overview}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 16,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backButtonText: {
    fontFamily: 'Geist-Bold',
    color: '#FFFFFF',
    fontSize: 16,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 80,
  },
  poster: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: 'center',
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Geist-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  releaseDate: {
    fontFamily: 'Geist-Regular',
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontFamily: 'Geist-Bold',
    fontSize: 16,
    color: '#FFD700',
    marginRight: 8,
  },
  voteCount: {
    fontFamily: 'Geist-Regular',
    fontSize: 14,
    color: '#A0A0A0',
  },
  overviewHeader: {
    fontFamily: 'Geist-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 8,
    borderTopColor: '#333',
    borderTopWidth: 1,
    paddingTop: 16,
  },
  overview: {
    fontFamily: 'Geist-Regular',
    fontSize: 16,
    color: '#E0E0E0',
    lineHeight: 24,
  },
});

export default MovieDetails;

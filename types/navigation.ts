import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {Movie} from './movie';

export type RootStackParamList = {
  Home: undefined;
  MovieDetails: {movie: Movie};
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export type MovieDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MovieDetails'
>;

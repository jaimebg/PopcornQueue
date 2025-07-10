import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Image,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import Config from "react-native-config";
import { z } from 'zod';

const { width, height } = Dimensions.get('window');
const NUM_COLUMNS = 2;
const ITEM_MARGIN = 12;
const ITEM_WIDTH = (width - (NUM_COLUMNS + 1) * ITEM_MARGIN) / NUM_COLUMNS;

const MovieSchema = z.object({
    id: z.number(),
    title: z.string(),
    poster_path: z.string(),
    release_date: z.string(),
    overview: z.string(),
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    genre_ids: z.array(z.number()),
    original_language: z.string(),
    original_title: z.string(),
    popularity: z.number(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number(),
});

const ApiListResponseSchema = z.object({
    page: z.number(),
    results: z.array(MovieSchema),
    total_pages: z.number(),
    total_results: z.number(),
});

const ScreenHeader = () => (
    <View style={styles.headerContainer}>
        <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
        />
        <Text style={styles.headerTitle}>Popcorn Queue</Text>
    </View>
);

const MovieCard = ({ movie, onSelectMovie }) => {
    const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

    return (
        <Pressable
            style={styles.cardContainer}
            onPress={() => onSelectMovie(movie)}
        >
            <Image
                source={{ uri: `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` }}
                style={styles.posterImage}
                resizeMode="cover"
            />
            <View style={styles.infoContainer}>
                <Text style={styles.movieTitle} numberOfLines={1}>{movie.title}</Text>
                <Text style={styles.movieDetails}>
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                </Text>
            </View>
        </Pressable>
    );
};

function Home({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    const fetchMovies = useCallback(async (isRefresh = false) => {
        const currentPage = isRefresh ? 1 : page;
        if (loading || (!hasMore && !isRefresh)) return;

        setLoading(true);
        if (isRefresh) {
            setIsRefreshing(true);
            setError(null);
        }

        const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${currentPage}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${Config.TMDB_API_KEY}`
            }
        };

        try {
            const response = await fetch(url, options);
            const jsonData = await response.json();
            const validatedData = ApiListResponseSchema.parse(jsonData);

            if (validatedData.results) {
                setMovies(isRefresh ? validatedData.results : [...movies, ...validatedData.results]);
                setPage(currentPage + 1);
                setHasMore(currentPage < validatedData.total_pages);
            }
        } catch (err) {
            setError(err instanceof z.ZodError ? 'Data validation failed.' : 'Failed to fetch movies.');
            console.error(err);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    }, [loading, hasMore, page, movies]);

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleSelectMovie = (movie) => {
        navigation.navigate('MovieDetails', { movie });
    };

    const handleRefresh = () => {
        setHasMore(true);
        setMovies([]);
        fetchMovies(true);
    };

    const renderFooter = () => {
        if (!loading || isRefreshing) return null;
        return <ActivityIndicator style={styles.loader} size="large" color="#FF9811" />;
    };

    const renderEmptyState = () => {
        if (loading) return null;
        return (
            <View style={styles.centeredMessage}>
                <Text style={styles.messageText}>
                    {error ? `😢\n${error}` : "No movies found."}
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard movie={item} onSelectMovie={handleSelectMovie} />}
                keyExtractor={(item) => item.id.toString()}
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
        position: 'absolute', top: 0, right: 0, bottom: 0, left: 0
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
        width: ITEM_WIDTH,
        margin: ITEM_MARGIN / 2,
        backgroundColor: '#2C2C2E',
        borderRadius: 12,
        overflow: 'hidden',
    },
    posterImage: {
        width: '100%',
        height: ITEM_WIDTH * 1.5,
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
        height: height * 0.6,
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
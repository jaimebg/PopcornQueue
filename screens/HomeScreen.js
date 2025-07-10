import { StyleSheet, View, Text, Pressable, Image, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import Config from "react-native-config";
import { z } from 'zod';

function Home({ navigation }) {
    const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

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

    const fetchMovies = async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
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

            if (validatedData.results && validatedData.results.length > 0) {
                setMovies(prevMovies => [...prevMovies, ...validatedData.results]);
                if (page >= validatedData.total_pages) {
                    setHasMore(false);
                } else {
                    setPage(prevPage => prevPage + 1);
                }
            } else {
                setHasMore(false);
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                console.error('Zod validation failed:', err.errors);
            } else {
                console.error('Failed to fetch movies:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const moviesRender = ({ item }) => {
        return (
            <Pressable
                style={{
                    flexDirection: 'row',
                    padding: 10,
                    margin: 10,
                    backgroundColor: '#333',
                    borderRadius: 10,
                    alignItems: 'center',
                }}
                onPress={() => navigation.navigate('MovieDetails', { movie: item })}
            >
                <Image
                    source={{ uri: `${TMDB_IMAGE_BASE_URL}${item.poster_path}` }}
                    resizeMode="contain"
                    height={90}
                    width={60}
                    style={{ borderRadius: 10, marginRight: 10 }}
                />
                <View>
                    <View>
                        <Text style={{ color: 'white', fontSize: 12 }}>{item.title}</Text>
                        <Text style={{ color: 'white', fontSize: 12 }}>
                            {item.release_date ? new Date(item.release_date).getFullYear() : 'TBA'}
                        </Text>
                    </View>
                    <Text style={{ color: 'white', fontSize: 12 }}>
                        Rating: {item.vote_average}
                    </Text>
                </View>
            </Pressable>
        );
    };

    const Loader = ({ loading }) => {
        if (!loading) return null;
        return <ActivityIndicator size="large" color="#FF9811" />;
    };

    const handleLoadMore = () => {
        fetchMovies();
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Image
                    source={require('../assets/logo.png')}
                    style={{ width: 50, height: 50, alignSelf: 'center', marginTop: 25 }}
                />
                <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center', textAlign: 'center', marginTop: 10 }}>
                    Popcorn Queue
                </Text>
                <FlatList
                    data={movies}
                    renderItem={moviesRender}
                    keyExtractor={(item) => item.id}
                    ListFooterComponent={<Loader loading={loading} />}
                    onEndReached={handleLoadMore}
                />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A2001D',
    },
});

export default Home;

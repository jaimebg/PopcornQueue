import { StyleSheet, useColorScheme, View, Text, Pressable, Image, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Config from "react-native-config";

function Home() {
    const navigation = useNavigation();
    const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
        if (loading) return;
        setLoading(true);

        const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
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
            console.log('Fetched movies:', jsonData.results);

            setMovies(jsonData.results || []);
        } catch (err) {
            console.error('Failed to fetch movies:', err);
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
                    keyExtractor={(item) => item.original_title}
                    ListFooterComponent={<Loader loading={loading} />}
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

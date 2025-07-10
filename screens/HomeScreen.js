import { StyleSheet, useColorScheme, View, Text, Pressable, Image, SafeAreaView, FlatList } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useState } from 'react';
import Config from "react-native-config";

function Home() {
    const navigation = useNavigation();
    const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
    const [movies, setMovies] = useState([
        {
            "adult": false,
            "backdrop_path": "/x58Gk2ZGU5AEBp25MQe2nhZhd5z.jpg",
            "genre_ids": [
                28,
                14
            ],
            "id": 846422,
            "original_language": "en",
            "original_title": "The Old Guard 2",
            "overview": "Andy and her team of immortal warriors fight with renewed purpose as they face a powerful new foe threatening their mission to protect humanity.",
            "popularity": 617.5863,
            "poster_path": "/wqfu3bPLJaEWJVk3QOm0rKhxf1A.jpg",
            "release_date": "2025-07-01",
            "title": "The Old Guard 2",
            "video": false,
            "vote_average": 6.14,
            "vote_count": 360
        },
        {
            "adult": false,
            "backdrop_path": "/sItIskd5xpiE64bBWYwZintkGf3.jpg",
            "genre_ids": [
                28,
                53,
                80
            ],
            "id": 541671,
            "original_language": "en",
            "original_title": "Ballerina",
            "overview": "Taking place during the events of John Wick: Chapter 3 – Parabellum, Eve Macarro begins her training in the assassin traditions of the Ruska Roma.",
            "popularity": 594.0901,
            "poster_path": "/2VUmvqsHb6cEtdfscEA6fqqVzLg.jpg",
            "release_date": "2025-06-04",
            "title": "Ballerina",
            "video": false,
            "vote_average": 7.4,
            "vote_count": 820
        },
        {
            "adult": false,
            "backdrop_path": "/xABhldZaMb6wfCH5oigV333OYnb.jpg",
            "genre_ids": [
                28,
                53,
                35
            ],
            "id": 749170,
            "original_language": "en",
            "original_title": "Heads of State",
            "overview": "The UK Prime Minister and US President have a public rivalry that risks their countries' alliance. But when they become targets of a powerful enemy, they're forced to rely on each other as they go on a wild, multinational run. Allied with Noel, a brilliant MI6 agent, they must find a way to thwart a conspiracy that threatens the free world.",
            "popularity": 514.58,
            "poster_path": "/lVgE5oLzf7ABmzyASEVcjYyHI41.jpg",
            "release_date": "2025-07-02",
            "title": "Heads of State",
            "video": false,
            "vote_average": 7,
            "vote_count": 317
        }
    ]);

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

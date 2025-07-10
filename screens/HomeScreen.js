import { StyleSheet, useColorScheme, View, Text, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

function Home() {
    const isDarkMode = useColorScheme() === 'dark';
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={{ color: isDarkMode ? 'white' : 'black', fontSize: 20 }}>
                Welcome to the Home Screen!
            </Text>
            <Pressable
                style={{ height: 50, marginTop: 20, padding: 25, backgroundColor: isDarkMode ? '#333' : '#ccc' }}
                onPress={() => navigation.navigate('MovieDetails', { movieId: 1 })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Home;

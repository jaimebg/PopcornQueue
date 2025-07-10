import { StyleSheet, useColorScheme, View, Text } from 'react-native';

function MovieDetails() {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={styles.container}>
            <Text style={{ color: isDarkMode ? 'white' : 'black', fontSize: 20 }}>
                Welcome to the MovieDetails Screen!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default MovieDetails;

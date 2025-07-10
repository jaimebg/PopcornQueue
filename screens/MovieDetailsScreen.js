import { StyleSheet, useColorScheme, View, Text } from 'react-native';

function MovieDetails() {

    return (
        <View style={styles.container}>
            <Text style={{ color: 'white', fontSize: 20 }}>
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

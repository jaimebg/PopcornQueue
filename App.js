import { StatusBar, SafeAreaView, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/HomeScreen';
import MovieDetails from './screens/MovieDetailsScreen';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <View style={styles.rootContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  safeArea: {
    flex: 1,
  }
});

export default App;

import { StyleSheet, Text, View } from 'react-native';
import HomePage from './src/Compnents/HomePage';
import Welcome from './src/Compnents/Welcome';
import SignUpPage from './src/Compnents/SignUpPage';
import LoginPage from './src/Compnents/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SongDetails from './src/Compnents/SongDetails';
import LyricsPage from './src/Compnents/LyricsPage';
import { UserProvider } from './src/Compnents/UserContext';
const Stack = createStackNavigator();

export default function App() {
  return (
<UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome" 
          component={Welcome} 
          options={{ headerShown: false }} // 👈 Hide header for Welcome
        />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="SongDetails" component={SongDetails} />
        <Stack.Screen name="LyricsPage" component={LyricsPage} options={{ title: 'Song Lyrics' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
});


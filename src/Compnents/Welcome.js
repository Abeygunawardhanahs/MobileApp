import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

export default function WelcomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E1E2C" />
      <Image source={require('../../assets/Image/images.jpg')} style={styles.logo} />
      
      <Text style={styles.title}>Welcome to MusicVerse</Text>
      <Text style={styles.subtitle}>Discover, Listen & Enjoy Your Favorite Music Anytime</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUpPage')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Already have an account?  
        <Text style={styles.loginLink} onPress={() => navigation.navigate('LoginPage')}> Log In</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#FF6F61',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#BBB',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#FF6F61',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 20,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 30,
    fontSize: 14,
    color: '#CCC',
  },
  loginLink: {
    color: '#FF6F61',
    fontWeight: 'bold',
  },
});

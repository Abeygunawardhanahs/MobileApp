import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as GoogleSignIn from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native'; // Ensure you're using react-navigation for navigation

// Make sure to replace this with your actual Google Web Client ID
GoogleSignIn.configure({
  webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID',
});

export default function LoginPage() {
  const navigation = useNavigation(); // Get navigation from react-navigation
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Automatically sign in if the user is already logged in
    GoogleSignIn.isSignedIn().then((isSignedIn) => {
      if (isSignedIn) {
        navigation.navigate('HomePage'); // Automatically navigate to HomePage if already logged in
      }
    });
  }, []);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Validation Error', 'Please enter both username and password');
      return;
    }

    // Example: Mock validation (Replace with real API call)
    if (username === 'testuser' && password === 'password123') {
      navigation.navigate('HomePage');
    } else {
      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignIn.hasPlayServices();
      const userInfo = await GoogleSignIn.signIn();
      console.log('Google User Info:', userInfo);
      navigation.navigate('HomePage');
    } catch (error) {
      Alert.alert('Google Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Login to continue your journey</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => navigation.navigate('ForgotPasswordPage')}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or Login With</Text>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Image source={require('../../assets/Image/Google.jpg')} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Login with Google</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don't have an account?
        <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignUpPage')}>
          {' '}
          Sign Up
        </Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#BBB',
    marginBottom: 30,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#2C2C3A',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#FFF',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: '5%',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#FF6F61',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#FF6F61',
    paddingVertical: 14,
    width: '90%',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    color: '#BBB',
    marginBottom: 10,
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    width: '90%',
    borderRadius: 25,
    marginBottom: 30,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#CCC',
  },
  signUpLink: {
    color: '#FF6F61',
    fontWeight: 'bold',
  },
});

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

// const songs = [
//   { id: '1', title: 'Imagine', lyrics: 'Imagine there\'s no heaven, It\'s easy if you try...' },
//   { id: '2', title: 'Let it Be', lyrics: 'When I find myself in times of trouble, Mother Mary comes to me...' },
//   { id: '3', title: 'Yesterday', lyrics: 'Yesterday, all my troubles seemed so far away, Now it looks as though they\'re here to stay...' },
// ];

// export default function HomePage({ route, navigation }) {
//   // Fallback to 'Guest' if route or route.params is undefined
//   const userName = route?.params?.userName || 'Guest';  
  
//   const [username, setUsername] = useState(userName);
//   const [password, setPassword] = useState('password123');  // Mock password, update if needed

//   const handleEditDetails = () => {
//     Alert.alert('Edit Details', 'Here you can update your username and password');
//     // Add functionality to update user details as needed
//   };

//   const handleSaveDetails = () => {
//     Alert.alert('Details Updated', 'Your details have been updated successfully');
//     // Save the updated details if needed
//   };

//   const renderSongItem = ({ item }) => (
//     <View style={styles.songItemContainer}>
//       <Text style={styles.songTitle}>{item.title}</Text>
//       <Text style={styles.songLyrics}>{item.lyrics}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* User Name Display */}
//       <Text style={styles.welcomeText}>Welcome, {username}!</Text>

//       {/* Edit User Details */}
//       <TouchableOpacity style={styles.editButton} onPress={handleEditDetails}>
//         <Text style={styles.buttonText}>Edit Details</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.saveButton} onPress={handleSaveDetails}>
//         <Text style={styles.buttonText}>Save Details</Text>
//       </TouchableOpacity>

//       {/* Song List Display */}
//       <Text style={styles.title}>Music Collection</Text>
//       <FlatList
//         data={songs}
//         keyExtractor={(item) => item.id}
//         renderItem={renderSongItem}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1E1E2C',
//     paddingTop: 40,
//     paddingHorizontal: 20,
//   },
//   welcomeText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFF',
//     marginBottom: 20,
//   },
//   editButton: {
//     backgroundColor: '#FF6F61',
//     paddingVertical: 10,
//     marginVertical: 10,
//     borderRadius: 25,
//     alignItems: 'center',
//   },
//   saveButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 10,
//     marginVertical: 10,
//     borderRadius: 25,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFF',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   songItemContainer: {
//     backgroundColor: '#2C2C3A',
//     marginBottom: 15,
//     padding: 15,
//     borderRadius: 10,
//   },
//   songTitle: {
//     fontSize: 20,
//     color: '#FFF',
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   songLyrics: {
//     fontSize: 16,
//     color: '#BBB',
//   },
// });

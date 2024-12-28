import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Audio } from 'expo-av';

const songs = [
  // English Songs
  { id: '1', title: 'Imagine', lyrics: 'Imagine there\'s no heaven, It\'s easy if you try...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', language: 'english' },
  { id: '2', title: 'Let it Be', lyrics: 'When I find myself in times of trouble, Mother Mary comes to me...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', language: 'english' },
  { id: '3', title: 'Yesterday', lyrics: 'Yesterday, all my troubles seemed so far away...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', language: 'english' },
  { id: '4', title: 'Shape of You', lyrics: 'The club isn\'t the best place to find a lover, so the bar is where I go...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', language: 'english' },
  { id: '5', title: 'Blinding Lights', lyrics: 'I said, ooh, I\'m blinded by the lights...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', language: 'english' },
  { id: '6', title: 'Rolling in the Deep', lyrics: 'We could have had it all...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', language: 'english' },
  { id: '7', title: 'Someone Like You', lyrics: 'I heard that you\'re settled down, that you found a girl and you\'re married now...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', language: 'english' },
  { id: '8', title: 'Uptown Funk', lyrics: 'This hit, that ice cold, Michelle Pfeiffer, that white gold...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', language: 'english' },
  { id: '9', title: 'All of Me', lyrics: 'Cause all of me loves all of you...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', language: 'english' },
  { id: '10', title: 'Perfect', lyrics: 'I found a love, to carry more than just my secrets...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', language: 'english' },

  // Sinhala Songs
  { id: '11', title: 'සිතුම්', lyrics: 'සිතුම් බොඳවී යන, මනසේ...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', language: 'sinhala' },
  { id: '12', title: 'පසුබැසී', lyrics: 'පසුබැසී, හැමදාමත්, හෝදවාගන්න...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', language: 'sinhala' },
  { id: '13', title: 'ඔබේ ගීතය', lyrics: 'ඔබේ ගීතය මගේ හදවතක...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', language: 'sinhala' },
  { id: '14', title: 'සමරන්න', lyrics: 'සමරන්න, අමතක නොකරන්න...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', language: 'sinhala' },
  { id: '15', title: 'අද දවස්වල', lyrics: 'අද දවස්වල ජීවත් වීම...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', language: 'sinhala' },
  { id: '16', title: 'තනිවී', lyrics: 'තනිවී සිටිනුම, අසරණ බව...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3', language: 'sinhala' },
  { id: '17', title: 'ආලෝකය', lyrics: 'ආලෝකය ඔබේ මනසේ එනවා...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3', language: 'sinhala' },
  { id: '18', title: 'මට තේරෙයි', lyrics: 'මට තේරෙයි, ඔබේ අඳුරු ඇස්...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3', language: 'sinhala' },
  { id: '19', title: 'මහ හතුරු', lyrics: 'මහ හතුරු මිතුරන් මගේ...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3', language: 'sinhala' },
  { id: '20', title: 'ගිනි මාලිගාව', lyrics: 'ගිනි මාලිගාව අළුත්කම...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3', language: 'sinhala' }
];

export default function HomePage({ route, navigation }) {
  const [username, setUsername] = useState('Guest');
  const [searchText, setSearchText] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songLanguage, setSongLanguage] = useState('all');

  useEffect(() => {
    if (route?.params?.userName) {
      setUsername(route.params.userName);
    } else {
      setUsername('Hasara');
    }
  }, [route?.params?.userName]);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = songs.filter((song) =>
      song.title.toLowerCase().includes(text.toLowerCase()) &&
      (songLanguage === 'all' || song.language === songLanguage)
    );
    setFilteredSongs(filtered);
  };

  const handleSongPress = (song) => {
    navigation.navigate('LyricsPage', { songId: song.id, songTitle: song.title });  };

  // 🎵 Play Audio
  const handlePlayAudio = async (audioUrl) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
      setSound(newSound);
      await newSound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing sound:', error);
      Alert.alert('Playback Error', 'Unable to play the selected song.');
    }
  };

  // ⏸️ Pause Audio
  const handlePauseAudio = async () => {
    try {
      if (sound && isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error pausing sound:', error);
      Alert.alert('Playback Error', 'Unable to pause the song.');
    }
  };

  const renderSongItem = ({ item }) => (
    <View style={styles.songItemContainer}>
      <TouchableOpacity onPress={() => handleSongPress(item)}>
        <Text style={styles.songTitle}>{item.title}</Text>
      </TouchableOpacity>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.playButton} onPress={() => handlePlayAudio(item.audio)}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pauseButton} onPress={handlePauseAudio}>
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Language filter buttons
  const handleFilterSongs = (language) => {
    setSongLanguage(language);
    const filtered = songs.filter((song) =>
      song.language === language || language === 'all'
    );
    setFilteredSongs(filtered);
  };

  const handleEditDetails = () => {
    navigation.navigate('EditDetails', { username });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {username}!</Text>

      <TouchableOpacity style={styles.editButton} onPress={handleEditDetails}>
        <Text style={styles.buttonText}>Edit Details</Text>
      </TouchableOpacity>

      {/* Language Filter Buttons */}
      <View style={styles.languageButtonGroup}>
        <TouchableOpacity style={styles.languageButton} onPress={() => handleFilterSongs('english')}>
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageButton} onPress={() => handleFilterSongs('sinhala')}>
          <Text style={styles.buttonText}>Sinhala</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageButton} onPress={() => handleFilterSongs('all')}>
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search songs..."
        placeholderTextColor="#BBB"
        value={searchText}
        onChangeText={handleSearch}
      />

      <Text style={styles.title}>Music Collection</Text>
      <FlatList
        data={filteredSongs}
        keyExtractor={(item) => item.id}
        renderItem={renderSongItem}
      />
    </View>
  );
}

// Styles (add new styles for the language filter buttons)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2C',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  languageButtonGroup: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-evenly',
  },
  languageButton: {
    backgroundColor: '#2C2C3A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  searchBar: {
    backgroundColor: '#2C2C3A',
    color: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  songItemContainer: {
    backgroundColor: '#2C2C3A',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  songTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  pauseButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
});


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
// import { Audio } from 'expo-av';

// const songs = [
//   // English Songs
//   { id: '1', title: 'Imagine', lyrics: 'Imagine there\'s no heaven, It\'s easy if you try...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', language: 'english' },
//   { id: '2', title: 'Let it Be', lyrics: 'When I find myself in times of trouble, Mother Mary comes to me...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', language: 'english' },
//   { id: '3', title: 'Yesterday', lyrics: 'Yesterday, all my troubles seemed so far away...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', language: 'english' },
//   { id: '4', title: 'Shape of You', lyrics: 'The club isn\'t the best place to find a lover, so the bar is where I go...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', language: 'english' },
//   { id: '5', title: 'Blinding Lights', lyrics: 'I said, ooh, I\'m blinded by the lights...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', language: 'english' },
//   { id: '6', title: 'Rolling in the Deep', lyrics: 'We could have had it all...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', language: 'english' },
//   { id: '7', title: 'Someone Like You', lyrics: 'I heard that you\'re settled down, that you found a girl and you\'re married now...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', language: 'english' },
//   { id: '8', title: 'Uptown Funk', lyrics: 'This hit, that ice cold, Michelle Pfeiffer, that white gold...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', language: 'english' },
//   { id: '9', title: 'All of Me', lyrics: 'Cause all of me loves all of you...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', language: 'english' },
//   { id: '10', title: 'Perfect', lyrics: 'I found a love, to carry more than just my secrets...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', language: 'english' },

//   // Sinhala Songs
//   { id: '11', title: 'සිතුම්', lyrics: 'සිතුම් බොඳවී යන, මනසේ...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', language: 'sinhala' },
//   { id: '12', title: 'පසුබැසී', lyrics: 'පසුබැසී, හැමදාමත්, හෝදවාගන්න...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', language: 'sinhala' },
//   { id: '13', title: 'ඔබේ ගීතය', lyrics: 'ඔබේ ගීතය මගේ හදවතක...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', language: 'sinhala' },
//   { id: '14', title: 'සමරන්න', lyrics: 'සමරන්න, අමතක නොකරන්න...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', language: 'sinhala' },
//   { id: '15', title: 'අද දවස්වල', lyrics: 'අද දවස්වල ජීවත් වීම...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', language: 'sinhala' },
//   { id: '16', title: 'තනිවී', lyrics: 'තනිවී සිටිනුම, අසරණ බව...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3', language: 'sinhala' },
//   { id: '17', title: 'ආලෝකය', lyrics: 'ආලෝකය ඔබේ මනසේ එනවා...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3', language: 'sinhala' },
//   { id: '18', title: 'මට තේරෙයි', lyrics: 'මට තේරෙයි, ඔබේ අඳුරු ඇස්...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3', language: 'sinhala' },
//   { id: '19', title: 'මහ හතුරු', lyrics: 'මහ හතුරු මිතුරන් මගේ...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3', language: 'sinhala' },
//   { id: '20', title: 'ගිනි මාලිගාව', lyrics: 'ගිනි මාලිගාව අළුත්කම...', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3', language: 'sinhala' }
// ];

// export default function HomePage({ route, navigation }) {
//   const [username, setUsername] = useState('Guest');
//   const [searchText, setSearchText] = useState('');
//   const [filteredSongs, setFilteredSongs] = useState(songs);
//   const [sound, setSound] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [songLanguage, setSongLanguage] = useState('all');

//   useEffect(() => {
//     if (route?.params?.userName) {
//       setUsername(route.params.userName);
//     } else {
//       setUsername('Hasara');
//     }
//   }, [route?.params?.userName]);

//   const handleSearch = (text) => {
//     setSearchText(text);
//     const filtered = songs.filter((song) =>
//       song.title.toLowerCase().includes(text.toLowerCase()) &&
//       (songLanguage === 'all' || song.language === songLanguage)
//     );
//     setFilteredSongs(filtered);
//   };

//   const handleSongPress = (song) => {
//     navigation.navigate('LyricsPage', { songId: song.id, songTitle: song.title });
//   };

//   // 🎵 Play Audio
//   const handlePlayAudio = async (audioUrl) => {
//     try {
//       if (sound) {
//         await sound.unloadAsync();
//       }
//       const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
//       setSound(newSound);
//       await newSound.playAsync();
//       setIsPlaying(true);
//     } catch (error) {
//       console.error('Error playing sound:', error);
//       Alert.alert('Playback Error', 'Unable to play the selected song.');
//     }
//   };

//   // ⏸️ Pause Audio
//   const handlePauseAudio = async () => {
//     try {
//       if (sound && isPlaying) {
//         await sound.pauseAsync();
//         setIsPlaying(false);
//       }
//     } catch (error) {
//       console.error('Error pausing sound:', error);
//       Alert.alert('Playback Error', 'Unable to pause the song.');
//     }
//   };

//   const renderSongItem = ({ item }) => (
//     <View style={styles.songItemContainer}>
//       <TouchableOpacity onPress={() => handleSongPress(item)}>
//         <Text style={styles.songTitle}>{item.title}</Text>
//       </TouchableOpacity>
//       <View style={styles.buttonGroup}>
//         <TouchableOpacity style={styles.playButton} onPress={() => handlePlayAudio(item.audio)}>
//           <Text style={styles.buttonText}>Play</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.pauseButton} onPress={handlePauseAudio}>
//           <Text style={styles.buttonText}>Pause</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   // Language filter buttons
//   const handleFilterSongs = (language) => {
//     setSongLanguage(language);
//     const filtered = songs.filter((song) =>
//       song.language === language || language === 'all'
//     );
//     setFilteredSongs(filtered);
//   };

//   const handleEditDetails = () => {
//     navigation.navigate('EditDetails', { username });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcomeText}>Welcome, {username}!</Text>

//       <TouchableOpacity style={styles.editButton} onPress={handleEditDetails}>
//         <Text style={styles.buttonText}>Edit Profile</Text>
//       </TouchableOpacity>

//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search songs"
//         value={searchText}
//         onChangeText={handleSearch}
//       />

//       <View style={styles.languageFilterContainer}>
//         <TouchableOpacity
//           style={[styles.languageButton, songLanguage === 'all' && styles.activeButton]}
//           onPress={() => handleFilterSongs('all')}
//         >
//           <Text style={styles.buttonText}>All</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.languageButton, songLanguage === 'english' && styles.activeButton]}
//           onPress={() => handleFilterSongs('english')}
//         >
//           <Text style={styles.buttonText}>English</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.languageButton, songLanguage === 'sinhala' && styles.activeButton]}
//           onPress={() => handleFilterSongs('sinhala')}
//         >
//           <Text style={styles.buttonText}>Sinhala</Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={filteredSongs}
//         renderItem={renderSongItem}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   welcomeText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   editButton: {
//     backgroundColor: '#4CAF50',
//     padding: 10,
//     marginBottom: 20,
//     borderRadius: 5,
//   },
//   searchInput: {
//     height: 40,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingLeft: 10,
//     marginBottom: 20,
//   },
//   songItemContainer: {
//     marginBottom: 15,
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 5,
//   },
//   songTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   buttonGroup: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   playButton: {
//     backgroundColor: '#4CAF50',
//     padding: 10,
//     marginRight: 10,
//     borderRadius: 5,
//   },
//   pauseButton: {
//     backgroundColor: '#FF6347',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 14,
//   },
//   languageFilterContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   languageButton: {
//     padding: 10,
//     marginRight: 10,
//     borderRadius: 5,
//     backgroundColor: '#ddd',
//   },
//   activeButton: {
//     backgroundColor: '#4CAF50',
//   },
// });

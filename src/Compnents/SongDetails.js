import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Audio } from 'expo-av';

export default function SongDetails({ route, navigation }) {
  const { song } = route.params;
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 🎵 Play Audio
  const handlePlayAudio = async (audioUrl) => {
    try {
      if (sound) {
        await sound.unloadAsync(); // Stop previous sound if already playing
      }
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
      setSound(newSound);
      await newSound.playAsync();
      setIsPlaying(true); // Set the playing state to true
    } catch (error) {
      console.error('Error playing sound:', error);
      Alert.alert('Playback Error', 'Unable to play the selected song.');
    }
  };

  // ⏸️ Pause Audio
  const handlePauseAudio = async () => {
    try {
      if (sound && isPlaying) {
        await sound.pauseAsync();  // Pause the sound if it's playing
        setIsPlaying(false);  // Update the playing state to false
      }
    } catch (error) {
      console.error('Error pausing sound:', error);
      Alert.alert('Playback Error', 'Unable to pause the song.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.songTitle}>{song.title}</Text>
      <Text style={styles.songLyrics}>{song.lyrics}</Text>

      {/* Play and Pause buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => handlePlayAudio(song.audio)}>
          <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>

        {isPlaying && (
          <TouchableOpacity style={styles.pauseButton} onPress={handlePauseAudio}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2C',
    padding: 20,
    justifyContent: 'center',
  },
  songTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  songLyrics: {
    fontSize: 18,
    color: '#BBB',
    marginBottom: 30,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  playButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginRight: 10,
    alignItems: 'center',
  },
  pauseButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


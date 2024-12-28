import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For play and pause icons
import { Audio } from 'expo-av';

export const songLyrics = {
  // 🎵 English Songs
  '1': {
    lyrics: `Imagine there's no heaven
It's easy if you try
No hell below us
Above us, only sky...`,
    singer: 'John Lennon',
    composer: 'John Lennon',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' // Replace with actual audio URL
  },

  '2': {
    lyrics: `When I find myself in times of trouble
Mother Mary comes to me
Speaking words of wisdom, let it be...`,
    singer: 'The Beatles',
    composer: 'Paul McCartney',
    audio: 'https://www.example.com/letitbe.mp3'
  },

  // 🎵 Sinhala Songs
  '11': {
    lyrics: `සිතුම් බොඳවී යන, මනසේ...
නින්දෙන් අවදිවූ, ආලෝකය...`,
    singer: 'W. D. Amaradeva',
    composer: 'W. D. Amaradeva',
    audio: 'https://www.example.com/sinhala_song.mp3'
  },
};

export default function LyricsPage({ route }) {
  const { songId, songTitle } = route.params;
  const songData = songLyrics[songId] || {};
  const { lyrics, singer, composer, audio } = songData;

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 🎧 Play Audio
  const handlePlayAudio = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audio });
      setSound(newSound);
      await newSound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing sound:', error);
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
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{songTitle}</Text>
      <Text style={styles.subtitle}>Singer: {singer}</Text>
      <Text style={styles.subtitle}>Composer: {composer}</Text>
      
      <ScrollView style={styles.lyricsContainer}>
        <Text style={styles.lyrics}>{lyrics}</Text>
      </ScrollView>

      {/* Play/Pause Button */}
      <View style={styles.audioControls}>
        <TouchableOpacity
          style={styles.playPauseButton}
          onPress={isPlaying ? handlePauseAudio : handlePlayAudio}
        >
          <FontAwesome 
            name={isPlaying ? 'pause' : 'play'} 
            size={24} 
            color="white" 
          />
          <Text style={styles.buttonText}>
            {isPlaying ? 'Pause' : 'Play'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2C',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#DDD',
    textAlign: 'center',
    marginBottom: 5,
  },
  lyricsContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  lyrics: {
    fontSize: 16,
    color: '#FFF',
    lineHeight: 24,
    textAlign: 'left',
    marginBottom: 10,
  },
  audioControls: {
    alignItems: 'center',
    marginTop: 20,
  },
  playPauseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6F61',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For play and pause icons
import { Audio } from 'expo-av';

export const songLyrics = {
  // English Songs
  '1': {
    lyrics: `Imagine there's no heaven
It's easy if you try
No hell below us
Above us, only sky
Imagine all the people
Livin' for today
Ah
Imagine there's no countries
It isn't hard to do
Nothing to kill or die for
And no religion, too
Imagine all the people
Livin' life in peace
You
You may say I'm a dreamer
But I'm not the only one
I hope someday you'll join us
And the world will be as one
Imagine no possessions
I wonder if you can
No need for greed or hunger
A brotherhood of man
Imagine all the people
Sharing all the world
You
You may say I'm a dreamer
But I'm not the only one
I hope someday you'll join us
And the world will live as one`,
    singer: 'John Lennon',
    composer: 'John Lennon',
    audio: 'https://www5.hiphopkit.com/music-download/ed-sheeran-shape-of-you/'
  },

  '2': {
    lyrics: `When I find myself in times of trouble
Mother Mary comes to me
Speaking words of wisdom, let it be...`,
    singer: 'The Beatles',
    composer: 'Paul McCartney',
    audio: 'https://www.example.com/letitbe.mp3'
  },

  '4': {
    lyrics: `
A club isn't the best place to find a lover

So the bar is where I go (Mm)

Me and my friends at the table doin' shots

Drinkin' fast and then we talk slow (Mm)

And you come over and start up a conversation with just me

And trust me, I'll give it a chance now (Mm)

Take my hand, stop, put Van the Man on the jukebox

And then we start to dance and now I'm singin' like


Girl, you know I want your love

Your love was handmade for somebody like me

Well, come on now, follow my lead

I may be crazy, don't mind me

Say, "Boy, let's not talk too much"

Grab on my waist and put that body on me

Well, come on now, follow my lead

Come, come on now, follow my lead, mm


I'm in love with the shape of you

We push and pull like a magnet do

Although my heart is fallin' too

I'm in love with your body

And last night, you were in my room

And now my bed sheets smell like you

Every day, discoverin' somethin' brand new

Well, I'm in love with your body


Oh, I, oh, I, oh, I, oh, I

Well, I'm in love with your body

Oh, I, oh, I, oh, I, oh, I

Well, I'm in love with your body

Oh, I, oh, I, oh, I, oh, I

Well, I'm in love with your body

Every day, discoverin' somethin' brand new

I'm in love with the shape of you


One week in, we let the story begin

We're goin' out on our first date (Mm)

You and me are thrifty, so go all-you-can-eat

Fill up your bag and I fill up a plate (Mm)

We talk for hours and hours about the sweet and the sour

And how your family is doin' okay (Mm)

And leave and get in a taxi, and kiss in the back seat

Tell the driver make the radio play and I'm singin' like


Girl, you know I want your love

Your love was handmade for somebody like me

Well, come on now, follow my lead

I may be crazy, don't mind me

Say, "Boy, let's not talk too much"

Grab on my waist and put that body on me

Well, come on now, follow my lead

Come, come on now, follow my lead, mm


I'm in love with the shape of you

We push and pull like a magnet do

Although my heart is fallin' too

I'm in love with your body

And last night, you were in my room

And now my bed sheets smell like you

Every day, discoverin' somethin' brand new

Well, I'm in love with your body


Oh, I, oh, I, oh, I, oh, I

Well, I'm in love with your body

Oh, I, oh, I, oh, I, oh, I

Well, I'm in love with your body

Oh, I, oh, I, oh, I, oh, I

Well, I'm in love with your body

Every day, discoverin' somethin' brand new

I'm in love with the shape of you


Come on, be my baby, come on

Come on, be my baby, come on

Come on, be my baby, come on

Come on, be my baby, come on

Come on, be my baby, come on

Come on, be my baby, come on

Come on, be my baby, come on

Come on, be my baby, come on


I'm in love with the shape of you

We push and pull like a magnet do

Although my heart is fallin' too

I'm in love with your body

And last night, you were in my room

And now my bed sheets smell like you

Every day, discoverin' somethin' brand new

Well, I'm in love with your body


Come on, be my baby, come on

Come on, be my baby, come on

I'm in love with your body

Come on, be my baby, come on

Come on, be my baby, come on

I'm in love with your body

Come on, be my baby, come on

Come on, be my baby, come on

I'm in love with your body

Every day, discoverin' somethin' brand new

I'm in love with the shape of you`,
singer: 'Ed Sheeran',
composer: 'Ed Sheeran',
audio: 'https://drive.google.com/uc?export=download&id=1zw1BdHPCrubCQytZ-rZAOh5PXYf10oQf'

  },

  //  Sinhala Songs
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

  //  Play Audio
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

  //  Pause Audio
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

//  Styles
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

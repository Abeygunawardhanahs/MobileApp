// // LyricsPage.js

// import React from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { songLyrics } from './lyricsData';

// export const songLyrics = {
//     // 🎵 English Songs
//     '1': `Imagine there's no heaven
//   It's easy if you try
//   No hell below us
//   Above us, only sky
//   Imagine all the people
//   Livin' for today
//   Ah
//   Imagine there's no countries
//   It isn't hard to do
//   Nothing to kill or die for
//   And no religion, too
//   Imagine all the people
//   Livin' life in peace
//   You
//   You may say I'm a dreamer
//   But I'm not the only one
//   I hope someday you'll join us
//   And the world will be as one
//   Imagine no possessions
//   I wonder if you can
//   No need for greed or hunger
//   A brotherhood of man
//   Imagine all the people
//   Sharing all the world
//   You
//   You may say I'm a dreamer
//   But I'm not the only one
//   I hope someday you'll join us
//   And the world will live as one`,
  
//     '2': `When I find myself in times of trouble
//   Mother Mary comes to me
//   Speaking words of wisdom, let it be
//   And in my hour of darkness
//   She is standing right in front of me
//   Speaking words of wisdom, let it be...`,
  
//     // 🎵 Sinhala Songs
//     '11': `සිතුම් බොඳවී යන, මනසේ...
//   නින්දෙන් අවදිවූ, ආලෝකය...`,}

// export default function LyricsPage({ route }) {
//   const { songId, songTitle } = route.params; // Receiving songId and songTitle via navigation
//   const lyrics = songLyrics[songId] || 'Lyrics not available';

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{songTitle}</Text>
//       <ScrollView style={styles.lyricsContainer}>
//         <Text style={styles.lyrics}>{lyrics}</Text>
//       </ScrollView>
//     </View>
//   );
// }

// // 🎨 Styles for the Lyrics Page
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1E1E2C',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFD700',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   lyricsContainer: {
//     marginTop: 10,
//   },
//   lyrics: {
//     fontSize: 16,
//     color: '#FFF',
//     lineHeight: 24,
//     textAlign: 'center',
//   },
// });
// LyricsPage.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const songLyrics = {
  // 🎵 English Songs
  '1': `Imagine there's no heaven
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

  '2': `When I find myself in times of trouble
Mother Mary comes to me
Speaking words of wisdom, let it be
And in my hour of darkness
She is standing right in front of me
Speaking words of wisdom, let it be...`,

  // 🎵 Sinhala Songs
  '11': `සිතුම් බොඳවී යන, මනසේ...
නින්දෙන් අවදිවූ, ආලෝකය...`,
}

export default function LyricsPage({ route }) {
  const { songId, songTitle } = route.params; // Receiving songId and songTitle via navigation
  const lyrics = songLyrics[songId] || 'Lyrics not available';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{songTitle}</Text>
      <ScrollView style={styles.lyricsContainer}>
        <Text style={styles.lyrics}>{lyrics}</Text>
      </ScrollView>
    </View>
  );
}

// 🎨 Styles for the Lyrics Page
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
    marginBottom: 20,
  },
  lyricsContainer: {
    marginTop: 10,
  },
  lyrics: {
    fontSize: 16,
    color: '#FFF',
    lineHeight: 24,
    textAlign: 'left',  // Changed to left for better readability of song lyrics
    marginBottom: 10,  // Added margin bottom to separate lines/paragraphs
  },
});

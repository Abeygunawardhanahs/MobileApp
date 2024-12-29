import axios from 'axios';

const API_URL = 'https://spotify23.p.rapidapi.com/search/';
const API_KEY = 'YOUR_RAPIDAPI_KEY'; // Replace with your actual API key

const fetchSpotifyData = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
      },
      params: {
        q: 'top hits',
        type: 'track',
        limit: '10',
      },
    });
    return response.data.tracks.items; // Adjust based on the API response
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default fetchSpotifyData;

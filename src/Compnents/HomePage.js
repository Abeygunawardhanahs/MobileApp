import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert, StatusBar } from 'react-native';

const Home = ({ route, navigation }) => {
  const { userName } = route.params;
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Music');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totcount, setTotcount] = useState(0);
  const [imageStatus, setImageStatus] = useState({});

  const fetchImages = async (query) => {
    setLoading(true);
    setTotcount(0);
    setError(null);
    try {
      if (searchTerm.trim() !== "") {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}%20music&client_id=pao1i41sEZkTiD0pbmXVPEKuWnHVIn_zw2ixY8nFNZs`
        );
        const result = await response.json();
        setData(result.results);

        const initialStatus = {};
        result.results.forEach((item) => {
          initialStatus[item.id] = 'Inactive';
        });
        setImageStatus(initialStatus);
      } else {
        Alert.alert("Enter the search field...!");
        setSearchTerm("music");
      }
    } catch (error) {
      setError('Failed to fetch images. Please try again.');
      console.error('Error fetching images:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages(searchTerm);
  }, []);

  const handleImagePress = (id) => {
    setImageStatus((prevStatus) => ({
      ...prevStatus,
      [id]: 'Active',
    }));
    setTotcount((prev) => prev + 1);
  };

  const renderItem = (item) => (
    <TouchableOpacity
      accessible
      accessibilityLabel={`Image touched ${item.id || 0} times`}
      onPress={() => handleImagePress(item.id)}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.urls.regular }} style={styles.image} />
        </View>
        <Text style={styles.title}>{item.alt_description || 'No Description'}</Text>
        <Text style={styles.author}>Photo by {item.user.name}</Text>
        <Text style={styles.status}>Status: {imageStatus[item.id]}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Text style={styles.fonttop}>Welcome {userName}!</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for images"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => fetchImages(searchTerm)}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : data.length > 0 ? (
        <ScrollView contentContainerStyle={styles.listContainer}>
          {data.map((item) => (
            <View key={item.id}>
              {renderItem(item)}
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noDataText}>No images found.</Text>
      )}

      <View style={styles.footerContainer}>
        <Text style={styles.fontbottom}>{totcount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },
  fonttop: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 20,
    shadowColor: '#FF6F61',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#fff',
    borderColor: 'rgba(255, 111, 97, 0.5)',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: 'rgba(255, 111, 97, 0.8)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#FFF',
    fontSize: 16,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  
  listContainer: {
    paddingHorizontal: 10,
  },
  card: {
    marginBottom: 15,
    padding: 3,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  imageContainer: {
    position: 'relative',
  },
  fontbottom: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 111, 97, 0.8)',
    paddingVertical: 5,
  
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    color: '#555',
  },
  status: {
    fontSize: 14,
    color: '#FF6F61',
    marginTop: 5,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#555',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 18,
    marginTop: 20,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#555',
    marginTop: 20,
  },
  footerContainer: {
    marginBottom: 20,
    width: '100%',
    textAlign: 'right',
  },
});

export default Home;

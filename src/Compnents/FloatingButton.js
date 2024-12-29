import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../contexts/AppContext';

const FloatingButton = () => {
  const { clickCount } = useAppContext();

  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>Clicks: {clickCount}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FloatingButton;

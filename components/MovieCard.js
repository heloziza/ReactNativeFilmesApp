import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const MovieCard = ({ movie, onPress }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Animated.Image
        source={{ uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/100x150' }}
        style={[styles.poster, { opacity: fadeAnim }]}
      />
      <View style={styles.info}>
        <Text style={styles.movieTitle}>{movie.Title}</Text>
        <Text style={styles.movieYear}>{movie.Year}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fafafa',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  poster: {
    width: 100,
    height: 150,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieYear: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default MovieCard;
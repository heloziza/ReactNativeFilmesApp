import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { getMovieDetails } from '../../services/api';

export default function MovieDetail() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getMovieDetails(id)
      .then(setMovie)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Carregando detalhes...</Text>
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.centered}>
        <Text>Filme não encontrado 😢</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: movie.Title,
          headerBackTitle: 'Voltar',
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
        }}
      />

      <ScrollView style={styles.container}>
        <Image
          source={{ uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600' }}
          style={styles.poster}
        />

        <View style={styles.header}>
          <Text style={styles.title}>{movie.Title}</Text>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>{movie.imdbRating || 'N/A'}</Text>
          </View>
        </View>

        <Text style={styles.text}><Text style={styles.label}>Gênero:</Text> {movie.Genre}</Text>
        <Text style={styles.text}><Text style={styles.label}>Diretor(es):</Text> {movie.Director}</Text>
        <Text style={styles.text}><Text style={styles.label}>Elenco:</Text> {movie.Actors}</Text>
        <Text style={styles.text}><Text style={styles.label}>Sinopse:</Text> {movie.Plot}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 40
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  poster: {
    width: '100%',
    height: 450,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 8
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
    color: '#333'
  },
  label: {
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16,
    marginBottom: 12
  }
});
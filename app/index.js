import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { searchMovies } from '../services/api';
import { useRouter, Stack } from 'expo-router';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('avatar');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchMovies = async () => {
    if (!searchTerm) return;
    try {
      setLoading(true);
      const results = await searchMovies(searchTerm);
      setMovies(results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.title}>Filmes</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar filmes..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={fetchMovies}
        />
        <TouchableOpacity style={styles.button} onPress={fetchMovies}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() => router.push(`/movie/${item.imdbID}`)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
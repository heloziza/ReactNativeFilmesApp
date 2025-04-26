import axios from 'axios';

const API_KEY = 'eff177ea';
const BASE_URL = 'https://www.omdbapi.com/';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

export const searchMovies = async (searchTerm) => {
  try {
    const response = await api.get('', {
      params: {
        s: searchTerm,
        type: 'movie',
      },
    });
    if (response.data.Response === 'True') {
      return response.data.Search;
    } else {
      throw new Error(response.data.Error || 'Filmes não encontrados');
    }
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get('', {
      params: {
        i: movieId,
        plot: 'full',
      },
    });

    if (response.data.Response === 'True') {
      return response.data;
    } else {
      throw new Error(response.data.Error || 'Detalhes do filme não encontrados');
    }
  } catch (error) {
    console.error('Erro ao obter detalhes do filme:', error);
    throw error;
  }
};

export default api;
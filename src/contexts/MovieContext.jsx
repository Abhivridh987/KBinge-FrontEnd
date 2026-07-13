import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const MovieContext = createContext();

export const useMovie = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [topPicks, setTopPicks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const res = await api.get('/home/movies');
      setMovies(res.data.movies || []);
    } catch (err) {
      console.error('Failed to fetch movies', err);
    }
  };

  const fetchTopPicks = async () => {
    try {
      const res = await api.get('/home/movies/top-picks');
      setTopPicks(res.data.movies || []);
    } catch (err) {
      console.error('Failed to fetch top picks', err);
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([fetchMovies(), fetchTopPicks()]);
      setLoading(false);
    };
    loadAll();
  }, []);

  return (
    <MovieContext.Provider value={{ movies, topPicks, loading, fetchMovies, fetchTopPicks }}>
      {children}
    </MovieContext.Provider>
  );
};

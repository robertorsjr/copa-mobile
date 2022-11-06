import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.1.6:3333',
});

export const endpoints = {
  me: '/me',
  signIn: '/users',
  pools: '/pools',
  pool: (poolId: string) => `/pools/${poolId}`,
  joinPool: `/pools/join`,
  guess: (poolId: string, gameId) => `/pools/${poolId}/games/${gameId}/guesses`,
  games: (poolId: string) => `/pools/${poolId}/games`,
};

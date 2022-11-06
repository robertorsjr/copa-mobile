import { useToast, FlatList } from 'native-base';
import { useEffect, useState } from 'react';

import { api, endpoints } from '../services/api';
import { Game, GameProps } from './Game';

interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [secondTeamPoints, setSecondTeamPoints] = useState('');

  const toast = useToast();

  useEffect(() => {
    fetchGames();
  }, [poolId]);

  async function fetchGames() {
    try {
      const { data } = await api.get(endpoints.games(poolId));
      setGames(data.games);
    } catch (error) {
      toast.show({
        title: 'Ocorreu um erro ao tentar carregar os jogos',
        placement: 'top',
        bgColor: 'red.500',
      });
      throw error;
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      await api.post(endpoints.guess(poolId, gameId), {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.show({
        title: 'Palpite feito com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });
      fetchGames();
    } catch (error) {
      toast.show({
        title: error.response?.data?.message || 'Ocorreu um erro ao tentar fazer um palpite',
        placement: 'top',
        bgColor: 'red.500',
      });
      throw error;
    }
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
        />
      )}
    />
  );
}

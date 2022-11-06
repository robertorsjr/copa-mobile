import { useRoute } from '@react-navigation/native';
import { HStack, useToast, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/namespace
import { Share } from 'react-native';

import { EmptyMyPoolList } from '../components/EmptyMyPoolList';
import { Guesses } from '../components/Guesses';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { Option } from '../components/Option';
import { PoolPros } from '../components/PoolCard';
import { PoolHeader } from '../components/PoolHeader';
import { api, endpoints } from '../services/api';

interface RouteParams {
  id: string;
}

export function Details() {
  const [pool, setPool] = useState<PoolPros>({} as PoolPros);
  const [isLoading, setIsLoading] = useState(false);
  const [optionSelected, setOptionSelected] = useState<'Seus Palpites' | 'Ranking do grupo'>();
  const toast = useToast();
  const route = useRoute();
  const { id } = route.params as RouteParams;

  useEffect(() => {
    async function handleGetPool() {
      try {
        setIsLoading(true);
        const { data } = await api.get(endpoints.pool(id));
        setPool(data.pool[0]);
      } catch (error) {
        toast.show({
          title: 'Ocorreu um erro ao tentar carregar o bolão',
          placement: 'top',
          bgColor: 'red.500',
        });
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
    handleGetPool();
  }, [id]);

  async function handleCodeShare() {
    await Share.share({
      message: pool.code,
    });
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title={pool.title} showBackButton showShareButton handleShare={handleCodeShare} />
      {pool?.participants?.length > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={pool} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              onPress={() => setOptionSelected('Seus Palpites')}
              isSelected={optionSelected === 'Seus Palpites'}
            />
            <Option
              title="Ranking do grupo"
              onPress={() => setOptionSelected('Ranking do grupo')}
              isSelected={optionSelected === 'Ranking do grupo'}
            />
          </HStack>

          <Guesses poolId={pool.id} />
        </VStack>
      ) : (
        <EmptyMyPoolList code={pool.code} />
      )}
    </VStack>
  );
}

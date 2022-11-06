import { Octicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Icon, useToast, VStack, FlatList } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';

import { Button } from '../components/Button';
import { EmptyPoolList } from '../components/EmptyPoolList';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { PoolCard, PoolPros } from '../components/PoolCard';
import { api, endpoints } from '../services/api';

export function Pools() {
  const [poolsData, setPoolsData] = useState<PoolPros[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { navigate } = useNavigation();
  const toast = useToast();

  useFocusEffect(
    useCallback(() => {
      async function handleFindPool() {
        try {
          setIsLoading(true);
          const { data } = await api.get(endpoints.pools);
          setPoolsData(data.pools);
        } catch (error) {
          toast.show({
            title: 'Ocorreu um erro ao tentar carregar os bolões',
            placement: 'top',
            bgColor: 'red.500',
          });
          throw error;
        } finally {
          setIsLoading(false);
        }
      }
      handleFindPool();
    }, [])
  );

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />
      <VStack mt={6} mb={4} mx={5} pb={4} borderBottomWidth={1} borderBottomColor="gray.600">
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
          onPress={() => navigate('find')}
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          keyExtractor={(item) => item.id}
          data={poolsData}
          renderItem={({ item }) => (
            <PoolCard data={item} onPress={() => navigate('details', { id: item.id })} />
          )}
          ListEmptyComponent={() => <EmptyPoolList />}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
        />
      )}
    </VStack>
  );
}

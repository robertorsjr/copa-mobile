import { useNavigation } from '@react-navigation/native';
import { Heading, useToast, VStack } from 'native-base';
import React, { useState } from 'react';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { api, endpoints } from '../services/api';

export function Find() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleFindPool() {
    try {
      setIsLoading(true);
      await api.post(endpoints.joinPool, {
        code,
      });
      setCode('');
      navigate('pools');
    } catch (error) {
      setIsLoading(false);
      toast.show({
        title: error?.response?.data?.message || 'Ocorreu um erro ao tentar encontrar o bolão',
        placement: 'top',
        bgColor: 'red.500',
      });
      throw error;
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
          Encontre um bolão através de{'\n'} seu código único
        </Heading>

        <Input value={code} onChangeText={setCode} placeholder="Qual o código do bolão?" mb={2} />

        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleFindPool}
          isDisabled={!code}
        />
      </VStack>
    </VStack>
  );
}

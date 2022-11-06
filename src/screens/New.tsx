import { Heading, Text, useToast, VStack } from 'native-base';
import React, { useState } from 'react';

import Logo from '../assets/logo.svg';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { api, endpoints } from '../services/api';

export function New() {
  const [pool, setPool] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handleCreateNewPool() {
    try {
      setIsLoading(true);
      await api.post(endpoints.pools, {
        title: pool.toUpperCase(),
      });
      setPool('');
      toast.show({
        title: 'Bolão criado com sucesso',
        placement: 'top',
        bgColor: 'green.500',
      });
    } catch (error) {
      toast.show({
        title: 'Ocorreu um erro ao tentar criar o bolão',
        placement: 'top',
        bgColor: 'red.500',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolao" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
          Crie seu próprio bolão da copa{'\n'} e compartilhe entre amigos!
        </Heading>

        <Input value={pool} onChangeText={setPool} mb={2} placeholder="Qual o nome do seu bolão" />

        <Button
          title="CRIAR MEU BOLÃO"
          onPress={handleCreateNewPool}
          isLoading={isLoading}
          isDisabled={!pool}
        />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras
          pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}

import { Heading, Text, VStack } from 'native-base';
import React, { useState } from 'react';

import Logo from '../assets/logo.svg';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

export function New() {
  const [pool, setPool] = useState('');

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolao" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
          Crie seu próprio bolão da copa{'\n'} e compartilhe entre amigos!
        </Heading>

        <Input value={pool} onChangeText={setPool} mb={2} placeholder="Qual o nome do seu bolão" />

        <Button title="CRIAR MEU BOLÃO" />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras
          pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}

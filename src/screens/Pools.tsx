import { Octicons } from '@expo/vector-icons';
import { Icon, Text, VStack } from 'native-base';
import React from 'react';

import { Button } from '../components/Button';
import { Header } from '../components/Header';

export function Pools() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />
      <VStack mt={6} mb={4} mx={5} pb={4} borderBottomWidth={1} borderBottomColor="gray.600">
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
        />
      </VStack>
      <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
        Você ainda não está participando de{'\n'} nenhum bolão, que tal{' '}
        <Text color="yellow.500" underline>
          buscar um por código
        </Text>
        {'\n'}
        ou{' '}
        <Text color="yellow.500" underline>
          criar um novo
        </Text>
        ?
      </Text>
    </VStack>
  );
}

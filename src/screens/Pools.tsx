import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Icon, VStack } from 'native-base';
import React from 'react';

import { Button } from '../components/Button';
import { Header } from '../components/Header';

export function Pools() {
  const { navigate } = useNavigation();

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
    </VStack>
  );
}

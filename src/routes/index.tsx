import { NavigationContainer } from '@react-navigation/native';
import { Box } from 'native-base';
import React from 'react';

import { useAuth } from '../hooks/useAuth';
import { SignIn } from '../screens/SignIn';
import { AppRoutes } from './app.routes';

export function Routes() {
  const { isAuthenticated } = useAuth();

  return (
    <Box flex={1} bg="gray.900">
      <NavigationContainer>{isAuthenticated ? <AppRoutes /> : <SignIn />}</NavigationContainer>
    </Box>
  );
}

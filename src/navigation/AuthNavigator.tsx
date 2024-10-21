import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { destinations } from '../types/navigation';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={destinations.auth.welcome.name} component={destinations.auth.welcome.component} />
      <Stack.Screen name={destinations.auth.login.name} component={destinations.auth.login.component} />
      <Stack.Screen name={destinations.auth.signup.name} component={destinations.auth.signup.component} />
    </Stack.Navigator>
  );
}

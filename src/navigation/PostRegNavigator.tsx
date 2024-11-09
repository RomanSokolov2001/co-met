import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { destinations } from '../types/navigation';
import { StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';


interface NavigatorProps {
  onProfileFill: () => void
}

export default function PostRegNavigator({ onProfileFill }: NavigatorProps) {

  const RegStepFourWrapper = (props: any) => (
    <destinations.postRegistration.regStepFour.component
      {...props}
      onProfileFill={onProfileFill}
    />
  );


  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={destinations.postRegistration.regStepOne.name} component={destinations.postRegistration.regStepOne.component} />
      <Stack.Screen name={destinations.postRegistration.regStepTwo.name} component={destinations.postRegistration.regStepTwo.component} />
      <Stack.Screen name={destinations.postRegistration.regStepThree.name} component={destinations.postRegistration.regStepThree.component} />
      <Stack.Screen name={destinations.postRegistration.regStepFour.name} component={RegStepFourWrapper} />
    </Stack.Navigator>
  );
}
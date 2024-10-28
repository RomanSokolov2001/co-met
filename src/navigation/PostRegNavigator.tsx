import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { destinations } from '../types/navigation';


const Stack = createStackNavigator();

export default function PostRegNavigator() {
  const navigation: any = useNavigation();


  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={destinations.postRegistration .regStepOne.name} component={destinations.postRegistration.regStepOne.component} />
      <Stack.Screen name={destinations.postRegistration.regStepTwo.name} component={destinations.postRegistration.regStepTwo.component} />
      <Stack.Screen name={destinations.postRegistration.regStepThree.name} component={destinations.postRegistration.regStepThree.component} />
      <Stack.Screen name={destinations.postRegistration.regStepFour.name} component={destinations.postRegistration.regStepFour.component} />
    </Stack.Navigator>
  );
}
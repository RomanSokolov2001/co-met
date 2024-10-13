import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import AskPersonalInfoScreen from '../screens/postRegistration/AskPersonalInfoScreen';
import AskProfessionalInterestsScreen from '../screens/postRegistration/AskProfessionalInterestsScreen';
import AskBioAndPhotoScreen from '../screens/postRegistration/AskBioAndPhotoScreen';
import AskPersonalInterestsScreen from '../screens/postRegistration/AskPersonalInterestsScreen';

// Import your screens here


const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="RegStepOne" component={AskPersonalInfoScreen} />
      <Stack.Screen name="RegStepTwo" component={AskProfessionalInterestsScreen} />
      <Stack.Screen name="RegStepThree" component={AskPersonalInterestsScreen} />
      <Stack.Screen name="RegStepFour" component={AskBioAndPhotoScreen} />
    </Stack.Navigator>
  );
}


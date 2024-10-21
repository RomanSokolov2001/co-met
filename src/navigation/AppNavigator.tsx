import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../wrappers/AuthContext';
import { getUserInfo } from '../services/FirestoreService';
import { useNavigation } from '@react-navigation/native';
import { destinations } from '../utils/navDestinations';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [isUserDataFilled, setUserDataFilled] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) return;

    const checkIfUserFilledData = async () => {
      const info = await getUserInfo(user.uid);
      if (info && info.occupation) {
        setUserDataFilled(true);
      }
    };

    checkIfUserFilledData();

    if (isUserDataFilled) {
      navigation.navigate(destinations.main.feeds.name);
    }
    setLoaded(true);
  }, [isLoaded, isUserDataFilled]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={destinations.postRegistration.regStepOne.name} component={destinations.postRegistration.regStepOne.component} />
      <Stack.Screen name={destinations.postRegistration.regStepTwo.name} component={destinations.postRegistration.regStepTwo.component} />
      <Stack.Screen name={destinations.postRegistration.regStepThree.name} component={destinations.postRegistration.regStepThree.component} />
      <Stack.Screen name={destinations.postRegistration.regStepFour.name} component={destinations.postRegistration.regStepFour.component} />
      <Stack.Screen name={destinations.main.feeds.name} component={destinations.main.feeds.component} />
    </Stack.Navigator>
  );
}

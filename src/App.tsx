import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AuthNavigator from './navigation/AuthNavigator';
import PostRegNavigator from './navigation/PostRegNavigator';
import MainAppNavigator from './navigation/MainAppNavigator';
import { AuthProvider, useAuth } from './wrappers/AuthContext';
import { ProfileProvider } from './wrappers/ProfileContext';
import { getUserProfile } from './services/FirestoreService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootNavigator = () => {
  const { user, loading } = useAuth();
  const [profileFilled, setProfileFilled] = useState(false);

  useEffect(() => {
    const checkProfileStatus = async () => {
      const a = await AsyncStorage.getItem('@profile_status')
      setProfileFilled(a ==='t')

      if (user) {
        const {success, data} = await getUserProfile(user.uid);

        if (data) {
          setProfileFilled(data.completedProfile)
          AsyncStorage.setItem('@profile_status', 't')
        }
      }
    };

    checkProfileStatus();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    user ? (
      profileFilled ? (
        <MainAppNavigator />
      ) : (
        <PostRegNavigator onProfileFill={() => setProfileFilled(true)} />
      )
    ) : (
      <AuthNavigator />
    )
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ProfileProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </ProfileProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

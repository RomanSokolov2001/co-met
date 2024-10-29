import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AuthNavigator from './navigation/AuthNavigator';

import { AuthProvider, useAuth } from './wrappers/AuthContext';
import { ContextProvider } from './wrappers/AppContext';
import PostRegNavigator from './navigation/PostRegNavigator';
import MainAppNavigator from './navigation/MainAppNavigator.';

const RootNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    user ?
      (false ?
        <PostRegNavigator /> : <MainAppNavigator />
      )
      :
      <AuthNavigator />
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ContextProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </ContextProvider>
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

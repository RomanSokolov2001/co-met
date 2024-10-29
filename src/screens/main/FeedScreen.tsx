import React from 'react';
import { StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../hooks/useTheme';
import { loadStatusBar } from '../../utils/utilFunctions';
import PageHeader from '../../components/PageHeader';
import Post from '../../components/Post';
import { ScrollView } from 'react-native-gesture-handler';


const theme = useTheme()


export default function FeedScreen() {
  const navigation = useNavigation()

  useFocusEffect(() => {
    loadStatusBar(theme.beige)
  })


  return (
    <SafeAreaView style={styles.container} >
      <PageHeader />
      <ScrollView>
        <Post />
        <Post />
        <Post />
        <Post />

      </ScrollView>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EDE0D4',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },



})
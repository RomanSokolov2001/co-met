import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomButton from '../../components/CustomButton';
import { shapes } from '../../utils/shapes';
import { useTheme } from '../../hooks/useTheme';
import { loadStatusBar } from '../../utils/utilFunctions';
import FeedHeader from '../../components/FeedHeader';
import Post from '../../components/Post';


const theme = useTheme()


export default function FeedScreen() {
  const navigation = useNavigation()

  const inset = useSafeAreaInsets()

  useFocusEffect(() => {
    loadStatusBar(theme.beige)
  })


  return (
    <SafeAreaView style={styles.container} >
      <FeedHeader/>
      <Post/>


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
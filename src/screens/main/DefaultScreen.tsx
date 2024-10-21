import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomButton from '../../components/CustomButton';
import { shapes } from '../../utils/shapes';
import { useTheme } from '../../hooks/useTheme';
import { loadStatusBar } from '../../utils/utilFunctions';


const theme = useTheme()


export default function DefaultScreen() {
  const navigation = useNavigation()

  const inset = useSafeAreaInsets()

  useFocusEffect(() => {
    loadStatusBar(theme.beige)
  })


  return (
    <SafeAreaView style={styles.container} >

      <View style={styles.pageTitleContainer}>
        <View style={styles.pageTitleEmptyPart}>
        </View>
        <View style={styles.pageTitleField}>
          <Text style={styles.pageTitleFieldText}> CO-MET </Text>
        </View>
      </View>

      <View style={styles.welcomeField}>
        <Text style={styles.welcomeTitle}>
          Connect, collaborate, co-succeed!
        </Text>
        <Text style={styles.welcomeDescription}>
          Find the best study and work buddies, make your ideas come to life!
        </Text>
        <CustomButton type={'light'} onPress={()=> {console.log("Pressed")}}>
          <Text>Get Started</Text>
        </CustomButton>
      </View>

      <Image
        source={shapes.rectBrownBottom}
        style={styles.rectBrownBottom}
      />
      <Image
        source={shapes.rectBeigeBottom}
        style={styles.rectBeigeBottom}
      />
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

  pageTitleContainer: {
    marginTop: 30,
    flexDirection: 'row'
  },
  pageTitleEmptyPart: {
    width: '40%'
  },
  pageTitleField: {
    backgroundColor: '#886650',
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    borderTopStartRadius: 50,
    borderBottomLeftRadius: 50,
  },
  pageTitleFieldText: {
    fontSize: 40,
    fontWeight: 'semibold',
    fontFamily: 'KiwiMaru-Medium',
    paddingBottom: 10,
    paddingLeft: 10,
  },

  welcomeField: {
    marginBottom: 100,
    alignItems: 'center',
  },
  welcomeTitle: {
    color: '#FFF8F2',
    fontSize: 20,
    fontWeight: 'semibold',
    fontFamily: 'Raleway-Bold',
    marginBottom: 20,
  },
  welcomeDescription: {
    color: '#FFF8F2',
    fontSize: 16,
    marginBottom: 20,
    width: '70%',
    fontFamily: 'Raleway-SemiBold',
  },

  rectBrownBottom: {
    position: 'absolute',
    bottom: 0,
    zIndex: -1,
    width: "100%",
    height: "60%",
    resizeMode: "stretch"
  },
  rectBeigeBottom: {
    zIndex: -2,
    bottom: 0,
    position: 'absolute',
    width: "100%",
    height: "70%",
    resizeMode: "stretch"
  }
})
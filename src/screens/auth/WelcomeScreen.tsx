import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import CustomButton from '../../components/buttons/CustomButton';
import { shapes } from '../../utils/shapes';
import { useTheme } from '../../hooks/useTheme';
import { destinations } from '../../types/navigation';


export default function WelcomeScreen() {
  const navigation: any = useNavigation()

  useFocusEffect(()=> {
    StatusBar.setBackgroundColor("rgba(0, 0, 0, 0)")
    StatusBar.setTranslucent(true);
  }, )

  return (
    <View style={styles.container} >

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
        <CustomButton type={'light'} onPress={() => navigation.navigate(destinations.auth.login.name)}>
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
    </View>
  );
}

const BAR_WIDTH = StatusBar.currentHeight
const theme = useTheme()

const styles = StyleSheet.create({
  container: {
    paddingTop: BAR_WIDTH,
    width: '100%',
    height: '100%',
    backgroundColor: theme.beige,
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
    backgroundColor: theme.cocao,
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
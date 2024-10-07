import React from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, StatusBar, Image } from 'react-native';


import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';

StatusBar.setBackgroundColor("#EDE0D4");
StatusBar.setBarStyle("dark-content");



export default function WelcomeScreen() {
  const navigation = useNavigation()
  function onGetStartedPress() {
    navigation.navigate('Signup')
  }

  return (
    <SafeAreaView style={styles.container} >
      {/* <Text>Welcome to the App!</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Signup" onPress={() => navigation.navigate('Signup')} /> */}
      <View style={styles.titleContainer}>
        <View style={styles.titleEmptyPart}>

        </View>
        <View style={styles.titleField}>
          <Text style={styles.titleFieldText}> CO-MET </Text>
        </View>
      </View>
      <View style={styles.welcomeField}>
        <Text style={styles.welcomeTextTitle}>
          Connect, collaborate, co-succeed!
        </Text>
        <Text style={styles.welcomeTextDescription}>
          Find the best study and work buddies, make your ideas come to life!
        </Text>
        <CustomButton type={'light'} onPress={()=> onGetStartedPress()}>
          <Text>Get Started</Text>
        </CustomButton>
      </View>


      <Image
        source={require('./../assets/rectBrownBottom.png')}
        style={styles.rectangularBrownBottom}
      />
      <Image
        source={require('./../assets/rectBeigeBottom.png')}
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

  titleContainer: {
    marginTop: 30,
    flexDirection: 'row'
  },
  titleEmptyPart: {
    width: '40%'
  },
  titleField: {
    backgroundColor: '#886650',
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    borderTopStartRadius: 50,
    borderBottomLeftRadius: 50,
  },
  titleFieldText: {
    fontSize: 40
  },

  welcomeField: {
    zIndex: 10,
    marginBottom: 100,
    alignItems: 'center',
  },
  welcomeTextTitle: {
    color: '#FFF8F2',
    fontSize: 20,
    fontWeight: 'semibold',
    marginBottom: 20,
  },
  welcomeTextDescription: {
    color: '#FFF8F2',
    fontSize: 16,
    fontWeight: 'semibold',
    marginBottom: 20,
    width:'70%'
  },

  rectangularBrownBottom: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    width: "100%",
    height: "60%",
    resizeMode: "stretch"
  },
  rectBeigeBottom: {
    zIndex: 0,
    bottom: 0,
    position: 'absolute',
    width: "100%",
    height: "70%",
    resizeMode: "stretch"
  }
})
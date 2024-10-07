import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';


import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';

StatusBar.setBackgroundColor("#886650");
StatusBar.setBarStyle("dark-content");



export default function SignupScreen() {
    const navigation = useNavigation()
    function onGetStartedPress() {
        navigation.navigate('Signup')
    }

    return (
        <SafeAreaView style={styles.container} >
            <Text>CO-MET</Text>
            <Text>Just seconds away from a world of opportunities!</Text>
            <View>
                <Text>
                    Username
                </Text>
                <Text>
                    Type your username
                </Text>
                <Text>
                    Passwword
                </Text>
                <Text>
                    Type your password
                </Text>
                <CustomButton>
                    <Text>Log in</Text>
                </CustomButton>
            </View>
            <Text>Create account</Text>




            <Image
                source={require('./../assets/rectBrownTop.png')}
                style={styles.rectangularBrownBottom}
            />
            <Image
                source={require('./../assets/rectBeigeTop.png')}
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



    rectangularBrownBottom: {
        position: 'absolute',
        top: 0,
        zIndex: 1,
        width: "100%",
        height: "30%",
        resizeMode: "stretch"
    },
    rectBeigeBottom: {
        zIndex: 0,
        top: 0,
        position: 'absolute',
        width: "100%",
        height: "40%",
        resizeMode: "stretch"
    }
})
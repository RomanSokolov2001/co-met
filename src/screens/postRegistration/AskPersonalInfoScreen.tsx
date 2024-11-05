import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, StatusBar, Alert } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

import CustomButton from '../../components/buttons/CustomButton';
import { useTheme } from '../../hooks/useTheme';
import { shapes } from '../../utils/shapes';
import { auth } from '../../../firebaseConfig';


const theme = useTheme()


export default function AskPersonalInfoScreen() {
    const navigation: any = useNavigation()
    const [location, setLocation] = useState('');
    const [occupation, setOccupation] = useState('');
    const [fieldOfWork, setFieldOfWork] = useState('');
    const [workplace, setWorkplace] = useState('');
    

    const handleContinue = () => {
        if (location =='') {
            Alert.alert('Fill obligatory field!')
            return
        }
        navigation.navigate('RegStepTwo', {
            location,
            occupation,
            fieldOfWork,
            workplace,
            
        });
    };

    useFocusEffect(() => {
        StatusBar.setBackgroundColor("rgba(0, 0, 0, 0)")
        StatusBar.setTranslucent(true);
    },)

    return (
        <View style={styles.container}>
            <Text style={styles.pageDescription}>What do you do and where?</Text>
            <View style={styles.formField}>
                <Text style={styles.value}>
                    Where are you located?*
                </Text>
                <View style={styles.inputField}>
                    <TextInput
                        placeholder='City/Town, Country'
                        placeholderTextColor={'#8a8988'}
                        value={location}
                        onChangeText={setLocation}
                    />
                </View>

                <Text style={styles.value}>
                    What is your occupation status?
                </Text>
                <View style={styles.inputField}>
                    <TextInput
                        placeholder='University student, part-time job, etc.'
                        placeholderTextColor={'#8a8988'}
                        value={occupation}
                        onChangeText={setOccupation}
                    />
                </View>

                <Text style={styles.value}>
                    What do you study/work?
                </Text>
                <View style={styles.inputField}>
                    <TextInput
                        placeholder='Psychology, management, etc.'
                        placeholderTextColor={'#8a8988'}
                        value={fieldOfWork}
                        onChangeText={setFieldOfWork}
                    />
                </View>

                <Text style={styles.value}>
                    Where do you study/work?
                </Text>
                <View style={styles.inputField}>
                    <TextInput
                        placeholder='University, company, etc.'
                        placeholderTextColor={'#8a8988'}
                        value={workplace}
                        onChangeText={setWorkplace}
                    />
                </View>

                <CustomButton onPress={handleContinue} type='dark'>
                    <Text>Continue</Text>
                </CustomButton>
            </View>

            <Image
                source={shapes.rectBrownTop}
                style={styles.rectBrownBottom}
            />
        </View>
    );
}

const BAR_WIDTH = StatusBar.currentHeight
const w = Dimensions.get('screen').width
const h = Dimensions.get('screen').height

const styles = StyleSheet.create({
    container: {
        paddingTop: BAR_WIDTH,
        width: '100%',
        height: '100%',
        backgroundColor: '#EDE0D4',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    pageDescription: {
        top: h / 30,
        fontSize: 28,
        fontFamily: 'KiwiMaru-Medium',
        alignSelf: 'center',
        textAlign: 'center',
        maxWidth: '80%',
        height: 100,
        color: theme.coal
    },

    mainBody: {
        height: "100%",
        justifyContent: 'center'
    },
    formField: {
        borderRadius: 10,
        padding: 10,
        marginHorizontal: "6%",
        marginBottom: '20%',
        backgroundColor: theme.beige
    },
    value: {
        fontSize: 20,
        color: 'black'
    },
    inputField: {
        borderBottomWidth: 2,
        marginBottom: 25,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: theme.cocao
    },

    rectBrownBottom: {
        position: 'absolute',
        top: 0,
        zIndex: -1,
        width: "100%",
        height: h / 2.5,
        resizeMode: "stretch"
    }
})
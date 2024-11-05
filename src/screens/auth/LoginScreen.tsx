import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, Dimensions, TextInput, TouchableWithoutFeedback } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '../../components/buttons/CustomButton';
import { useTheme } from '../../hooks/useTheme';
import { shapes } from '../../utils/shapes';
import { loadStatusBar } from '../../utils/utilFunctions';
import { icons } from '../../utils/icons';
import { emailRegex, passwordRegex } from '../../utils/utilData';
import ErrorMessage from '../../components/ErrorMessage';
import ErrorToast from '../../components/toasts/ErrorToast';
import { loginUser } from '../../services/AuthService';
import { destinations } from '../../types/navigation';


export default function LoginScreen() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [loading, setLoading] = useState(false)
    const [showErrorToast, setShowErrorToast] = useState(false)
    const [inputErrorText, setInputErrorText] = useState('')
    const [serverErrorText, setServerErrorText] = useState<string | undefined>('')
    const [trigger, setTrigger] = useState(0)

    const navigation: any = useNavigation()

    
    // Used CHAT GPT to use 2 IF instead of 5
    async function tryLogin() {
        if (!email || !password) return;

        const emailFine = emailRegex.test(email);
        const passFine = passwordRegex.test(password);

        if (!emailFine || !passFine) {
            setTrigger(trigger + 1);
            setInputErrorText(
                !emailFine && !passFine
                    ? 'Invalid email and password'
                    : !emailFine
                        ? 'Invalid email'
                        : 'Short password'
            );
            return;
        }

        setLoading(true);
        try {
            const result = await loginUser({ email, password });

            if (result.success) {
                navigation.navigate(destinations.main.feeds.name);
            } else {
                setServerErrorText(result.error);
                setShowErrorToast(true);
            }
        } catch (error) {
            setServerErrorText('An unexpected error occurred');
            setShowErrorToast(true);
        } finally {
            setLoading(false);
        }
    }


    return (
        <View style={styles.container} >
            <View style={styles.pageInfoField}>
                <Text style={styles.pageInfoTitle}>CO-MET</Text>

                <Text style={styles.pageInfoDescription}>Just seconds away from a world of opportunities!</Text>
            </View>

            <View style={styles.formField}>
                <ErrorMessage text={inputErrorText} trigger={trigger} />
                <Text style={styles.value}>
                    Username
                </Text>
                <View style={styles.input}>
                    <Image
                        source={icons.person2}
                        style={styles.icon}
                    />
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        placeholder='Type your email'
                        autoCapitalize="none"
                        placeholderTextColor={theme.coal}
                    />
                </View>
                <Text style={styles.value}>
                    Password
                </Text>
                <View style={styles.input}>
                    <Image
                        source={icons.lock}
                        style={styles.icon}
                    />
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder='Type your password'
                        secureTextEntry
                        placeholderTextColor={theme.coal}
                    />
                </View>

                <CustomButton onPress={tryLogin} type={'dark'}>
                    <Text>Log in</Text>
                </CustomButton>

                <TouchableWithoutFeedback
                    style={styles.noFeedBackButtonField}
                    onPress={() => navigation.navigate(destinations.auth.signup.name)}
                >
                    <Text style={styles.noFeedBackButtonText}>
                        Create account
                    </Text>
                </TouchableWithoutFeedback>
            </View>

            <Image
                source={shapes.rectBrownTop}
                style={styles.rectBrownTop}
            />
            <Image
                source={shapes.rectBeigeTop}
                style={styles.rectBeigeTop}
            />
            {showErrorToast &&
                <ErrorToast setToast={setShowErrorToast} errorText={serverErrorText} />
            }
        </View>
    );
}


const theme = useTheme()
const w = Dimensions.get('screen').width
const h = Dimensions.get('screen').height
const BAR_WIDTH = StatusBar.currentHeight

const styles = StyleSheet.create({
    container: {
        paddingTop: BAR_WIDTH,
        width: '100%',
        height: '100%',
        backgroundColor: theme.beige,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    pageInfoField: {
    },
    pageInfoTitle: {
        position: 'absolute',
        alignSelf: 'center',
        fontSize: 40,
        fontFamily: 'KiwiMaru-Medium',
        color: theme.beige
    },
    pageInfoDescription: {
        position: 'absolute',
        top: w / 3,
        fontSize: 22,
        fontFamily: 'Raleway-SemiBold',
        color: theme.coal,
        alignSelf: 'center',
        textAlign: 'center',
        maxWidth: '80%'
    },

    formField: {
        borderRadius: 10,
        padding: 10,
        marginHorizontal: "6%",
        marginBottom: '20%',
        backgroundColor: theme.beige
    },
    errorMessage: {
        fontSize: 22,
        alignSelf: 'center',
        fontFamily: 'Raleway-SemiBold',
        color: 'red'
    },
    value: {
        fontSize: 16,
        fontWeight: '700',
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: theme.coal,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 30,
        height: 30,
        tintColor: theme.cocao
    },
    noFeedBackButtonField: {
        height: 45,
    },
    noFeedBackButtonText: {
        alignSelf: 'center',
        fontSize: 14,
        fontWeight: "400",
        color: theme.cocao,
    },

    rectBrownTop: {
        position: 'absolute',
        top: 0,
        zIndex: -1,
        width: "100%",
        height: h / 3,
        resizeMode: "stretch"
    },
    rectBeigeTop: {
        zIndex: -2,
        top: 0,
        position: 'absolute',
        width: "100%",
        height: h / 2,
        resizeMode: "stretch"
    },
})
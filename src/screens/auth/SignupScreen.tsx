import React, { SetStateAction, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import CustomButton from '../../components/buttons/CustomButton';
import { useTheme } from '../../hooks/useTheme';
import { formatDateToCurrentLang, loadStatusBar } from '../../utils/utilFunctions';
import { icons } from '../../utils/icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { emailRegex, passwordRegex } from '../../utils/utilData';
import ErrorToast from '../../components/toasts/ErrorToast';
import { registerUser } from '../../services/AuthService';
import { destinations } from '../../types/navigation';


const theme = useTheme()


export default function SignupScreen() {
    const [name, setName] = useState('')
    const [dob, setDob] = useState(new Date())
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [showDateTimePicker, setShowDateTimePicker] = useState(false)
    const [isPasswordFine, setPasswordFine] = useState(false)
    const [arePasswordsMatch, setPasswordsMatch] = useState(false)
    const [isEmailFine, setEmailFine] = useState(false)
    const [serverErrorText, setServerErrorText] = useState<SetStateAction<string | undefined>>('Firebase Error: Server felt down...')
    const [showErrorToast, setShowErrorToast] = useState(false)


    const navigation:any = useNavigation()


    useFocusEffect(() => {
        if (showErrorToast) return
        loadStatusBar(theme.beige)
    })


    const onChangeDatePicker = (
        event: DateTimePickerEvent,
        selectedDate?: Date | undefined
    ) => {
        setShowDateTimePicker(false);

        if (event.type === 'set' && selectedDate) {
            setDob(selectedDate);
        }
    };

    useEffect(() => {
        if (passwordRegex.test(password)) {
            setPasswordFine(true)
        } else { setPasswordFine(false) }
    }, [password])

    useEffect(() => {
        if (emailRegex.test(email)) {
            setEmailFine(true)
        } else { setEmailFine(false) }
    }, [email])

    useEffect(() => {
        if (password == passwordConfirm) {
            setPasswordsMatch(true)
        } else { setPasswordsMatch(false) }
    }, [passwordConfirm])


    async function handleRegister() {
        if (!name || !arePasswordsMatch || !isEmailFine || !isPasswordFine) {
            setServerErrorText('Please fill all fields correctly');
            setShowErrorToast(true);
            return;
        }

        try {
            const result = await registerUser({
                email,
                password,
                displayName: name,
                dob
            });
            console.log(result)

            if (result.success) {
                navigation.navigate(destinations.postRegistration.regStepOne.name);
            } else {
                setServerErrorText(result.error);
                setShowErrorToast(true);
            }
        } catch (error) {
            setServerErrorText('An unexpected error occurred');
            setShowErrorToast(true);
        }
    }


    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.mainBody}>

                <Text style={styles.title}>Let's start with the basics!</Text>

                <View style={styles.formField}>
                    <View style={styles.inputField}>
                        <Image
                            source={icons.person2}
                            style={styles.icon}
                        />
                        <View>
                            <Text style={styles.value}>
                                Name
                            </Text>
                            <TextInput style={styles.input}
                                value={name}
                                onChangeText={setName}
                                placeholder='Type your name'
                                autoCapitalize="none"
                                placeholderTextColor={theme.coal}
                            />
                        </View>
                    </View>

                    <View style={styles.inputField}>
                        <Image
                            source={icons.calendar}
                            style={styles.icon}
                        />
                        <View>
                            <Text style={styles.value}>
                                Age
                            </Text>
                            <TouchableWithoutFeedback onPress={() => setShowDateTimePicker(true)}>
                                <Text style={[styles.input, { paddingTop: 11, color: 'black' }]}>
                                    {dob ? formatDateToCurrentLang(dob) : 'Choose'}
                                </Text>
                                {showDateTimePicker && (
                                    <DateTimePicker
                                        value={dob}
                                        mode="date"
                                        display="default"
                                        onChange={onChangeDatePicker}
                                    />
                                )}
                            </TouchableWithoutFeedback>

                        </View>
                    </View>

                    <View style={styles.inputField}>
                        <Image
                            source={icons.mail}
                            style={styles.icon}
                        />
                        <View>
                            <Text style={styles.value}>
                                Email
                            </Text>
                            <View style={styles.inputSpan}>
                                <TextInput style={styles.input}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    placeholder='Type your email'
                                    autoCapitalize="none"
                                    placeholderTextColor={theme.coal}
                                />
                            </View>
                            {email && (
                                isEmailFine ?
                                    <Image
                                        source={icons.check
                                        }
                                        style={styles.iconCheck}
                                    />
                                    :
                                    <Image
                                        source={icons.cross}
                                        style={styles.iconCross}
                                    />
                            )}
                        </View>
                    </View>

                    <View style={styles.inputField}>
                        <Image
                            source={icons.lock}
                            style={styles.icon}
                        />
                        <View>
                            <Text style={styles.value}>
                                Password
                            </Text>
                            <View style={styles.inputSpan}>
                                <TextInput style={styles.input}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    placeholder='Type your password'
                                    autoCapitalize="none"
                                    placeholderTextColor={theme.coal}
                                />
                            </View>
                            {password && (
                                isPasswordFine ?
                                    <Image
                                        source={icons.check
                                        }
                                        style={styles.iconCheck}
                                    />
                                    :
                                    <Image
                                        source={icons.cross}
                                        style={styles.iconCross}
                                    />
                            )}
                        </View>
                    </View>

                    <View style={styles.inputField}>
                        <Image
                            source={icons.lock}
                            style={styles.icon}
                        />
                        <View>
                            <Text style={styles.value}>
                                Confirm Password
                            </Text>
                            <View style={styles.inputSpan}>
                                <TextInput style={styles.input}
                                    value={passwordConfirm}
                                    onChangeText={setPasswordConfirm}
                                    keyboardType="email-address"
                                    placeholder='Confirm your password'
                                    autoCapitalize="none"
                                    placeholderTextColor={theme.coal}
                                />
                                {passwordConfirm && (
                                    arePasswordsMatch ?
                                        <Image
                                            source={icons.check
                                            }
                                            style={styles.iconCheck}
                                        />
                                        :
                                        <Image
                                            source={icons.cross}
                                            style={styles.iconCross}
                                        />
                                )}
                            </View>
                        </View>
                    </View>

                    <CustomButton onPress={() => handleRegister()} type='dark'>
                        <Text>
                            Sign Up
                        </Text>
                    </CustomButton>
                </View>
            </View>
            {showErrorToast &&
                <ErrorToast setToast={setShowErrorToast} errorText={serverErrorText} colorNext={theme.beigeDarker} colorPrev={theme.beige} />
            }
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#EDE0D4',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    mainBody: {
        justifyContent: 'center',
    },

    title: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'regular',
        width: '80%',
        alignSelf: 'center',
        color: theme.coal
    },
    formField: {
        borderRadius: 10,
        padding: 10,
        marginHorizontal: "6%",
        marginTop: 15,
        backgroundColor: theme.beige
    },
    value: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.cocao
    },
    inputField: {
        borderBottomWidth: 2,
        borderBottomColor: theme.cocao,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputSpan: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        height: 40,
        fontSize: 16,
        padding: 0,
        width: '100%'
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
        tintColor: theme.cocao
    },
    iconCross: {
        width: 23,
        height: 23,
        position: 'absolute',
        right: 50,
        bottom: 10
    },
    iconCheck: {
        width: 32,
        height: 32,
        position: 'absolute',
        right: 46,
        bottom: 8,
        tintColor: 'green'
    },
})
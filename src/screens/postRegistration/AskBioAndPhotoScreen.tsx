import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, Alert } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '../../components/CustomButton';
import { useTheme } from '../../hooks/useTheme';
import { shapes } from '../../utils/shapes';
import { loadStatusBar, pickImage } from '../../utils/utilFunctions';
import { launchImageLibrary } from 'react-native-image-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useAuth } from '../../wrappers/AuthContext';
import { completeUserProfile } from '../../services/FirestoreService';
import { destinations } from '../../types/navigation';


const theme = useTheme()


export default function AskBioAndPhotoScreen() {
    const navigation: any = useNavigation();
    const [loading, setLoading] = useState(false);
    const route = useRoute();

    const { user } = useAuth();
    const [imageUri, setImageUri] = useState('');
    const [bio, setBio] = useState('');
    const profileData = route.params;


    useFocusEffect(() => {
        loadStatusBar(theme.beige)
    })

    const handleCompleteProfile = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const result = await completeUserProfile(user.uid, {
                ...profileData,
                imageUri,
                bio
            });

            if (result.success) {
                navigation.navigate(destinations.main.feeds.name);
            } else {
                Alert.alert('Error', result.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to complete profile');
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.pageDescription}>
                {`Last but not least - show who you are!`}
            </Text>

            <View style={styles.formField}>
                <Text style={styles.value}>
                    Add a profile picture, so people who they are talking with
                </Text>

                <TouchableWithoutFeedback onPress={() => pickImage(setImageUri)}>
                    <View style={styles.input}>
                        <Text style={styles.placeholder}>
                            Click to upload a picture
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={styles.value}>
                    Here is the place to share all the details about yourself!
                </Text>
                <View style={styles.input}>
                    <TextInput
                        placeholder='Add short bio'
                        placeholderTextColor={theme.beige}
                    />
                </View>
                <CustomButton type={'light'} onPress={handleCompleteProfile}>
                    <Text>Complete profile</Text>
                </CustomButton>
            </View>
            <View style={styles.round}>
                {imageUri ?
                    <Image
                        source={{ uri: imageUri }}
                        width={roundSize}
                        height={roundSize}
                        style={styles.avatar}
                    />
                    :
                    <Text style={styles.roundText}>
                        Picture preview
                    </Text>
                }
            </View>

            <Image
                source={shapes.rectBrownBottom}
                style={styles.rectBrownBottom}
            />
        </SafeAreaView>
    );
}


const w = Dimensions.get('screen').width
const h = Dimensions.get('screen').height

const roundSize = 150

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#EDE0D4',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    pageDescription: {
        fontSize: 28,
        fontFamily: 'KiwiMaru-Medium',
        textAlign: 'left',
        maxWidth: '85%',
        marginLeft: w / 10,
        color: theme.coal
    },
    avatar: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: theme.coal
    },
    round: {
        width: roundSize,
        height: roundSize,
        backgroundColor: theme.caramel,
        position: 'absolute',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: theme.coal,
        top: h / 4,
        left: w / 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    roundText: {
        color: theme.coal,
        fontSize: 16
    },

    formField: {
        zIndex: 2,
        borderRadius: 10,
        padding: 10,
        marginHorizontal: "6%",
        marginBottom: "20%",
        backgroundColor: theme.cocao
    },
    placeholder: {
        color: theme.beige,
        paddingVertical: 12
    },
    value: {
        fontSize: 20,
        color: 'black'
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: theme.beige,
        marginBottom: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 30,
        height: 30
    },

    rectBrownBottom: {
        position: 'absolute',
        bottom: 0,
        zIndex: -1,
        width: "100%",
        height: h / 1.25,
        resizeMode: "stretch",
    }
})
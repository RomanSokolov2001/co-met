import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert, ScrollView, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { loadStatusBar, pickImage } from '../../utils/utilFunctions';
import CustomButton from '../../components/buttons/CustomButton';
import InterestBubble from '../../components/InterestBubble';
import { updateUserProfile, getUserProfile, getProfessionalTags, getPersonalTags } from '../../services/FirestoreService';
import { useProfile } from '../../wrappers/ProfileContext';


const theme = useTheme();

export default function EditProfileScreen() {
    const navigation = useNavigation();
    const {profile, updateProfile} = useProfile()
    const [loading, setLoading] = useState(false);
    const [userProfile, setUserProfile] = useState(null);


    const [imageUri, setImageUri] = useState('');
    const [imageUrl, setImageUrl] = useState('')
    const [location, setLocation] = useState('');
    const [occupation, setOccupation] = useState('');
    const [fieldOfWork, setFieldOfWork] = useState('');
    const [workplace, setWorkplace] = useState('');
    const [bio, setBio] = useState('');

    const [personalTags, setPersonalTags] = useState([])
    const [professionalTags, setProfessionalTags] = useState([])

    const [selectedPersonalInterests, setSelectedPersonalInterests] = useState([]);
    const [selectedProfessionalInterests, setSelectedProfessionalInterests] = useState([]);


    useEffect(() => {
        loadPersonalTags()
        loadProfesisonalTags()
        loadUserProfile();
    }, []);

    const loadUserProfile = async () => {
        try {
            setLoading(true);
            const result = await getUserProfile();
            if (result.success) {
                const profile = result.data;
                setUserProfile(profile);
                setImageUrl(profile.photoURL || '');
                setLocation(profile.location || '');
                setOccupation(profile.occupation || '');
                setFieldOfWork(profile.fieldOfWork || '');
                setWorkplace(profile.workplace || '');
                setBio(profile.bio || '');
                setSelectedPersonalInterests(profile.personalInterests || []);
                setSelectedProfessionalInterests(profile.professionalInterests || []);
            } else {
                Alert.alert('Error', 'Failed to load profile information');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while loading profile');
        } finally {
            setLoading(false);
        }
    };

    const loadPersonalTags = async () => {
        const { success, data } = await getPersonalTags()
        setPersonalTags(data)
    }
    const loadProfesisonalTags = async () => {
        const { success, data } = await getProfessionalTags()
        setProfessionalTags(data)
    }

    const handleSave = async () => {
        if (!userProfile) return;
        setLoading(true);

        try {
            const profileData = {
                location,
                occupation,
                fieldOfWork,
                workplace,
                bio,
                personalInterests: selectedPersonalInterests,
                professionalInterests: selectedProfessionalInterests,
                imageUri
            };

            const result = await updateUserProfile(profileData);
            if (result.success) {
                updateProfile(result.updateData)
                Alert.alert('Success', 'Profile updated successfully');
                navigation.goBack();
            } else {
                Alert.alert('Error', result.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handlePersonalChoice = (topic: string) => {
        console.log('loga')
        setSelectedPersonalInterests(prevSelectedTopics => {
            if (prevSelectedTopics.includes(topic)) {
                return prevSelectedTopics.filter(item => item !== topic);
            } else if (prevSelectedTopics.length < 5) {
                return [...prevSelectedTopics, topic];
            } else {
                return prevSelectedTopics;
            }
        });
    };

    const handleProfessionalChoice = (topic: string) => {
        setSelectedProfessionalInterests(prevSelectedTopics => {
            if (prevSelectedTopics.includes(topic)) {
                return prevSelectedTopics.filter(item => item !== topic);
            } else if (prevSelectedTopics.length < 5) {
                return [...prevSelectedTopics, topic];
            } else {
                return prevSelectedTopics;
            }
        });
    };

    function renderPersonalBubbles() {
        return personalTags.map((el, i) => {
            return <InterestBubble
                value={el}
                key={i}
                onPress={() => handlePersonalChoice(el)}
                selected={selectedPersonalInterests}
                limit={4}
            />
        })
    }
    function renderProfissonalBubbles() {
        return professionalTags.map((el, i) => {
            return <InterestBubble
                value={el}
                key={i}
                onPress={() => handleProfessionalChoice(el)}
                selected={selectedProfessionalInterests}
                limit={4}
            />
        })
    }


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Edit Profile</Text>
                </View>

                <TouchableOpacity style={styles.imageContainer} onPress={() => pickImage(setImageUri)}>
                    <View style={styles.round}>
                        {imageUri ?
                            <Image source={{ uri: imageUri }} style={styles.avatar} />
                            :
                            imageUrl ?
                                <Image source={{ uri: imageUrl }} style={styles.avatar} />
                                :
                                <Text style={styles.roundText}>Add Photo</Text>
                        }
                    </View>
                    <Text style={styles.label}>Tap to edit</Text>

                </TouchableOpacity>

                <View style={styles.formField}>
                    <Text style={styles.label}>Location</Text>
                    <TextInput
                        style={styles.input}
                        value={location}
                        onChangeText={setLocation}
                        placeholder="City/Town, Country"
                        placeholderTextColor={theme.cocao}
                    />

                    <Text style={styles.label}>Occupation</Text>
                    <TextInput
                        style={styles.input}
                        value={occupation}
                        onChangeText={setOccupation}
                        placeholder="University student, part-time job, etc."
                        placeholderTextColor={theme.cocao}
                    />

                    <Text style={styles.label}>Field of Work</Text>
                    <TextInput
                        style={styles.input}
                        value={fieldOfWork}
                        onChangeText={setFieldOfWork}
                        placeholder="Psychology, management, etc."
                        placeholderTextColor={theme.cocao}
                    />

                    <Text style={styles.label}>Workplace/University</Text>
                    <TextInput
                        style={styles.input}
                        value={workplace}
                        onChangeText={setWorkplace}
                        placeholder="University, company, etc."
                        placeholderTextColor={theme.cocao}
                    />

                    <Text style={styles.label}>Bio</Text>
                    <TextInput
                        style={[styles.input, styles.bioInput]}
                        value={bio}
                        onChangeText={setBio}
                        placeholder="Tell us about yourself..."
                        placeholderTextColor={theme.cocao}
                        multiline
                    />

                    <Text style={styles.sectionTitle}>Personal Interests (up to 5)</Text>
                    <View style={styles.interestsContainer}>
                        {renderPersonalBubbles()}
                    </View>

                    <Text style={styles.sectionTitle}>Professional Interests (up to 5)</Text>
                    <View style={styles.interestsContainer}>
                        {renderProfissonalBubbles()}
                    </View>

                    <CustomButton type="dark" onPress={handleSave} loading={loading}>
                        <Text>Save Changes</Text>
                    </CustomButton>
                </View>
            </ScrollView>
        </View>
    );
}

const BAR_WIDTH = StatusBar.currentHeight
const roundSize = 120;

const styles = StyleSheet.create({
    container: {
        paddingTop: BAR_WIDTH,
        flex: 1,
        backgroundColor: theme.beige,
    },
    header: {
        padding: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontFamily: 'KiwiMaru-Medium',
        color: theme.coal,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    round: {
        width: roundSize,
        height: roundSize,
        backgroundColor: theme.caramel,
        borderRadius: roundSize / 2,
        borderWidth: 2,
        borderColor: theme.coal,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: roundSize / 2,
    },
    roundText: {
        color: theme.coal,
        fontSize: 16,
    },
    formField: {
        padding: 20,
        backgroundColor: theme.beige,
    },
    label: {
        fontSize: 16,
        color: theme.coal,
        marginBottom: 5,
        fontFamily: 'Raleway-Medium',
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: theme.cocao,
        paddingVertical: 8,
        marginBottom: 20,
        color: theme.coal,
    },
    bioInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    sectionTitle: {
        fontSize: 18,
        color: theme.coal,
        marginTop: 20,
        marginBottom: 10,
        fontFamily: 'KiwiMaru-Medium',
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
});
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, ActivityIndicator, StatusBar } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { loadStatusBar } from '../../utils/utilFunctions';
import ProfileButton from '../../components/ProfileButton';
import ProfileInfoSection from '../../components/ProfileInfoSection';
import ProfileContactSection from '../../components/ProfileContactSection';
import { getUserProfile } from '../../services/FirestoreService';
import FilteredPostsView from '../../components/FilteredPostsView';

const theme = useTheme();

const profileSections = ['Info', 'Posts', 'Contact']

export default function PostOwnerProfileScreen() {
    const [selectedSection, setSelectedSection] = useState(profileSections[0]);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const route = useRoute()
    const {userId} = route.params


    useEffect(() => {
        loadUserProfile();
    }, []);


    const loadUserProfile = async () => {
        try {
            setLoading(true);
            const result = await getUserProfile(userId);
            console.log(result)
            if (result.success) {
                setUserProfile(result.data);
            } else {
                Alert.alert('Error', 'Failed to load profile information');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while loading profile');
        } finally {
            setLoading(false);
        }
    };


    function threeButtons() {
        const labels = profileSections;
        return labels.map(label => (
            <ProfileButton
                key={label}
                onPress={() => setSelectedSection(label)}
                selectedSection={selectedSection}
                label={label}
            >
                <Text>{label}</Text>
            </ProfileButton>
        ));
    }

    function getSectionView() {
        if (!userProfile) return null;

        switch (selectedSection) {
            case 'Info':
                return <ProfileInfoSection userProfile={userProfile} />;
            case 'Posts':
                return <FilteredPostsView userId={userId} isViewedFromProfile={true} />;
            case 'Contact':
                return <ProfileContactSection userProfile={userProfile} />;
            default:
                return null;
        }
    }

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.coal} />
                </View>
            </SafeAreaView>
        );
    }
    if (!userProfile) return (
        <View style={styles.container}>

        </View>
    )

    const studyWorkText = [userProfile?.workplace, userProfile?.fieldOfWork]
        .filter(Boolean)
        .join(' • ');

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <View style={styles.round}>
                    {userProfile.photoURL &&
                        <Image
                            source={{ uri: userProfile?.photoURL }}
                            style={[styles.avatar, styles.round]}
                        />
                    }
                </View>
                <View style={styles.profileHeaderInfoField}>
                    <Text style={styles.profileHeaderInfoTitle}>
                        {userProfile?.displayName || 'Name Surname'}, {userProfile?.age || '21'}
                    </Text>
                    <Text style={styles.profileHeaderInfoText}>
                        {userProfile?.location || 'Location not specified'}
                    </Text>
                    <Text style={styles.profileHeaderInfoText}>
                        {studyWorkText || 'Not specified'}
                    </Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                {threeButtons()}
            </View>
            {getSectionView()}
        </View>
    );
}

const roundSize = 120;
const BAR_WIDTH = StatusBar.currentHeight

const styles = StyleSheet.create({
    container: {
        paddingTop: BAR_WIDTH,
        width: '100%',
        height: '100%',
        backgroundColor: '#EDE0D4',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
    },
    logoutButton: {
        backgroundColor: theme.coal,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    logoutText: {
        color: 'white',
        fontFamily: 'Raleway-Medium',
        fontSize: 14,
    },
    profileHeader: {
        flexDirection: 'row',
        padding: 20,
    },
    avatar: {
        borderRadius: roundSize - 2,
        borderWidth: 2,
        borderColor: theme.coal,
    },
    round: {
        width: roundSize,
        height: roundSize,
        backgroundColor: theme.caramel,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: theme.coal,
        alignItems: 'center',
    },
    profileHeaderInfoField: {
        padding: 20,
    },
    profileHeaderInfoTitle: {
        fontFamily: 'KiwiMaru-Medium',
        color: 'black',
        fontSize: 15,
        paddingBottom: 5,
    },
    profileHeaderInfoText: {
        fontFamily: 'Raleway-Medium',
        fontSize: 13,
        paddingBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});
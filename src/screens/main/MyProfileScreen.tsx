import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator, StatusBar, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { loadStatusBar } from '../../utils/utilFunctions';
import ProfileButton from '../../components/ProfileButton';
import ProfileInfoSection from '../../components/ProfileInfoSection';
import ProfileContactSection from '../../components/ProfileContactSection';
import { logoutUser } from '../../services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserProfile } from '../../services/FirestoreService';
import { icons } from '../../utils/icons';
import FilteredPostsView from '../../components/FilteredPostsView';
import { auth } from '../../../firebaseConfig';
import SideBar from '../../components/SideBar';
import DeleteProfileToast from '../../components/toasts/ProfileDeleteToast';
import { useProfile } from '../../wrappers/ProfileContext';
import PostDeleteToast from '../../components/toasts/PostDeleteToast';


const profileSections = ['Info', 'Posts', 'Contact']

export default function MyProfileScreen() {
  const [selectedSection, setSelectedSection] = useState(profileSections[0]);
  const { profile } = useProfile()
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [profileDelitionToast, setProfileDelitionToast] = useState(false)
  const [postDelitionToast, setPostDelitionToast] = useState(false)
  const [postIdToDelete, setPostIdToDelete] = useState('')

  const [isSideBarVisible, setSideBarVisible] = useState(false)

  useEffect(() => {
    loadUserProfile();
  }, []);

  useEffect(()=> {
    if (postIdToDelete == '') return
    setPostDelitionToast(true)
  }, [postIdToDelete])


  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const result = await getUserProfile();
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

  function handleBurgerTap() {
    setSideBarVisible(true)
  }

  async function handleLogout() {
    try {
      const result = await logoutUser();
      if (result.success) {
        await AsyncStorage.removeItem('@profile_status');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } else {
        Alert.alert('Logout Failed', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while logging out');
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
        return <ProfileInfoSection userProfile={profile} />;
      case 'Posts':
        return <FilteredPostsView userId={auth.currentUser?.uid} isViewedFromProfile={true} isOwnPost={true} setPostId={setPostIdToDelete}/>;
      case 'Contact':
        return <ProfileContactSection userProfile={profile} />;
      default:
        return null;
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.coal} />
        </View>
      </View>
    );
  }
 


  const studyWorkText = [profile?.workplace, profile?.fieldOfWork]
    .filter(Boolean)
    .join(' • ');

  return (
    <View style={styles.container}>
      {profileDelitionToast &&
        <DeleteProfileToast setToast={setProfileDelitionToast} />
      }
      {postDelitionToast &&
        <PostDeleteToast postId={postIdToDelete} setToast={setPostDelitionToast} />
      }
      <SideBar isVisible={isSideBarVisible} onClose={() => setSideBarVisible(false)} onDelete={() => { setProfileDelitionToast(true), setSideBarVisible(false) }} onLogout={handleLogout} />
      <View style={styles.profileHeader}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.round}>
            {profile.photoURL &&
              <Image
                source={{ uri: profile?.photoURL }}
                style={[styles.avatar, styles.round]}
              />
            }
          </View>
          <View style={styles.profileHeaderInfoField}>
            <Text style={styles.profileHeaderInfoTitle}>
              {profile?.displayName || 'Name Surname'}, {userProfile?.age || '21'}
            </Text>
            <Text style={styles.profileHeaderInfoText}>
              {profile?.location || 'Location not specified'}
            </Text>
            <Text style={styles.profileHeaderInfoText}>
              {studyWorkText || 'Not specified'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleBurgerTap}
        >
          <Image
            source={icons.hamburger}
            style={styles.icon}
            tintColor={theme.cocao}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        {threeButtons()}
      </View>
      {getSectionView()}
    </View>
  );
}


const roundSize = 120;
const theme = useTheme();
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

  icon: {
    width: 30,
    height: 30,
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between'
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
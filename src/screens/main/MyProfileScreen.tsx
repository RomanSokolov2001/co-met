import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../hooks/useTheme';
import { loadStatusBar } from '../../utils/utilFunctions';
import ProfileButton from '../../components/ProfileButton';
import ProfileInfoSection from '../../components/ProfileInfoSection';
import ProfileContactSection from '../../components/ProfileContactSection';


const theme = useTheme()


export default function MyProfileScreen() {
    const [selectedSection, setSelectedSection] = useState('Info')

    useFocusEffect(() => {
        loadStatusBar(theme.beige)
    })


    function threeButtons() {
        const labels: string[] = ['Info', 'Posts', 'Contact']

        return (
            labels.map(label => {
                return (
                    <ProfileButton onPress={() => setSelectedSection(label)} selectedSection={selectedSection} label={label}>
                        <Text> {label} </Text>
                    </ProfileButton>
                )
            })
        )
    }

    function getSectionView() {
        switch (selectedSection) {
            case 'Info':
                return (<ProfileInfoSection />)
            case 'Posts':
                return (<View />)
            case 'Contact':
                return (<ProfileContactSection />)
        }

    }


    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.profileHeader}>
                <View style={styles.round}>
                    <Image
                        style={styles.avatar}
                    />
                </View>
                <View style={styles.profileHeaderInfoField}>
                    <Text style={styles.profileHeaderInfoTitle}>
                        Name Surname, 21
                    </Text>
                    <Text style={styles.profileHeaderInfoText}>
                        Estonia, Tallinn
                    </Text>
                    <Text style={styles.profileHeaderInfoText}>
                        Study & Work
                    </Text>
                </View>


            </View>
            <View style={styles.buttonContainer}>
                {threeButtons()}
            </View>
            {getSectionView()}


        </SafeAreaView>
    );
}



const roundSize = 120

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#EDE0D4',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },

    profileHeader: {
        flexDirection: 'row',
        padding: 20,
    },
    avatar: {
        borderRadius: roundSize-2,
        borderWidth: 2,
        borderColor: theme.coal
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
        padding: 20
    },
    profileHeaderInfoTitle: {
        fontFamily: 'KiwiMaru-Medium',
        color: 'black',
        fontSize: 15,
        paddingBottom: 5
    },
    profileHeaderInfoText: {
        fontFamily: 'Raleway-Medium',
        fontSize: 13,
        paddingBottom: 5
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
})
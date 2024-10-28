import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '../../components/buttons/CustomButton';
import { useTheme } from '../../hooks/useTheme';
import InterestBubble from '../../components/InterestBubble';
import { shapes } from '../../utils/shapes';
import { loadStatusBar } from '../../utils/utilFunctions';
import { RegistrationScreenNavigationProp, RegStepTwoRouteProp } from '../../types/navigation';


const personalInterests: string[] = [
    'Art', 'Photography', 'Music', 'Cooking', 'Traveling', 'Fitness', 'Gardening', 'Film', 'Writing', 'Languages',
    'Astronomy', 'Fashion', 'Dancing', 'Gaming', 'Hiking', 'Camping', 'Reading', 'Meditation', 'Yoga', 'Sports',
];

const theme = useTheme()


export default function AskProffesionalInterestsScreen() {
    const navigation = useNavigation<RegistrationScreenNavigationProp>();
    const route = useRoute<RegStepTwoRouteProp>();
    const { personalInfo } = route.params;
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    const handleContinue = () => {
        navigation.navigate('RegStepThree', {
            personalInfo,
            professionalInterests: selectedInterests
        });
    };

    const handleChoice = (interest: string) => {
        setSelectedInterests(prevSelectedInterests => {
            if (prevSelectedInterests.includes(interest)) {
                return prevSelectedInterests.filter(item => item !== interest);
            } else if (prevSelectedInterests.length < 5) {
                return [...prevSelectedInterests, interest];
            } else {
                return prevSelectedInterests;
            }
        });
    };

    useFocusEffect(() => {
        loadStatusBar(theme.cocao)
    })

    function renderItem(array: string[]) {
        return array.map((el, i) => {
            return <InterestBubble
                value={el}
                key={i}
                onPress={() => handleChoice(el)}
                selected={selectedInterests}
                limit={4}
            />
        })
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.pageDescription}>
                {`Share your\ninterests with the community! pt.1`}
            </Text>

            <View style={styles.mainBody}>
                <Text style={styles.bubblesText}>
                    {"Professional (choose up to 5)"}
                </Text>

                <ScrollView style={styles.scrollView}>
                    <View style={styles.bubblesContainer}>
                        {renderItem(personalInterests)}
                    </View>
                </ScrollView>

                <CustomButton onPress={handleContinue} type="dark">
                    <Text>Continue</Text>
                </CustomButton>
            </View>

            <Image
                source={shapes.rectBrownTopReverse}
                style={styles.rectBrownTopReverse}
            />
        </SafeAreaView>
    );
}


const w = Dimensions.get('screen').width
const h = Dimensions.get('screen').height

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#EDE0D4',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    mainBody: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: '20%',
    },
    bubblesText: {
        fontSize: 20,
        fontFamily: 'Raleway-Medium',
        color: 'black',
        marginBottom: 20,
        alignSelf: 'flex-start'
    },
    scrollView: {
        maxHeight: h / 2
    },
    bubblesContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    pageDescription: {
        top: h / 50,
        fontSize: 28,
        fontFamily: 'KiwiMaru-Medium',
        textAlign: 'left',
        maxWidth: '85%',
        marginLeft: w / 10,
        color: theme.coal
    },

    rectBrownTopReverse: {
        position: 'absolute',
        top: 0,
        zIndex: -1,
        width: "100%",
        height: h / 3.5,
        resizeMode: "stretch",
    }
})
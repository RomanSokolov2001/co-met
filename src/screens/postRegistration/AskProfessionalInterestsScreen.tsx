import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '../../components/CustomButton';
import { useTheme } from '../../hooks/useTheme';
import InterestBubble from '../../components/InterestBubble';
import { shapes } from '../../utils/shapes';
import { loadStatusBar } from '../../utils/utilFunctions';


const personalInterests: string[] = [
    'Art', 'Photography', 'Music', 'Cooking', 'Traveling', 'Fitness', 'Gardening', 'Film', 'Writing', 'Languages',
    'Astronomy', 'Fashion', 'Dancing', 'Gaming', 'Hiking', 'Camping', 'Reading', 'Meditation', 'Yoga', 'Sports',
];

const theme = useTheme()


export default function AskProffesionalInterestsScreen() {
    const navigation = useNavigation()

    useFocusEffect(() => {
        loadStatusBar(theme.cocao)
    })


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
                        <InterestBubble value={'Art'} />
                        {renderItem(personalInterests)}
                    </View>
                </ScrollView>

                <CustomButton onPress={() => navigation.navigate('RegStepThree')}>
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

function renderItem(array: string[]) {
    return array.map((el, i) => {
        return <InterestBubble value={el} key={i} />
    })
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
        alignSelf: 'left',
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
import React, { useState, useRef, useEffect } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    TextInput,
    Text,
    ScrollView,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { loadStatusBar } from '../utils/utilFunctions';
import InterestBubble from './InterestBubble';

const personalInterests: string[] = [
    'Art', 'Photography', 'Music', 'Cooking', 'Traveling', 'Fitness', 'Gardening', 'Film', 'Writing', 'Languages',
    'Astronomy', 'Fashion', 'Dancing', 'Gaming', 'Hiking', 'Camping', 'Reading', 'Meditation', 'Yoga', 'Sports',
];

const { height: windowHeight } = Dimensions.get('window');
const theme = useTheme();

const FiltersWindow = ({ isVisible, onClose }) => {
    const [location, setLocation] = useState('');
    const slideAnim = useRef(new Animated.Value(windowHeight)).current;
    const filtersHeight = windowHeight * 0.7;
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);


    const handleChoice = (interest: string) => {
        setSelectedInterests(prevSelectedInterests => {
            if (prevSelectedInterests.includes(interest)) {
                return prevSelectedInterests.filter(item => item !== interest);
            } else
                return [...prevSelectedInterests, interest];
        });
    };

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: isVisible ? windowHeight - filtersHeight : windowHeight,
            duration: 300,
            useNativeDriver: false,
        }).start();

        if (isVisible) {
            loadStatusBar(theme.beigeDarker);
        } else {
            loadStatusBar(theme.beige);
        }
    }, [isVisible]);

    const handleLocationChange = (text) => {
        setLocation(text);
        // You can add additional logic here to handle the location filter
        // such as triggering a search or updating parent component
    };

    function renderItem(array: string[]) {
        return array.map((el, i) => {
            return <InterestBubble
                value={el}
                key={i}
                onPress={() => handleChoice(el)}
                selected={selectedInterests}
            />
        })
    }

    function resetFilter() {
        setSelectedInterests([])
        setLocation('')
    }

    return (
        <>
            {isVisible && (
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            )}
            <Animated.View
                style={[
                    styles.container,
                    {
                        height: filtersHeight,
                        transform: [{ translateY: slideAnim }]
                    }
                ]}
            >
                <View style={styles.content}>
                    <View style={styles.filterHeader}>
                        <Text style={styles.title}>Filters</Text>
                        <TouchableWithoutFeedback onPress={()=>resetFilter()}>
                            <View style={{ padding: 10 }}>
                                <Text style={styles.reset}>Reset</Text>
                            </View>
                        </TouchableWithoutFeedback>

                    </View>

                    <View style={styles.filterSection}>
                        <Text style={styles.label}>Location</Text>
                        <View style={styles.inputField}>
                            <TextInput
                                value={location}
                                onChangeText={handleLocationChange}
                                placeholder="Enter location"
                                placeholderTextColor={theme.beigeDarker}
                            />
                        </View>

                    </View>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.bubblesContainer}>
                            {renderItem(personalInterests)}
                        </View>
                    </ScrollView>
                </View>
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: theme.beige,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 1000,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: 999,
    },
    content: {
        padding: 20,
    },
    filterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        marginBottom: 20,

    },
    title: {
        fontSize: 20,
        fontFamily: 'KiwiMaru-Medium',
        color: theme.cocao,
        alignSelf: 'center'

    },
    reset: {
        fontSize: 16,
        fontFamily: 'KiwiMaru-Medium',
        color: theme.coal,
        alignSelf: 'center'
    },
    filterSection: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: theme.coal,
    },
    inputField: {
        borderBottomWidth: 2,
        marginBottom: 25,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: theme.cocao
    },
    input: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.beigeDarker,
        color: theme.beigeDarker,
    },
    scrollView: {
        padding: 10,
        maxHeight: 140,
        borderWidth: 1,
        borderColor: theme.coal,
        borderRadius: 20,
    },
    bubblesContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
});

export default FiltersWindow;
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
import { getPersonalTags, getPostTags, getProfessionalTags } from '../services/FirestoreService';


interface FiltersWindowProps {
    isVisible: boolean
    onClose: (location: string, tags: string[]) => void
}

const FiltersWindow = ({ isVisible, onClose, setLocation: setLocationFromParent, setTags: setTagsFromParent }: FiltersWindowProps) => {
    const [trigger, setTrigger] = useState(0)
    const [location, setLocation] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tags, setTags] = useState([])

    const slideAnim = useRef(new Animated.Value(screenHeight)).current;
    const filtersHeight = screenHeight * 0.7;


    useEffect(() => {
        async function setPostTags() {
            const { data: personalTags } = await getPersonalTags()
            const { data: professionalTags } = await getProfessionalTags()
            setTags([...personalTags, ...professionalTags]);

        }
        function perfomAnimation() {
            Animated.timing(slideAnim, {
                toValue: isVisible ? screenHeight - filtersHeight : screenHeight,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }

        setPostTags()
        perfomAnimation()


    }, [isVisible]);


    function handleClose() {
        onClose()
        setLocationFromParent(location)
        setTagsFromParent(selectedTags)
    }


    const handleChoice = (interest: string) => {
        setSelectedTags(prevSelectedInterests => {
            if (prevSelectedInterests.includes(interest)) {
                return prevSelectedInterests.filter(item => item !== interest);
            } else
                return [...prevSelectedInterests, interest];
        });
    };


    function resetFilter() {
        setSelectedTags([])
        setLocation('')
        setTrigger(trigger + 1)
    }


    function renderItem(array: string[]) {
        return array.map((el, i) => {
            return <InterestBubble
                value={el}
                key={i}
                onPress={() => handleChoice(el)}
                selected={selectedTags}
                trigger={trigger}
            />
        })
    }

    return (
        <>
            {isVisible && (
                <TouchableWithoutFeedback onPress={() => handleClose()}>
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
                        <TouchableWithoutFeedback onPress={() => resetFilter()}>
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
                                onChangeText={setLocation}
                                placeholder="Enter location"
                                placeholderTextColor={theme.beigeDarker}
                            />
                        </View>

                    </View>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.bubblesContainer}>
                            {renderItem(tags)}
                        </View>
                    </ScrollView>
                </View>
            </Animated.View>
        </>
    );
};

const screenHeight = Dimensions.get('window').height;
const theme = useTheme();


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
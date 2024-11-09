import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, StatusBar, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useTheme } from '../../hooks/useTheme';
import CustomButton from '../../components/buttons/CustomButton';
import { icons } from '../../utils/icons';
import InterestBubble from '../../components/InterestBubble';
import ProfileButton from '../../components/ProfileButton';
import DropDown from '../../components/DropDown';
import { createNewPost, getPostById, getPostTags, updatePost } from '../../services/FirestoreService';
import { useRoute } from '@react-navigation/native';
import ButtonNoBg from '../../components/buttons/ButtonNoBg';


const durationOpions = ['1h', '1.5h', '2h', '3h+']

const AddPostScene = () => {
    const [note, setNote] = useState('');
    const [time, setTime] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [duration, setDuration] = useState(durationOpions[0]);
    const [location, setLocation] = useState('Caffeine Harju');
    const [selectedType, setSelectedType] = useState('Work');
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [tags, setTags] = useState([])

    const route = useRoute()
    const [postIdToEdit, setPostIdToEdit] = useState('')

    async function loadPost() {
        try {
            if (route?.params?.postId) {
                setPostIdToEdit(route.params.postId);
                const { success, data } = await getPostById(route.params.postId);

                if (success && data) {
                    setNote(data.note || '');
                    setTime(data.time ? new Date(data.time) : new Date());
                    setDate(data.date ? new Date(data.date) : new Date());
                    setDuration(data.duration || durationOpions[0]);
                    setLocation(data.location || 'Caffeine Harju');
                    setSelectedType(data.type || 'Work');
                    setSelectedTopics(data.topics || []);
                } else {
                    console.error('Failed to load post data');
                }
            }
        } catch (error) {
            console.error('Error loading post:', error);
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        loadPost()

        async function setPostTags() {
            const { success, data } = await getPostTags()
            setTags(data)
        }
        setPostTags()
    }, [route])


    const onTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) setTime(selectedTime);
    };

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) setDate(selectedDate);
    };

    const handleChoice = (topic: string) => {
        setSelectedTopics(prevSelectedTopics => {
            if (prevSelectedTopics.includes(topic)) {
                return prevSelectedTopics.filter(item => item !== topic);
            } else if (prevSelectedTopics.length < 5) {
                return [...prevSelectedTopics, topic];
            } else {
                return prevSelectedTopics;
            }
        });
    };


    const handleCreatePost = async () => {
        const postData = {
            note,
            time,
            date,
            duration,
            location,
            selectedType,
            selectedTopics
        };

        const result = ((postIdToEdit !== undefined) && (postIdToEdit !==''))
            ? await updatePost(postIdToEdit, postData)
            : await createNewPost(postData);

        if (result.success) {
            resetInput();
            Alert.alert('Created!')
        } else {
            console.error('Error saving post:', result.error);
        }
    };

    function resetInput() {
        setNote('')
        setTime(new Date())
        setDate(new Date())
        setDuration(durationOpions[0])
        setLocation('Caffeine Harju')
        setSelectedType('Work')
        setSelectedTopics([])
    }

    function renderItem(array: string[]) {
        return array.map((el, i) => {
            return <InterestBubble
                value={el}
                key={i}
                onPress={() => handleChoice(el)}
                selected={selectedTopics}
            />
        })
    }

    function renderRadioButtons() {
        const labels = ['Work', 'Study'];
        return labels.map(label => (
            <ProfileButton
                key={label}
                onPress={() => setSelectedType(label)}
                selectedSection={selectedType}
                label={label}
            >
                <Text>{label}</Text>
            </ProfileButton>
        ));
    }

    function handleReset() {
        resetInput()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>New post</Text>

            <Text style={styles.label}>Note (description):</Text>
            <TextInput
                style={styles.textInput}
                value={note}
                onChangeText={setNote}
                placeholder="Enter your note here"
                multiline
            />

            <View style={styles.row}>
                <View style={styles.rowIconValueContainer}>
                    <Image
                        source={icons.calendar}
                        style={styles.icon}
                    />
                    <Text style={styles.label}>Time:</Text>
                </View>


                <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                    <Text style={styles.text}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </TouchableOpacity>
            </View>

            {showTimePicker && (
                <DateTimePicker
                    value={time}
                    mode="time"
                    display="spinner"
                    onChange={onTimeChange}
                />
            )}

            <View style={styles.row}>
                <View style={styles.rowIconValueContainer}>
                    <Image
                        source={icons.calendar}
                        style={styles.icon}
                        tintColor={theme.beige}
                    />
                    <Text style={styles.label}>Date:</Text>
                </View>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.text}>{date.toLocaleDateString()}</Text>
                </TouchableOpacity>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={onDateChange}
                />
            )}

            <View style={styles.row}>
                <View style={styles.rowIconValueContainer}>
                    <Image
                        source={icons.time}
                        style={styles.icon}
                    />
                    <Text style={styles.label}>Duration:</Text>
                </View>
                <DropDown options={durationOpions} onSelect={setDuration} />

            </View>

            <View style={styles.row}>
                <View style={styles.rowIconValueContainer}>
                    <Image
                        source={icons.location}
                        style={styles.icon}
                    />
                    <Text style={styles.label}>Location:</Text>
                </View>
                <TextInput
                    style={styles.text}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Enter location..."
                />
            </View>

            <View style={styles.row}>
                <View style={styles.rowIconValueContainer}>
                    <Image
                        source={icons.notes}
                        style={styles.icon}
                    />
                    <Text style={styles.label}>Type:</Text>
                </View>
                <View style={styles.typeContainer}>
                    {renderRadioButtons()}
                </View>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Topics:</Text>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.bubblesContainer}>
                    {renderItem(tags)}
                </View>
            </ScrollView>
            <View style={{alignItems: 'center'}}>
                <ButtonNoBg
                    label={'Reset'}
                    onPress={handleReset}
                />
            </View>

            <CustomButton onPress={handleCreatePost} type={'dark'}>
                <Text>Add Post</Text>
            </CustomButton>
        </View>
    );
};


const theme = useTheme()
const h = Dimensions.get("window").height
const BAR_WIDTH = StatusBar.currentHeight

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: BAR_WIDTH,
        padding: 20,
        backgroundColor: theme.beige,
    },
    header: {
        fontSize: 16,
        fontFamily: 'KiwiMaru-Medium',
        color: theme.coal,
        textAlign: 'center',
    },
    label: {
        fontSize: 20,
        fontFamily: 'KiwiMaru-Medium',
        color: theme.coal,
        marginBottom: 5,
    },
    textInput: {
        backgroundColor: theme.beige,
        borderColor: theme.cocao,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        height: 80,
        textAlignVertical: 'top',
        color: '#5F3E36',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 5,
    },
    rowIconValueContainer: {
        flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        color: '#5F3E36',
    },
    typeContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    typeButton: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#D1B5A6',
    },
    activeType: {
        backgroundColor: '#5F3E36',
    },
    typeText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    topicContainer: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
    },
    topicTag: {
        backgroundColor: '#D1B5A6',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
    },
    topicText: {
        color: '#5F3E36',
        fontSize: 14,
    },
    postButton: {
        backgroundColor: '#5F3E36',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    postButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },

    scrollView: {
        maxHeight: h / 2
    },
    bubblesContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
});

export default AddPostScene;


// TODO:
// Dont let user go futher before he filled data
// Add tags to registration
// Add geopositioning
// 
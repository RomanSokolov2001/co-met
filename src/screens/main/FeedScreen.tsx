import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, RefreshControl, ActivityIndicator, View, StatusBar } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import { useTheme } from '../../hooks/useTheme';
import PageHeader from '../../components/PageHeader';
import Post from '../../components/Post';
import { fetchPosts, getFilteredPosts } from '../../services/FirestoreService';
import { useProfile } from '../../wrappers/ProfileContext';


const feedOptions = ['Happening soon', 'Local feed', 'Favourite topics']

const FeedScreen = () => {
    const [posts, setPosts] = useState([]);
    const [selectedFeed, setSelectedFeed] = useState(feedOptions[0])
    const navigation = useNavigation();
    const { profile } = useProfile()

    useFocusEffect(() => {
        StatusBar.setBackgroundColor("rgba(0, 0, 0, 0)")
        StatusBar.setTranslucent(true);
    },)

    useEffect(() => {
        const loadPosts = async () => {
            try {
                if (selectedFeed == 'Local feed' && (profile && profile.location)) {
                    const { result, data } = await getFilteredPosts({ location: profile.location })
                    setPosts(data)
                }
                if (selectedFeed == 'Favourite topics') {
                    var userTags
                    if (profile?.professionalInterests.length > 0 || profile.personalInterests.length > 0 ) {
                        userTags = profile?.personalInterests
                        userTags.concat(profile.professionalInterests)
                    } else {
                        userTags = ['empty']
                    }
                    const { result, data } = await getFilteredPosts({ tags: userTags })
                    setPosts(data)
                } else if (selectedFeed == 'Happening soon') {
                    const fetchedPosts = await fetchPosts();
                    setPosts(fetchedPosts);
                }
            } catch (error) {
                console.error('Error loading posts:', error);
            }
        };
        loadPosts()


    }, [selectedFeed])


    return (
        <View style={styles.container}>
            <PageHeader options={feedOptions} onSelect={setSelectedFeed} />
            <ScrollView>
                {posts.map(post => (
                    <Post
                        key={post.id}
                        post={post}
                        onViewProfile={() => navigation.navigate('PostOwnerProfile', { userId: post.userId })}
                    />
                ))}
            </ScrollView>
        </View>
    );
};


const theme = useTheme()
const BAR_WIDTH = StatusBar.currentHeight

const styles = StyleSheet.create({
    container: {
        paddingTop: BAR_WIDTH,
        width: '100%',
        height: '100%',
        backgroundColor: theme.beige,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FeedScreen;
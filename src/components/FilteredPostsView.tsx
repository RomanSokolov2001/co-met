import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, RefreshControl, ActivityIndicator, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import { useTheme } from '../hooks/useTheme';
import { getFilteredPosts } from '../services/FirestoreService';
import Post from './Post';


const feedOptions = ['Local feed', 'Happening soon', 'Favourite topics']


interface FilteredPostViewProps {
    userId: string
    location: string
    tags: string[]
    isViewedFromProfile: boolean
    isOwnPost: boolean
    setPostId: () => void
}

const FilteredPostsView = ({ userId, location, tags, isViewedFromProfile, isOwnPost, setPostId }:FilteredPostViewProps) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedFeed, setSelectedFeed] = useState(feedOptions[0])
    const theme = useTheme();
    const navigation = useNavigation();

    useEffect(() => {
        loadPosts()
    }, [location, tags])

    const loadPosts = async () => {
        if (location !== '' || (tags && tags.length > 0) || userId) {
            try {
                var result
                if (userId) {
                    result = await getFilteredPosts({ userId })
                } else if (location !== '' || (tags && tags.length > 0)) {
                    result = await getFilteredPosts({ location, tags })
                }
                setPosts(result?.data)

            } catch (error) {
                console.error('Error loading posts:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false)
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadPosts();
        setRefreshing(false);
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadPosts();
            return () => {
            };
        }, [])
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.coal} />
                </View>
            </View>
        );
    }

    if (!posts) return

    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {posts.map(post => (
                    <Post
                        key={post.id}
                        post={post}
                        onViewProfile={() => navigation.navigate('PostOwnerProfile', { userId: post.userId })}
                        isViewedFromProfile={isViewedFromProfile}
                        isOwnPost={isOwnPost}
                        setPostId={setPostId}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const theme = useTheme()

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.beige,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 20
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FilteredPostsView;
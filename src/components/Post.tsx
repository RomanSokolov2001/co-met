import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { icons } from '../utils/icons';
import ButtonNoBg from './buttons/ButtonNoBg';
import { formatTimeAgo } from '../utils/utilFunctions';
import { useNavigation } from '@react-navigation/native';


interface Post {
    userLocation: string
    userPhotoURL: string
    userDisplayName: string
    location: string
    createdAt: Date
    time: Date
    date: Date
    duration: string
    note: string
    topics: string[]
    type: string
}

interface PostProps {
    onViewProfile: () => void
    isViewedFromProfile: boolean
    post: Post
    isOwnPost: boolean
    setPostId: (id: string) => void
}

const Post = ({ post, onViewProfile, isOwnPost, isViewedFromProfile, setPostId }: PostProps) => {
    const navigation = useNavigation()

    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.round}>
                        {post.userPhotoURL &&
                            <Image
                                source={{ uri: post?.userPhotoURL }}
                                style={[styles.avatar, styles.round]}
                            />
                        }
                    </View>

                    <View>
                        <Text style={styles.title}>
                            {post.userDisplayName}
                        </Text>
                        <View style={styles.postTimeLocationField}>
                            <Image
                                source={icons.world}
                                style={styles.iconWorldwide}
                            />
                            <Text style={styles.text}>
                                {post.userLocation}
                            </Text>
                            <Image
                                source={icons.dot}
                                style={styles.dot}
                                tintColor={theme.coal}
                            />
                            <Text style={styles.text}>
                                {formatTimeAgo(post.createdAt)}
                            </Text>
                        </View>
                    </View>
                </View>
                {isOwnPost &&
                    <View style={styles.editBinIconsContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('AddPost', {postId: post.id })}>
                            <View style={{ padding: 5 }}>
                                <Image
                                    source={icons.edit}
                                    style={{ width: 35, height: 35, alignSelf: 'center' }}
                                    tintColor={theme.coal}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setPostId(post.id)}>
                            <View style={{ padding: 7 }}>
                                <Image
                                    source={icons.bin}
                                    style={{ width: 30, height: 30, alignSelf: 'center' }}
                                    tintColor={'#ad1c1c'}
                                />
                            </View>
                        </TouchableOpacity>

                    </View>
                }

            </View>
            <View style={styles.postInfo}>
                <View style={styles.postInfoValue}>
                    <Image
                        source={icons.calendar}
                        style={styles.iconInfo}
                    />
                    <Text style={styles.text}>
                        {new Date(post.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},
                        {new Date(post.date).toLocaleDateString()}
                    </Text>
                </View>

                <View style={styles.postInfoValue}>
                    <Image
                        source={icons.time}
                        style={styles.iconInfo}
                    />
                    <Text style={styles.text}>
                        {post.duration}
                    </Text>
                </View>
                <View style={styles.postInfoValue}>
                    <Image
                        source={icons.location}
                        style={styles.iconInfo}
                    />
                    <Text style={styles.text}>
                        {post.location}
                    </Text>
                </View>
                <View style={styles.postInfoValue}>
                    <Image
                        source={icons.notes}
                        style={styles.iconInfo}
                    />
                    <Text style={styles.text}>
                        {post.type}
                    </Text>
                </View>
            </View>

            <View style={styles.line} />

            <View style={styles.postDesctiption}>
                <Text style={styles.descriptionValue}>Note:</Text>
                <Text numberOfLines={3} style={styles.postDescriptionText}>
                    {post.note}
                </Text>
            </View>

            <View style={styles.line} />

            <View style={styles.postDesctiption}>
                <Text style={styles.descriptionValue}>Topics:</Text>
                <Text style={styles.postDescriptionText}>
                    {post.topics.join(', ')}
                </Text>
            </View>
            <View style={styles.btnContainer}>
                {!isViewedFromProfile &&
                    <ButtonNoBg label={'View profile'} onPress={onViewProfile} />
                }
            </View>
        </View>
    );
};

export default Post


const roundSize = 50
const w = Dimensions.get('screen').width
const theme = useTheme();

const styles = StyleSheet.create({
    postContainer: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: theme.cocao,
        paddingVertical: 10
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    avatar: {
        width: roundSize - 1,
        height: roundSize - 1,
        borderRadius: 100,
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
        marginHorizontal: 10,
        justifyContent: 'center',

    },
    title: {
        fontFamily: 'KiwiMaru-Medium',
        fontSize: 16,
        color: theme.coal
    },
    postTimeLocationField: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconWorldwide: {
        width: 15,
        height: 15,
        alignSelf: 'center',
        marginRight: 5,
    },
    icon: {
        width: 25,
        height: 25,
        alignSelf: 'center',
    },
    dot: {
        width: 25,
        height: 25,
        alignSelf: 'center',
    },
    postInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    iconInfo: {
        width: 25,
        height: 25,
    },
    editBinIconsContainer: {
        flexDirection: 'row',
    },
    postInfoValue: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    text: {
        fontFamily: 'RaleWay-Medium',
        fontSize: 13,

    },
    postDesctiption: {
        padding: 10,
        flexDirection: 'row',
    },
    postDescriptionText: {
        fontFamily: 'RaleWay-Medium',
        fontSize: 14,
        paddingTop: 2,
        paddingLeft: 5,
        width: w - 60
    },
    descriptionValue: {
        fontFamily: 'KiwiMaru-Medium',
        fontSize: 14,
        color: theme.coal,
        alignSelf: 'flex-start'
    },
    line: {
        width: '95%',
        borderWidth: 0.9,
        borderColor: theme.cocao,
        alignSelf: 'center'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})
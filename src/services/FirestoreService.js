import { auth, db, storage } from '../../firebaseConfig';
import { doc, setDoc, updateDoc, getDoc, serverTimestamp, addDoc, collection, query, where, orderBy, limit, getDocs, deleteDoc } from '@firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from '@firebase/storage';
import { deleteUser } from 'firebase/auth';

import { hasCommonElements } from '../utils/utilFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const updateUserProfile = async (profileData) => {
    const userId = auth.currentUser?.uid;
    var photoURL
    try {
        if (profileData.imageUri) {
            const imageRef = ref(storage, `user-profile-pictures/${userId}`);
            const response = await fetch(profileData.imageUri);
            const blob = await response.blob();
            await uploadBytes(imageRef, blob);
            photoURL = await getDownloadURL(imageRef);
        }
        const updateData = {
            email: profileData.email,
            location: profileData.location,
            occupation: profileData.occupation,
            fieldOfWork: profileData.fieldOfWork,
            workplace: profileData.workplace,
            professionalInterests: profileData.professionalInterests,
            personalInterests: profileData.personalInterests,
            bio: profileData.bio,
            completedProfile: true,
            email: auth.currentUser?.email,
            updatedAt: new Date().toISOString()
        };

        if (photoURL) {
            updateData.photoURL = photoURL;
        }

        await updateDoc(doc(db, 'users', userId), updateData);

        return {
            success: true,
            message: 'Profile completed successfully',
            updateData
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

export const getUserProfile = async (usedId) => {
    try {
        var uid
        if (usedId) {
            uid = usedId
        } else {
            uid = auth.currentUser?.uid;
        }
        if (!uid) {
            throw new Error('No authenticated user found');
        }

        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            throw new Error('User profile not found');
        }

        const userData = userDoc.data();
        return {
            success: true,
            data: userData
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

export const getUserInfo = async (id) => {
    try {
        const docRef = doc(db, 'users', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw new Error('Post not found');
        }

        return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
        console.error('Error getting user info:', error);
        throw error;
    }
};

export const deleteUserAccount = async () => {
    const user = auth.currentUser;

    if (user) {
        try {
            await AsyncStorage.removeItem('@profile_status');
            await deleteUser(user);
            try {
                await deleteObject(ref(storage, `user-profile-pictures/${user.uid}`))
            } catch (error) {
                console.error(`No user profile photo found: ${error}`)
            }
            await deleteDoc(doc(db, 'users', user.uid));
            console.log('User account and associated data deleted successfully.');
        } catch (error) {
            console.error('Error deleting user account:', error);
            throw error;
        }
    } else {
        console.error('No user is currently signed in.');
    }
};

export const getPostById = async (postId) => {
    try {
        const postRef = doc(db, 'posts', postId);
        const postSnapshot = await getDoc(postRef);

        if (!postSnapshot.exists()) {
            return {
                success: false,
                error: 'Post not found'
            };
        }

        return {
            success: true,
            data: {
                id: postSnapshot.id,
                ...postSnapshot.data()
            }
        };
    } catch (error) {
        console.error('Error fetching post:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

export const updatePost = async (postId, postData) => {
    try {
        console.log('updated')
        const postRef = doc(db, 'posts', postId);

        const updateData = {
            note: postData.note,
            time: postData.time.toISOString(),
            date: postData.date.toISOString(),
            duration: postData.duration,
            location: postData.location,
            type: postData.selectedType,
            topics: postData.selectedTopics,
            updatedAt: serverTimestamp(),
        };

        await updateDoc(postRef, updateData);

        return {
            success: true,
            message: 'Post updated successfully'
        };
    } catch (error) {
        console.error('Error updating post:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

export const createNewPost = async (postData) => {
    try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
            throw new Error('User not authenticated');
        }

        // Get user info to include in the post
        const userInfo = await getUserInfo(userId);

        const postToAdd = {
            userId,
            userDisplayName: userInfo.displayName || 'Anonymous',
            userPhotoURL: userInfo.photoURL || null,
            userLocation: userInfo.location || "",
            note: postData.note,
            time: postData.time.toISOString(),
            date: postData.date.toISOString(),
            duration: postData.duration,
            location: postData.location,
            type: postData.selectedType,
            topics: postData.selectedTopics,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            status: 'active',

        };

        const docRef = await addDoc(collection(db, 'posts'), postToAdd);

        return {
            success: true,
            postId: docRef.id,
            message: 'Post created successfully'
        };
    } catch (error) {
        console.error('Error creating post:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

export const fetchPosts = async (limitCount = 20) => {
    try {
        const postsQuery = query(
            collection(db, 'posts'),
            where('status', '==', 'active'),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        );

        const querySnapshot = await getDocs(postsQuery);
        const posts = [];

        for (const doc of querySnapshot.docs) {
            const postData = doc.data();

            posts.push({
                id: doc.id,
                ...postData,
            });
        }

        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

// Claude AI
export const getFilteredPosts = async ({
    userId = null,
    location = null,
    tags = null
}) => {
    try {
        let conditions = [
            where('status', '==', 'active')
        ];

        if (userId !== null) {
            conditions.push(where('userId', '==', userId));
        }

        if (location) {
            conditions.push(where('userLocation', '==', location));
        }

        let postsQuery = query(
            collection(db, 'posts'),
            ...conditions,
            orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(postsQuery);
        const posts = [];

        for (const doc of querySnapshot.docs) {
            const postData = doc.data();

            if (tags && (tags.length > 0)) {
                if (hasCommonElements(postData.topics, tags)) {
                    posts.push({
                        id: doc.id,
                        ...postData,
                    });
                }
            } else {
                posts.push({
                    id: doc.id,
                    ...postData,
                });
            }

        }

        return {
            success: true,
            data: posts
        };
    } catch (error) {
        console.error('Error fetching filtered posts:', error);
        return {
            success: false,
            error: error.message,
            data: []
        };
    }
};

export const deletePost = async (postId) => {
    try {
        const postRef = doc(db, 'posts', postId);
        const postSnapshot = await getDoc(postRef);

        if (!postSnapshot.exists()) {
            return {
                success: false,
                error: 'Post not found'
            };
        }

        await updateDoc(postRef, {
            status: 'deleted',
            updatedAt: serverTimestamp()
        });

        return {
            success: true,
            message: 'Post deleted successfully'
        };
    } catch (error) {
        console.error('Error deleting post:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// < ------------------ T A G S ------------------ >

export const getPersonalTags = async () => {
    try {
        const tagDocRef = doc(db, 'tags', 'personal-tags');
        const tagDoc = await getDoc(tagDocRef);

        if (!tagDoc.exists()) {
            throw new Error('Personal tags document not found');
        }

        return {
            success: true,
            data: tagDoc.data().arr || []
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

export const getProfessionalTags = async () => {
    try {
        const tagDocRef = doc(db, 'tags', 'professional-tags');
        const tagDoc = await getDoc(tagDocRef);

        if (!tagDoc.exists()) {
            throw new Error('Professional tags document not found');
        }

        return {
            success: true,
            data: tagDoc.data().arr || []
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

export const getPostTags = async () => {
    try {
        const tagDocRef = doc(db, 'tags', 'post-tags');
        const tagDoc = await getDoc(tagDocRef);

        if (!tagDoc.exists()) {
            throw new Error('Post tags document not found');
        }

        return {
            success: true,
            data: tagDoc.data().arr || []
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};
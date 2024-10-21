import { auth, db, storage } from '../../firebaseConfig';
import { doc, setDoc, updateDoc, getDoc } from '@firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';


export const completeUserProfile = async (userId, profileData) => {
    try {
        let photoURL = null;

        if (profileData.imageUri) {
            const imageRef = ref(storage, `user-profile-pictures/${userId}`);
            const response = await fetch(profileData.imageUri);
            const blob = await response.blob();
            await uploadBytes(imageRef, blob);
            photoURL = await getDownloadURL(imageRef);
        }

        await updateDoc(doc(db, 'users', userId), {
            location: profileData.location,
            occupation: profileData.occupation,
            fieldOfWork: profileData.fieldOfWork,
            workplace: profileData.workplace,
            professionalInterests: profileData.professionalInterests,
            personalInterests: profileData.personalInterests,
            bio: profileData.bio,
            photoURL,
            profileCompleted: true,
            updatedAt: new Date().toISOString()
        });

        return {
            success: true,
            message: 'Profile completed successfully'
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
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    onAuthStateChanged
} from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { doc, setDoc } from '@firebase/firestore';


export const registerUser = async ({ email, password, displayName, dob }) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, 'users', userCredential.user.uid), {
            email,
            displayName,
            dob: dob.toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        return {
            success: true,
            user: userCredential.user,
            message: 'Registration successful'
        };
    } catch (error) {
        return {
            success: false,
            error: handleAuthError(error)
        };
    }
};

export const loginUser = async ({ email, password }) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return {
            success: true,
            user: userCredential.user,
            message: 'Login successful'
        };
    } catch (error) {
        return {
            success: false,
            error: handleAuthError(error)
        };
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
        return {
            success: true,
            message: 'Logout successful'
        };
    } catch (error) {
        return {
            success: false,
            error: handleAuthError(error)
        };
    }
};

export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return {
            success: true,
            message: 'Password reset email sent'
        };
    } catch (error) {
        return {
            success: false,
            error: handleAuthError(error)
        };
    }
};

export const subscribeToAuthChanges = (callback) => {
    return onAuthStateChanged(auth, (user) => {
        callback(user);
    });
};

const handleAuthError = (error) => {
    switch (error.code) {
        case 'auth/email-already-in-use':
            return 'This email is already registered';
        case 'auth/invalid-email':
            return 'Invalid email address';
        case 'auth/operation-not-allowed':
            return 'Operation not allowed';
        case 'auth/weak-password':
            return 'Please use a stronger password';
        case 'auth/user-disabled':
            return 'This account has been disabled';
        case 'auth/user-not-found':
            return 'No account found with this email';
        case 'auth/wrong-password':
            return 'Incorrect password';
        default:
            return 'An error occurred during authentication';
    }
};
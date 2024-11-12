// src/services/__tests__/auth.test.ts
import {
    registerUser,
    loginUser,
    logoutUser,
    resetPassword,
    subscribeToAuthChanges
  } from '../AuthService';
  
  // Mocking Firebase functions
  import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
  import { doc, setDoc } from '@firebase/firestore';
  
  jest.mock('firebase/auth', () => ({
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
    onAuthStateChanged: jest.fn(),
  }));
  
  jest.mock('@firebase/firestore', () => ({
    doc: jest.fn(() => ({ path: 'users/123' })),  // Mock returning a non-empty reference
    setDoc: jest.fn(),
  }));
  
  jest.mock('../../../firebaseConfig', () => ({
    auth: {},
    db: {},
  }));

  describe('registerUser', () => {
    it('should register a user and create a Firestore document', async () => {
      const mockUserCredential = { user: { uid: '123' } };
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);
      (setDoc as jest.Mock).mockResolvedValue(undefined);
  
      const result = await registerUser({
        email: 'test@example.com',
        password: 'password123',
        displayName: 'Test User',
        dob: new Date('1990-01-01')
      });
  
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.any(Object), 'test@example.com', 'password123');
      expect(setDoc).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          email: 'test@example.com',
          displayName: 'Test User',
          dob: '1990-01-01T00:00:00.000Z'  // If checking specific DOB
        })
      );
      
      expect(result).toEqual({
        success: true,
        user: mockUserCredential.user,
        message: 'Registration successful'
      });
    });
  
    it('should handle registration errors', async () => {
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue({ code: 'auth/email-already-in-use' });
  
      const result = await registerUser({
        email: 'test@example.com',
        password: 'password123',
        displayName: 'Test User',
        dob: new Date('1990-01-01')
      });
  
      expect(result).toEqual({
        success: false,
        error: 'This email is already registered'
      });
    });
  });
  
  describe('loginUser', () => {
    it('should log in a user successfully', async () => {
      const mockUserCredential = { user: { uid: '123' } };
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);
  
      const result = await loginUser({ email: 'test@example.com', password: 'password123' });
  
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.any(Object), 'test@example.com', 'password123');
      expect(result).toEqual({
        success: true,
        user: mockUserCredential.user,
        message: 'Login successful'
      });
    });
  
    it('should handle login errors', async () => {
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValue({ code: 'auth/wrong-password' });
  
      const result = await loginUser({ email: 'test@example.com', password: 'wrongpassword' });
  
      expect(result).toEqual({
        success: false,
        error: 'Incorrect password'
      });
    });
  });

  describe('logoutUser', () => {
    it('should log out a user successfully', async () => {
      (signOut as jest.Mock).mockResolvedValue(undefined);
  
      const result = await logoutUser();
  
      expect(signOut).toHaveBeenCalledWith(expect.any(Object));
      expect(result).toEqual({
        success: true,
        message: 'Logout successful'
      });
    });
  
    it('should handle logout errors', async () => {
      (signOut as jest.Mock).mockRejectedValue(new Error('Logout failed'));
  
      const result = await logoutUser();
  
      expect(result).toEqual({
        success: false,
        error: 'An error occurred during authentication'
      });
    });
  });

  describe('resetPassword', () => {
    it('should send a password reset email', async () => {
      (sendPasswordResetEmail as jest.Mock).mockResolvedValue(undefined);
  
      const result = await resetPassword('test@example.com');
  
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(expect.any(Object), 'test@example.com');
      expect(result).toEqual({
        success: true,
        message: 'Password reset email sent'
      });
    });
  
    it('should handle password reset errors', async () => {
      (sendPasswordResetEmail as jest.Mock).mockRejectedValue({ code: 'auth/user-not-found' });
  
      const result = await resetPassword('nonexistent@example.com');
  
      expect(result).toEqual({
        success: false,
        error: 'No account found with this email'
      });
    });
  });

  describe('subscribeToAuthChanges', () => {
    it('should call callback with user on auth state change', () => {
      const mockUser = { uid: '123' };
      const callback = jest.fn();
      (onAuthStateChanged as jest.Mock).mockImplementation((auth, cb) => {
        cb(mockUser);
      });
  
      subscribeToAuthChanges(callback);
  
      expect(callback).toHaveBeenCalledWith(mockUser);
    });
  });
  
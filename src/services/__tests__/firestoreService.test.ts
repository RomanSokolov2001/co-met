// src/services/__tests__/firestoreService.test.ts

import {
    updateUserProfile,
    getUserProfile,
    getUserInfo,
    deleteUserAccount,
    getPostById,
    updatePost,
    createNewPost,
    fetchPosts,
    getFilteredPosts,
    deletePost,
    getPersonalTags,
    getProfessionalTags,
    getPostTags,
  } from '../firestoreService';
  import { auth, db, storage } from '../../../firebaseConfig';
  import { 
    doc, setDoc, updateDoc, getDoc, serverTimestamp, addDoc, collection, query, where, orderBy, limit, getDocs, deleteDoc 
  } from '@firebase/firestore';
  import { ref, uploadBytes, getDownloadURL, deleteObject } from '@firebase/storage';
  import { deleteUser } from 'firebase/auth';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  jest.mock('../../../firebaseConfig', () => ({
    auth: { currentUser: { uid: 'testUserId', email: 'test@example.com' } },
    db: {},
    storage: {},
  }));
  
  jest.mock('@firebase/firestore', () => ({
    doc: jest.fn(),
    setDoc: jest.fn(),
    updateDoc: jest.fn(),
    getDoc: jest.fn(),
    serverTimestamp: jest.fn(),
    addDoc: jest.fn(),
    collection: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    orderBy: jest.fn(),
    limit: jest.fn(),
    getDocs: jest.fn(),
    deleteDoc: jest.fn(),
  }));
  
  jest.mock('@firebase/storage', () => ({
    ref: jest.fn(),
    uploadBytes: jest.fn(),
    getDownloadURL: jest.fn(),
    deleteObject: jest.fn(),
  }));
  
  jest.mock('firebase/auth', () => ({
    deleteUser: jest.fn(),
  }));
  
  jest.mock('@react-native-async-storage/async-storage', () => ({
    removeItem: jest.fn(),
  }));
  
  describe('Firestore Service', () => {
    // Existing tests...
  
    describe('getFilteredPosts', () => {
      it('should retrieve filtered posts', async () => {
        const mockPosts = [{ id: '1', data: () => ({ note: 'Test post 1' }) }];
        (getDocs as jest.Mock).mockResolvedValueOnce(mockPosts);
  
        const result = await getFilteredPosts({ tag: 'testTag' });
  
        expect(result.success).toBe(true);
        expect(result.data).toEqual(mockPosts.map(post => post.data()));
      });
  
      it('should handle errors in retrieving filtered posts', async () => {
        (getDocs as jest.Mock).mockRejectedValueOnce(new Error('Failed to retrieve filtered posts'));
  
        const result = await getFilteredPosts({ tag: 'testTag' });
  
        expect(result.success).toBe(false);
        expect(result.error).toBe('Failed to retrieve filtered posts');
      });
    });
  
    describe('fetchPosts', () => {
      it('should successfully fetch posts', async () => {
        const mockPosts = [{ id: '1', data: () => ({ note: 'Test post 1' }) }];
        (getDocs as jest.Mock).mockResolvedValueOnce(mockPosts);
  
        const result = await fetchPosts();
  
        expect(result.success).toBe(true);
        expect(result.data).toEqual(mockPosts.map(post => post.data()));
      });
  
      it('should handle errors in fetching posts', async () => {
        (getDocs as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch posts'));
  
        const result = await fetchPosts();
  
        expect(result.success).toBe(false);
        expect(result.error).toBe('Failed to fetch posts');
      });
    });
  
    describe('getProfessionalTags', () => {
      it('should retrieve professional tags', async () => {
        (getDoc as jest.Mock).mockResolvedValueOnce({ data: () => ({ arr: ['proTag1', 'proTag2'] }) });
  
        const result = await getProfessionalTags();
  
        expect(result.success).toBe(true);
        expect(result.data).toEqual(['proTag1', 'proTag2']);
      });
  
      it('should handle errors in retrieving professional tags', async () => {
        (getDoc as jest.Mock).mockRejectedValueOnce(new Error('Failed to retrieve professional tags'));
  
        const result = await getProfessionalTags();
  
        expect(result.success).toBe(false);
        expect(result.error).toBe('Failed to retrieve professional tags');
      });
    });
  
    describe('getPostTags', () => {
      it('should retrieve post tags', async () => {
        (getDoc as jest.Mock).mockResolvedValueOnce({ data: () => ({ arr: ['postTag1', 'postTag2'] }) });
  
        const result = await getPostTags();
  
        expect(result.success).toBe(true);
        expect(result.data).toEqual(['postTag1', 'postTag2']);
      });
  
      it('should handle errors in retrieving post tags', async () => {
        (getDoc as jest.Mock).mockRejectedValueOnce(new Error('Failed to retrieve post tags'));
  
        const result = await getPostTags();
  
        expect(result.success).toBe(false);
        expect(result.error).toBe('Failed to retrieve post tags');
      });
    });
  
    // Continue adding tests for other functions if needed
  });
  
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
    ...jest.requireActual('@firebase/firestore'),
    getDocs: jest.fn(() => ({
      docs: [{ id: 'post1', data: jest.fn(() => ({ note: 'Post 1' })) }],
    })),
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
    describe('updateUserProfile', () => {
        it('should successfully update a user profile', async () => {
          const profileData = { email: 'test@example.com', imageUri: 'https://example.com/image.png' };
          (uploadBytes as jest.Mock).mockResolvedValueOnce(undefined);
          (getDownloadURL as jest.Mock).mockResolvedValueOnce('https://example.com/download.png');
          (updateDoc as jest.Mock).mockResolvedValueOnce(undefined);
    
          const result = await updateUserProfile(profileData);
    
          expect(result.success).toBe(true);
          expect(result.message).toBe('Profile completed successfully');
          expect(updateDoc).toHaveBeenCalled();
        });
    
        it('should handle errors in updating a user profile', async () => {
          (updateDoc as jest.Mock).mockRejectedValueOnce(new Error('Failed to update'));
    
          const result = await updateUserProfile({ email: 'test@example.com' });
    
          expect(result.success).toBe(false);
          expect(result.error).toBe('Failed to update');
        });
      });
    
      describe('getUserProfile', () => {
        it('should retrieve a user profile successfully', async () => {
          const mockUserProfile = { data: () => ({ email: 'test@example.com', imageUri: 'https://example.com/image.png' }) };
          (getDoc as jest.Mock).mockResolvedValueOnce(mockUserProfile);
      
          const result = await getUserProfile('testUserId');
      
          expect(result.success).toBe(true);
          expect(result.data).toEqual(mockUserProfile.data());
        });
      
        it('should handle errors in retrieving a user profile', async () => {
          (getDoc as jest.Mock).mockRejectedValueOnce(new Error('Profile not found'));
      
          const result = await getUserProfile('testUserId');
      
          expect(result.success).toBe(false);
          expect(result.error).toBe('Profile not found');
        });
      });
      
    
      describe('deleteUserAccount', () => {
        it('should delete a user account and associated data', async () => {
          (deleteUser as jest.Mock).mockResolvedValueOnce(undefined);
          (deleteObject as jest.Mock).mockResolvedValueOnce(undefined);
          (deleteDoc as jest.Mock).mockResolvedValueOnce(undefined);
    
          await deleteUserAccount();
    
          expect(deleteUser).toHaveBeenCalledWith(auth.currentUser);
          expect(deleteDoc).toHaveBeenCalled();
          expect(deleteObject).toHaveBeenCalled();
        });
    
        it('should handle errors in deleting a user account', async () => {
          (deleteUser as jest.Mock).mockRejectedValueOnce(new Error('Failed to delete user'));
    
          await expect(deleteUserAccount()).rejects.toThrow('Failed to delete user');
        });
      });
    
      describe('createNewPost', () => {
        it('should successfully create a new post', async () => {
          const postData = { note: 'Test note', time: new Date(), date: new Date() };
          (addDoc as jest.Mock).mockResolvedValueOnce({ id: 'postId123' });
    
          const result = await createNewPost(postData);
    
          expect(result.success).toBe(true);
          expect(result.postId).toBe('postId123');
          expect(addDoc).toHaveBeenCalled();
        });
    
        it('should handle errors in creating a new post', async () => {
          (addDoc as jest.Mock).mockRejectedValueOnce(new Error('Failed to create post'));
    
          const result = await createNewPost({ note: 'Test note' });
    
          expect(result.success).toBe(false);
          expect(result.error).toBe('Failed to create post');
        });
      });
    
      describe('getPostById', () => {
        it('should retrieve a post by ID', async () => {
          const mockPostData = { data: () => ({ note: 'Test post' }) };
          (getDoc as jest.Mock).mockResolvedValueOnce(mockPostData);
    
          const result = await getPostById('postId123');
    
          expect(result.success).toBe(true);
          expect(result.data).toEqual(mockPostData.data());
        });
    
        it('should return an error if the post is not found', async () => {
          (getDoc as jest.Mock).mockResolvedValueOnce({ exists: () => false });
    
          const result = await getPostById('nonExistentPostId');
    
          expect(result.success).toBe(false);
          expect(result.error).toBe('Post not found');
        });
      });
    
      describe('getPersonalTags', () => {
        it('should retrieve personal tags', async () => {
          (getDoc as jest.Mock).mockResolvedValueOnce({ data: () => ({ arr: ['tag1', 'tag2'] }) });
    
          const result = await getPersonalTags();
    
          expect(result.success).toBe(true);
          expect(result.data).toEqual(['tag1', 'tag2']);
        });
    
        it('should handle errors in retrieving personal tags', async () => {
          (getDoc as jest.Mock).mockRejectedValueOnce(new Error('Failed to retrieve tags'));
    
          const result = await getPersonalTags();
    
          expect(result.success).toBe(false);
          expect(result.error).toBe('Failed to retrieve tags');
        });
      });
  
      describe('fetchPosts', () => {
        it('should fetch posts with a default limit', async () => {
          const mockPostsData = [
            { id: 'post1', data: () => ({ note: 'Post 1', status: 'active' }) },
            { id: 'post2', data: () => ({ note: 'Post 2', status: 'active' }) },
          ];
          (getDocs as jest.Mock).mockResolvedValueOnce({ docs: mockPostsData });
    
          const result = await fetchPosts();
    
          expect(result).toHaveLength(2);
          expect(result[0].id).toBe('post1');
          expect(result[1].id).toBe('post2');
          expect(getDocs).toHaveBeenCalled();
        });
    
        it('should handle errors when fetching posts', async () => {
          (getDocs as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch posts'));
    
          await expect(fetchPosts()).rejects.toThrow('Failed to fetch posts');
        });
      });
    
      describe('getProfessionalTags', () => {
        it('should retrieve professional tags successfully', async () => {
          const mockTagData = { data: () => ({ arr: ['Engineering', 'Marketing'] }) };
          (getDoc as jest.Mock).mockResolvedValueOnce(mockTagData);
    
          const result = await getProfessionalTags();
    
          expect(result.success).toBe(true);
          expect(result.data).toEqual(['Engineering', 'Marketing']);
        });
    
        it('should handle errors in retrieving professional tags', async () => {
          (getDoc as jest.Mock).mockRejectedValueOnce(new Error('Failed to retrieve professional tags'));
    
          const result = await getProfessionalTags();
    
          expect(result.success).toBe(false);
          expect(result.error).toBe('Failed to retrieve professional tags');
        });
      });
    
      describe('getPostTags', () => {
        it('should retrieve post tags successfully', async () => {
          const mockTagData = { data: () => ({ arr: ['Technology', 'Science'] }) };
          (getDoc as jest.Mock).mockResolvedValueOnce(mockTagData);
    
          const result = await getPostTags();
    
          expect(result.success).toBe(true);
          expect(result.data).toEqual(['Technology', 'Science']);
        });
    
        it('should handle errors in retrieving post tags', async () => {
          (getDoc as jest.Mock).mockRejectedValueOnce(new Error('Failed to retrieve post tags'));
    
          const result = await getPostTags();
    
          expect(result.success).toBe(false);
          expect(result.error).toBe('Failed to retrieve post tags');
        });
      });
    
    });
  
import { completeUserProfile, getUserInfo } from '../FirestoreService';
import { doc, updateDoc, getDoc } from '@firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';

jest.mock('@firebase/firestore', () => ({
  doc: jest.fn(),
  updateDoc: jest.fn(),
  getDoc: jest.fn(),
}));

jest.mock('@firebase/storage', () => ({
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(),
}));

jest.mock('../../../firebaseConfig', () => ({
  auth: {},
  db: {},
  storage: {},
}));

describe('FirestoreService', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('completeUserProfile', () => {
    it('should upload an image, update user profile, and return success', async () => {
      const mockUserId = '123';
      const profileData = {
        imageUri: 'https://example.com/profile.jpg',
        location: 'Tallinn',
        occupation: 'Developer',
        fieldOfWork: 'IT',
        workplace: 'EUAS',
        professionalInterests: ['AI', 'Blockchain'],
        personalInterests: ['Hiking', 'Reading'],
        bio: 'Passionate developer.',
      };

      const mockImageRef = {};
      const mockPhotoURL = 'https://example.com/downloaded_profile.jpg';

      (ref as jest.Mock).mockReturnValue(mockImageRef);
      globalThis.fetch = jest.fn(() =>
        Promise.resolve({
          blob: () => Promise.resolve(new Blob()),
        })
      ) as jest.Mock;
      (uploadBytes as jest.Mock).mockResolvedValue(undefined);
      (getDownloadURL as jest.Mock).mockResolvedValue(mockPhotoURL);
      
      const mockDocRef = { id: mockUserId };
      (doc as jest.Mock).mockReturnValue(mockDocRef);
      (updateDoc as jest.Mock).mockResolvedValue(undefined);
      const result = await completeUserProfile(mockUserId, profileData);

      expect(ref).toHaveBeenCalledWith(expect.any(Object), `user-profile-pictures/${mockUserId}`);
      expect(uploadBytes).toHaveBeenCalledWith(mockImageRef, expect.any(Blob));
      expect(getDownloadURL).toHaveBeenCalledWith(mockImageRef);
      expect(updateDoc).toHaveBeenCalledWith(
        mockDocRef,
        expect.objectContaining({
        location: 'Tallinn',
        occupation: 'Developer',
        fieldOfWork: 'IT',
        workplace: 'EUAS',
        professionalInterests: ['AI', 'Blockchain'],
        personalInterests: ['Hiking', 'Reading'],
        bio: 'Passionate developer.',
          photoURL: mockPhotoURL,
          profileCompleted: true,
          updatedAt: expect.any(String),
        })
      );

      expect(result).toEqual({
        success: true,
        message: 'Profile completed successfully',
      });
    });

    it('should handle errors in updating user profile', async () => {
      const mockUserId = '123';
      const profileData = { imageUri: null, bio: 'Bio without image' };

      (updateDoc as jest.Mock).mockRejectedValue(new Error('Firestore update failed'));
      const result = await completeUserProfile(mockUserId, profileData);
      expect(result).toEqual({
        success: false,
        error: 'Firestore update failed',
      });
    });
  });

  describe('getUserInfo', () => {
    it('should return user information if document exists', async () => {
      const mockUserId = '123';

      (doc as jest.Mock).mockReturnValue({});
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        id: mockUserId,
        data: () => ({
            location: 'Tallinn',
            occupation: 'Developer',
            fieldOfWork: 'IT',
            workplace: 'EUAS',
        }),
      });

      const result = await getUserInfo(mockUserId);
      expect(doc).toHaveBeenCalledWith(expect.any(Object), 'users', mockUserId);
      expect(result).toEqual({
        id: mockUserId,
        location: 'Tallinn',
        occupation: 'Developer',
        fieldOfWork: 'IT',
        workplace: 'EUAS',
      });
    });

    it('should throw an error if user document does not exist', async () => {
      const mockUserId = 'nonexistentUser';

      (doc as jest.Mock).mockReturnValue({});
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => false,
      });
      await expect(getUserInfo(mockUserId)).rejects.toThrow('Post not found');
    });

    it('should throw an error if getDoc fails', async () => {
      const mockUserId = '123';
      (doc as jest.Mock).mockReturnValue({});
      (getDoc as jest.Mock).mockRejectedValue(new Error('Firestore get failed'));

      await expect(getUserInfo(mockUserId)).rejects.toThrow('Firestore get failed');
    });
  });
});

import { createContext, useContext, useState, ReactNode } from 'react';


interface UserProfile {
  location: string;
  occupation: string;
  fieldOfWork: string;
  workplace: string;
  professionalInterests: string[];
  personalInterests: string[];
  bio: string;
  photoURL?: string;
  
}

interface ProfileContextType {
  profile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  updateProfile: (profileData: Partial<UserProfile>) => void;
}

const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  setUserProfile: () => {},
  updateProfile: () => {},
});

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const setUserProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  const updateProfile = (profileData: Partial<UserProfile>) => {
    console.log(profileData)

    setProfile(prev => {
      if (!prev) return profileData as UserProfile;
      return { ...prev, ...profileData };
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setUserProfile,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
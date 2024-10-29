import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import FeedScreen from "../screens/main/FeedScreen";
import AskBioAndPhotoScreen from "../screens/postRegistration/AskBioAndPhotoScreen";
import AskPersonalInfoScreen from "../screens/postRegistration/AskPersonalInfoScreen";
import AskPersonalInterestsScreen from "../screens/postRegistration/AskPersonalInterestsScreen";
import AskProfessionalInterestsScreen from "../screens/postRegistration/AskProfessionalInterestsScreen";



export const destinations = {
  auth: {
    welcome: {
      name: "Welcome",
      component: WelcomeScreen,
    },
    login: {
      name: "Login",
      component: LoginScreen,
    },
    signup: {
      name: "Signup",
      component: SignupScreen,
    },
  },
  postRegistration: {
    regStepOne: {
      name: "RegStepOne",
      component: AskPersonalInfoScreen,
    },
    regStepTwo: {
      name: "RegStepTwo",
      component: AskProfessionalInterestsScreen,
    },
    regStepThree: {
      name: "RegStepThree",
      component: AskPersonalInterestsScreen,
    },
    regStepFour: {
      name: "RegStepFour",
      component: AskBioAndPhotoScreen,
    },
  },
  main: {
    feeds: {
      name: "Feed",
      component: FeedScreen,
    },
  }
};


export type RegistrationStackParamList = {
  RegStepOne: undefined;
  RegStepTwo: {
    personalInfo: {
      location: string;
      occupation: string;
      fieldOfWork: string;
      workplace: string;
    };
  };
  RegStepThree: {
    personalInfo: {
      location: string;
      occupation: string;
      fieldOfWork: string;
      workplace: string;
    };
    professionalInterests: string[];
  };
  RegStepFour: {
    personalInfo: {
      location: string;
      occupation: string;
      fieldOfWork: string;
      workplace: string;
    };
    professionalInterests: string[];
    personalInterests: string[];
  };
  MainApp: undefined;
};

export type RegistrationScreenNavigationProp = NativeStackNavigationProp<
  RegistrationStackParamList
>;

export type RegStepTwoRouteProp = RouteProp<RegistrationStackParamList, 'RegStepTwo'>;
export type RegStepThreeRouteProp = RouteProp<RegistrationStackParamList, 'RegStepThree'>;
export type RegStepFourRouteProp = RouteProp<RegistrationStackParamList, 'RegStepFour'>;
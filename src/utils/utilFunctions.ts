import { StatusBar } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";


export function formatDateToCurrentLang(date: number | Date | undefined) {
  const locale = 'en-US';

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = new Intl.DateTimeFormat(locale, options).format(date ? new Date(date) : new Date());

  return formattedDate.replace(/^\w+,\s/, '');
}


export function pickImage(setImageUri: (arg0: string) => void) {
  launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
          setImageUri(response.assets[0].uri);
      }
  });
};

export const formatTimeAgo = (dateInput: Date | string | number): string => {
  if (!dateInput) return '';

  const now = new Date();
  
  // Convert the input into a Date object, if it's a string or number (timestamp)
  const date = new Date(dateInput);
  
  // If the date is invalid, return an empty string
  if (isNaN(date.getTime())) return '';

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString();
};



// Chat GPT Turbo
export function hasCommonElements(arr1: string[], arr2: string[]): boolean {
  const set1 = new Set(arr1);
  for (const item of arr2) {
      if (set1.has(item)) {
          return true;
      }
  }
  return false;
}
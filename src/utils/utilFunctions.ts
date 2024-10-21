import { StatusBar } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

export const loadStatusBar = (color: string) => {
  StatusBar.setBackgroundColor(color);
  StatusBar.setBarStyle("dark-content");
}

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
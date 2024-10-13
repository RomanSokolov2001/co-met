import { StatusBar } from "react-native";

export const loadStatusBar = (color: string) => {
  StatusBar.setBackgroundColor(color);
  StatusBar.setBarStyle("dark-content");
}

export function formatDateToCurrentLang(date: number | Date | undefined) {
  // const language = i18n.language;
  
  // const locales = {
  //   ee: 'et-EE',
  //   en: 'en-US',
  //   ru: 'ru-RU'
  // };

  // const locale = locales[language] || 'en-US';

  const locale = 'en-US';


  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const formattedDate = new Intl.DateTimeFormat(locale, options).format(date);

  return formattedDate.replace(/^\w+,\s/, '');
}
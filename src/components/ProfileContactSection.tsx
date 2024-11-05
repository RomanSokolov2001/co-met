import { StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native";
import { useTheme } from "../hooks/useTheme";


interface UserProfile {
  email: string
  phoneNumber: string
}

interface ContactSectionProps {
  userProfile: UserProfile
}

export default function ProfileContactSection({ userProfile }: ContactSectionProps) {
  if (!userProfile) return null;

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.title}>Email:</Text>
      <TouchableOpacity >
        <Text style={[styles.text, userProfile.email && styles.linkText]}>
          {userProfile.email || 'Not provided'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


const theme = useTheme();

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 20
  },
  title: {
    marginTop: 10,
    marginBottom: 4,
    fontFamily: 'KiwiMaru-Medium',
    fontSize: 16,
    color: theme.coal
  },
  text: {
    color: theme.coal,
    fontSize: 12
  },
  linkText: {
    color: theme.coal,
  }
});
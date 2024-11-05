import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";


interface UserProfile {
  email: string
  phoneNumber: string
  bio: string
  occupation: string
  workplace: string
  fieldOfWork: string
  professionalInterests: string[]
  personalInterests: string[]
}

interface InfoSectionProps {
  userProfile: UserProfile
}


export default function ProfileInfoSection({ userProfile }: InfoSectionProps) {
  if (!userProfile) return null;

  const {
    bio,
    occupation,
    professionalInterests,
    personalInterests
  } = userProfile;


  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionPart}>
        <Text style={styles.title}>About</Text>
        <Text style={styles.text}>{bio || 'No bio provided'}</Text>

        <Text style={styles.title}>Occupation</Text>
        <Text style={styles.text}>{occupation || 'Not specified'}</Text>
      </View>

      <View style={styles.line} />

      <View style={styles.sectionPart}>
        <Text style={styles.title}>Professional interests:</Text>
        {getBubbles(professionalInterests)}

        <Text style={styles.title}>Personal interests:</Text>
        {getBubbles(personalInterests)}
      </View>
    </View>
  );
}

function getBubbles(array: string[]) {
  if (!array || array.length === 0) return null;

  return (
    <View style={styles.bubblesContainer}>
      {array.map((el, index) => (
        <View key={`${el}-${index}`} style={styles.bubbleField}>
          <Text style={styles.bubbleText}>{el}</Text>
        </View>
      ))}
    </View>
  );
}


const theme = useTheme();

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 10,
  },
  sectionPart: {
    padding: 10,
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
  line: {
    width: '100%',
    borderWidth: 0.9,
    borderColor: theme.cocao,
    marginTop: 15,
  },
  bubblesContainer: {
    marginVertical: 5,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  bubbleField: {
    marginBottom: 5,
    marginRight: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.cocao
  },
  bubbleText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.coal
  }
});
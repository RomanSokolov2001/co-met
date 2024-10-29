import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

const theme = useTheme()

export default function ProfileContactSection() {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.title}>Email:</Text>
            <Text style={styles.text}>john.doe@gmail.com</Text>

            <Text style={styles.title}>Phone number:</Text>
            <Text style={styles.text}>+372 555-440-0</Text>
        </View>
    )
}

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
})
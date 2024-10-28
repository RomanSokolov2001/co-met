import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

const samples = ['Art', 'IT', 'Pets', 'Gaming', 'Web']

const theme = useTheme()

function getBubbles(array: string[]) {
    return (
        <View style={styles.bubblesContainer}>
            {array.map((el => {
                return (
                    <View style={styles.bubbleField}>
                        <Text style={styles.bubbleText}> {el} </Text>
                    </View>
                )
            }))}
        </View>
    )
}

export default function ProfileInfoSection() {
    return (
        <View style={styles.sectionContainer}>
            <View style={styles.sectionPart}>
                <Text style={styles.title}>About</Text>
                <Text style={styles.text}>Text text text text Text text text text Text text text text Text text text text Text text text text</Text>
                <Text style={styles.title}>Occupation</Text>
                <Text style={styles.text}>Work & Study</Text>
            </View>
            <View style={styles.line} />

            <View style={styles.sectionPart}>
                <Text style={styles.title}>Professional interests:</Text>
                {getBubbles(samples)}
                <Text style={styles.title}>Personal interests:</Text>
                {getBubbles(samples)}
            </View>

        </View>
    )
}

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
})
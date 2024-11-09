import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../hooks/useTheme";


interface BtnProps {
    label: string
    onPress: any 
}

export default function ButtonNoBg({ label, onPress }: BtnProps) {
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <View style={styles.btnField}>
                <Text style={styles.btnText}>
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    )
}


const theme = useTheme()

const styles = StyleSheet.create({
    btnField: {
        margin: 15,
    },
    btnText: {
        color: theme.cocao,
        fontFamily: 'Raleway-SemiBold',
        fontSize: 16,
    }
})
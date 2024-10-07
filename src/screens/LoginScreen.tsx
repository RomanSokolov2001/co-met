import { SafeAreaView, StyleSheet, Text } from "react-native"

const LoginScreen = () => {
    return (
        <SafeAreaView>
            <Text style={styles.text}> Hello! </Text>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    text:{
        color: 'red'
    }
})
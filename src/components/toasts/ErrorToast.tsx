import { useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { useTheme } from "../../hooks/useTheme";


interface ToastProps {
    setToast: any
    errorText: string
}

export default function Toast({ setToast, errorText }: ToastProps) {
    const theme = useTheme()
    const opacity = useRef(new Animated.Value(0)).current;
    const [isMounted, setMounted] = useState(false)

    function handleTap() {
        setToast(false)

    }

    return (
        <Animated.View style={[styles.overlay]}>
            <TouchableWithoutFeedback style={styles.touchable} onPress={handleTap}>
                <View style={styles.emptyBody}>
                    <View style={styles.field}>
                        <Text style={styles.errorTitle}>
                            Error happened: 😕
                        </Text>
                        <Text style={styles.errorText} numberOfLines={3}>
                            {errorText}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Animated.View>

    )
}


const SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    overlay: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        justifyContent: 'center',
        height: "100%",
        width: '100%'
    },
    emptyBody: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
    },
    field: {
        width: '70%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    errorTitle: {
        fontSize: 22,
        fontFamily: 'Raleway-SemiBold'
    },
    errorText: {
        fontSize: 16,
    }
})
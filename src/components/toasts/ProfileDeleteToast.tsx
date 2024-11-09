import { SetStateAction } from "react";
import { Alert, Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import CustomButton from "../buttons/CustomButton";
import { deleteUserAccount } from "../../services/FirestoreService";


interface ToastProps {
    setToast: any
    btnLabel: string
}

export default function DeleteProfileToast({ setToast }: ToastProps) {
    function handleTap() {
        setToast(false)
    }

    async function handlePress() {
        try {
            await deleteUserAccount()
        } catch (error) {
            Alert.alert('Re-login in order to delete it!')
        }
    }

    return (
        <Animated.View style={[styles.overlay]}>
            <TouchableWithoutFeedback style={styles.touchable} onPress={handleTap}>
                <View style={styles.emptyBody}>
                    <View style={styles.field}>
                        <Text style={styles.errorTitle}>
                            Are you sure?
                        </Text>
                        <Text style={styles.toastText} numberOfLines={3}>
                            {"Want to delete your profile? :("}
                        </Text>
                        <CustomButton type={'dark'} onPress={handlePress}>
                            Delete!
                        </CustomButton>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Animated.View>
    )
}


const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_HIGHT = Dimensions.get('window').height


const styles = StyleSheet.create({
    overlay: {
        height: SCREEN_HIGHT,
        width: '100%',
        position: 'absolute',
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,

    },
    touchable: {
        justifyContent: 'center',
        height: "100%",
        width: '100%',

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
    toastText: {
        paddingTop: 10,
        fontSize: 16,
    }
})
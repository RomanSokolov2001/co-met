import { Image, StyleSheet, Text, View } from "react-native";
import { icons } from "../utils/icons";
import { useTheme } from "../hooks/useTheme";
import DropDown from "./DropDown";

const theme = useTheme()

export default function PageHeader({ pageName }) {
    return (
        <View style={styles.headerField}>
            {pageName ? 
                <Text style={styles.title}>{pageName}</Text>
            :
                <DropDown />

            }
            <View style={styles.headerIconsAvatarPart}>
                <Image
                    source={icons.starFilled}
                    style={styles.icon}
                />
                <Image
                    source={icons.bell}
                    style={styles.icon}
                />
                <View style={styles.round}>
                    <Image
                        style={styles.avatar}
                    />
                </View>
            </View>
        </View>
    )
}

const roundSize = 50

const styles = StyleSheet.create({
    headerField: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 65
    },
    headerIconsAvatarPart: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 30,
        height: 30
    },

    avatar: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: theme.coal
    },
    round: {
        width: roundSize,
        height: roundSize,
        backgroundColor: theme.caramel,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: theme.coal,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    title: {
        width: 139,
        margin: 10,
        marginBottom: 6,
        fontFamily: 'KiwiMaru-Medium',
        fontSize: 16,
        color: theme.coal,
        alignSelf: 'center'
    }
})
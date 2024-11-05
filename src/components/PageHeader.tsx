import { Image, StyleSheet, Text, View } from "react-native";
import { icons } from "../utils/icons";
import { useTheme } from "../hooks/useTheme";
import DropDown from "./DropDown";
import { useProfile } from "../wrappers/ProfileContext";

interface PageHeaderProps {
    options: string[] | null,
    onSelect: () => void
}

export default function PageHeader({ options, onSelect }: PageHeaderProps) {
    const { profile } = useProfile()
    return (
        <View style={styles.headerField}>
            {options ?
                <DropDown options={options} onSelect={onSelect} />
                :
                <View></View>
            }

            <View style={styles.headerIconsAvatarPart}>
                {/* <Image
                    source={icons.starFilled}
                    style={styles.icon}
                />
                <Image
                    source={icons.bell}
                    style={styles.icon}
                /> */}
                <View style={styles.round}>
                    {
                        profile?.photoURL &&
                        <Image
                            source={{ uri: profile.photoURL }}
                            style={styles.avatar}
                        />
                    }

                </View>
            </View>
        </View>
    )
}


const roundSize = 50

const theme = useTheme()

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
        width: roundSize,
        height: roundSize,
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
        justifyContent: 'center',
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
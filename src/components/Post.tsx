import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { icons } from "../utils/icons";

const theme = useTheme()

export default function Post() {
    return (
        <View>
            <View style={styles.postHeader}>
                <View style={styles.round}>
                    <Image
                        style={styles.avatar}
                    />
                </View>
                <View>
                    <Text style={styles.title}>
                        Roman Sokolov
                    </Text>
                    <View style={styles.postTimeLocationField}>
                        <Image
                            source={icons.world}
                            style={styles.icon}
                        />
                        <Text style={styles.text}>
                            Tallinn
                        </Text>
                        <Image
                            source={icons.dot}
                            style={styles.dot}
                            tintColor={theme.coal}
                        />
                        <Text style={styles.text}>
                            3h ago
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.postInfo}>
                <View style={styles.postInfoValue}>
                    <Image
                        source={icons.calendar}
                        style={styles.iconInfo}
                    />
                    <Text style={styles.text}>
                        15:30, 24 Sept
                    </Text>
                </View>

                <View style={styles.postInfoValue}>
                    <Image
                        source={icons.time}
                        style={styles.iconInfo}
                    />
                    <Text style={styles.text}>
                        ~3h
                    </Text>
                </View>
                <View style={styles.postInfoValue}>
                    <Image
                        source={icons.location}
                        style={styles.iconInfo}
                    />
                    <Text style={styles.text}>
                        Ceffeine Harju
                    </Text>
                </View>
                <View style={styles.postInfoValue}>
                    <Image
                        source={icons.notes}
                        style={styles.iconInfo}
                    />
                    <Text style={styles.text}>
                        study
                    </Text>
                </View>
            </View>
            <View style={styles.postDesctiption}>
                <Text style={styles.descriptionValue}>Note:</Text>
                <Text style={styles.postDescriptionText}>Text text text text text text text text text text text text text text text text text text text text text text</Text>
            </View>
            <View style={styles.postDesctiption}>
                <Text style={styles.descriptionValue}>Topics:</Text>
                <Text style={styles.postDescriptionText}>Biology, IT</Text>
            </View>
        </View >
    )
}

const roundSize = 50

const styles = StyleSheet.create({
    postHeader: {
        flexDirection: 'row',
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
        fontFamily: 'KiwiMaru-Medium',
        fontSize: 16,
        color: theme.coal
    },
    postTimeLocationField: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 15,
        height: 15,
        alignSelf: 'center',
        marginRight: 5,
    },
    dot: {
        width: 25,
        height: 25,
        alignSelf: 'center',
    },
    postInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    iconInfo: {
        width: 25,
        height: 25,
    },
    postInfoValue: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    text: {
        fontFamily: 'RaleWay-Medium',
        fontSize: 13
    },
    postDesctiption: {
        padding: 10,
        flexDirection: 'row',
    },
    postDescriptionText: {
        fontFamily: 'RaleWay-Medium',
        fontSize: 14,
        paddingTop: 2,
        paddingLeft: 5
    },
    descriptionValue: {
        fontFamily: 'KiwiMaru-Medium',
        fontSize: 14,
        color: theme.coal,
        alignSelf: 'flex-start'
    },
})
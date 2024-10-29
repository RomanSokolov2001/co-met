import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { icons } from "../utils/icons";
import ButtonNoBg from "./buttons/ButtonNoBg";

const theme = useTheme()

export default function Post() {

    function onViewProfilePress() {

    }

    function onContactPress() {

    }

    return (
        <View style={styles.postContainer}>
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

            <View style={styles.line} />

            <View style={styles.postDesctiption}>
                <Text style={styles.descriptionValue}>Note:</Text>
                <Text numberOfLines={3} style={styles.postDescriptionText}>Text text text text text text text text text text text text text text text text text text text text text text</Text>
            </View>

            <View style={styles.line} />

            <View style={styles.postDesctiption}>
                <Text style={styles.descriptionValue}>Topics:</Text>
                <Text style={styles.postDescriptionText}>Biology, IT</Text>
            </View>
            <View style={styles.btnContainer}>
                <ButtonNoBg label={'View profile'} onPress={onViewProfilePress} />
                <ButtonNoBg label={'Contact'} onPress={onContactPress} />
            </View>
        </View >
    )
}

const roundSize = 50

const w = Dimensions.get('screen').width

const styles = StyleSheet.create({
    postContainer: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: theme.cocao,
        paddingVertical: 10
    },
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
        fontSize: 13,

    },
    postDesctiption: {
        padding: 10,
        flexDirection: 'row',
    },
    postDescriptionText: {
        fontFamily: 'RaleWay-Medium',
        fontSize: 14,
        paddingTop: 2,
        paddingLeft: 5,
        width: w - 60
    },
    descriptionValue: {
        fontFamily: 'KiwiMaru-Medium',
        fontSize: 14,
        color: theme.coal,
        alignSelf: 'flex-start'
    },
    line: {
        width: '95%',
        borderWidth: 0.9,
        borderColor: theme.cocao,
        alignSelf: 'center'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})
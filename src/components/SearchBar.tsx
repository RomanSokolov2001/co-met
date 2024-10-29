import { Dimensions, Image, StyleSheet, TextInput, TouchableNativeFeedback, TouchableWithoutFeedback, View } from "react-native";
import { icons } from "../utils/icons";
import { useTheme } from "../hooks/useTheme";

const theme = useTheme()

export default function SearchBar({ value, onChangeText, onSettingsPress }) {
    return (
        <View style={styles.searchBarContainer}>
            <View style={styles.searchField}>
                <Image
                    source={icons.search}
                    style={styles.icon}
                    tintColor={theme.coal}
                />

                <View>
                    <TextInput
                        value={value}
                        onChangeText={onChangeText}
                        style={[{ fontSize: 16, width: w * 0.55 }]}
                    />
                </View>

            </View>
            <TouchableWithoutFeedback onPress={onSettingsPress}>
                <View style={styles.settingsField}>
                    <Image
                        source={icons.settings}
                        style={[styles.icon, { marginLeft: 10 }]}
                    />
                </View>

            </TouchableWithoutFeedback>

        </View>
    )
}

const w = Dimensions.get('screen').width

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    icon: {
        width: 30,
        height: 30,
        alignSelf: 'center'
    },
    searchField: {
        borderRadius: 50,
        paddingHorizontal: 15,
        backgroundColor: theme.milkChoco,
        flexDirection: 'row',
        width: w * 0.7
    },
    settingsField: {
        alignItems: 'center',
        justifyContent: 'center',
     
    }
})
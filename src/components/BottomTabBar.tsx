import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { icons } from '../utils/icons';
import { useTheme } from '../hooks/useTheme';


export default function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableWithoutFeedback
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                    >
                        <View
                            style={[styles.tabField, { backgroundColor: getTabBg(isFocused) }]}
                        >
                            <Image
                                source={getTabIcon(label)} style={styles.icon}
                                tintColor={"black"} />
                        </View>
                    </TouchableWithoutFeedback>
                );
            })}
        </View>
    );
}


function getTabBg(isFocused: boolean) {
    if (isFocused) {
        return theme.cocao
    } else {
        return theme.milkChoco
    }
}

const getTabIcon = (label: string) => {
    if (label === 'Feed') {
        return icons.home
    } else if (label == 'Search') {
        return icons.search
    } else if (label == 'AddPost') {
        return icons.add
    } else if (label == 'MyProfileStack') {
        return icons.profile
    }
}


const theme = useTheme()

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black'
    },
    tabField: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
    },
    icon: {
        width: 30,
        height: 30
    }
})
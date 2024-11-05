import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { icons } from '../utils/icons';
import { useNavigation } from '@react-navigation/native';


interface SidebarProps {
    isVisible: boolean
    onClose: () => void
    onLogout: () => void
    onDelete: () => void
    width?: number
    style?: ViewStyle
}

// Claude AI
const Sidebar = ({
    isVisible,
    onClose,
    width = 0.8,
    style,
    onDelete,
    onLogout
}: SidebarProps) => {
    const screenWidth = Dimensions.get('screen').width;
    const sidebarWidth = screenWidth * width;

    const startPosition = screenWidth;
    const slideAnim = useRef(new Animated.Value(startPosition)).current;

    const navigation = useNavigation()

    useEffect(() => {
        const targetPosition = isVisible
            ? (screenWidth - sidebarWidth)
            : startPosition;

        Animated.timing(slideAnim, {
            toValue: targetPosition,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isVisible, sidebarWidth]);

    return (
        <>
            {isVisible && (
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            )}

            {/* Sidebar */}
            <Animated.View
                style={[
                    styles.sidebar,
                    {
                        width: sidebarWidth,
                        right: 0,
                        transform: [{ translateX: slideAnim }],
                    },
                    style,
                ]}
            >
                <View style={styles.header}>
                    <Image
                        source={icons.arrowLeft}
                        style={styles.icon}
                    />
                    <Text style={styles.headerTitle}> Settings </Text>

                </View>
                <View style={styles.sidebarContent}>
                    <View>
                        <SidebarButton label={'Edit profile info'} onPress={()=> navigation.navigate('EditProfile')} />
                        {/* <SidebarButton label={'Change password'} /> */}
                    </View>

                    <View>
                        <View style={styles.line} />
                        <SidebarButton label={'Log out'} onPress={onLogout}/>
                        <SidebarButton label={'Delete account'} onPress={onDelete}/>
                    </View>
                </View>
            </Animated.View>
        </>
    );
};

const SidebarButton = ({ label, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.btnField}>
                <Text style={styles.btnText}>
                    {label}
                </Text>
            </View>
        </TouchableOpacity>

    )
}


const theme = useTheme()
const SCREEN_HIGHT = Dimensions.get('window').height
const BAR_WIDTH = StatusBar.currentHeight

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: 999,
    },
    sidebar: {
        position: 'absolute',
        height: SCREEN_HIGHT,
        backgroundColor: theme.beige,
        zIndex: 1000,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 15,
        paddingBottom: 100,
        paddingTop: BAR_WIDTH
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    headerTitle: {
        color: theme.coal,
        fontSize: 16,
        fontFamily: 'KiwiMaru-Medium'
    },
    btnText: {
        fontFamily: 'Raleway-Medium',
        color: theme.coal,
        fontSize: 20
    },
    btnField: {
        paddingVertical: 7
    },
    sidebarContent: {
        height: '100%',
        justifyContent: 'space-between',
        flexDirection: 'column',
        paddingBottom: 50,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    icon: {
        marginRight: 40,
        width: 30,
        height: 30
    },
    line: {
        borderColor: theme.cocao,
        borderWidth: 0.9,
        width: '100%',
    }
});

export default Sidebar;
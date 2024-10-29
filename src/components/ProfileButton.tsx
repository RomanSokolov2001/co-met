import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from '../hooks/useTheme';

interface CustomButtonProps {
    onPress: any,
    children: Element,
    label: string,
    selectedSection: string
}

const theme = useTheme()

const ProfileButton = ({ selectedSection, onPress, label }: CustomButtonProps) => {
    const [isSelected, setSelected] = useState(false)

    function doAnimation() {
        onPress()
        if (isSelected && (selectedSection == label)) return

        if (isSelected) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: false,
            }).start();
        }
        setSelected(!isSelected)
    }

    useEffect(() => {
        if (selectedSection !== label) {
            setSelected(false)
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false,
            }).start();
        }
    }, [selectedSection])

    function getTextCol() {
        if (isSelected) return theme.beige
        else return theme.cocao
    }

    const animatedValue = useRef(new Animated.Value(0)).current;

    const backgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.beige, theme.cocao],
    });

    return (
        <TouchableWithoutFeedback
            onPress={doAnimation}
        >
            <Animated.View
                style={[
                    styles.buttonField,
                    {
                        backgroundColor,
                        borderColor: theme.cocao,
                        borderWidth: 2,
                    },
                ]}
            >
                <Animated.Text style={[styles.buttonText, { color: getTextCol() }]}>
                    {label}
                </Animated.Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    buttonField: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: theme.beige,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        width: 100,
        textAlign: 'center'
    }
});

export default ProfileButton;
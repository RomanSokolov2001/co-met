import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from '../hooks/useTheme';


interface CustomButtonProps {
    onPress: any,
    children: Element,
    label: string,
    selectedSection: string
}

const ProfileButton = ({ selectedSection, onPress, label }: CustomButtonProps) => {
    const [isSelected, setSelected] = useState(false)
    const [isMounted, setMounted] = useState(false)
    const animatedValue = useRef(new Animated.Value(0)).current;

    const backgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.beige, theme.cocao],
    });


    useEffect(() => {
        if (isMounted) return
        if (selectedSection == label) {
            setSelected(true)
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1,
                useNativeDriver: false,
            }).start();
        }
        setMounted(true)
    })

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


    function handlePress() {
        onPress()
        if (isSelected && (selectedSection == label)) return

        perfomAnimation()
        setSelected(!isSelected)
    }

    function perfomAnimation() {
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
    }


    return (
        <TouchableWithoutFeedback
            onPress={handlePress}
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
                <Animated.Text style={[styles.buttonText, { color: isSelected ? theme.beige : theme.cocao }]}>
                    {label}
                </Animated.Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};


const theme = useTheme()

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
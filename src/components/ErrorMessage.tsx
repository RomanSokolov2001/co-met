import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface ErrorMessageProps {
    text: string,
    trigger: number

}

// When trigger is changed. Shows the error message on Sign Up page
export default function ErrorMessage({ text, trigger }: ErrorMessageProps) {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animatedValue.setValue(0)

        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    }, [trigger]);

    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    });


    return (
        <Animated.View>
            <Animated.Text style={[styles.text, { opacity }]}>
                {text}
            </Animated.Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontFamily: 'Raleway-SemiBold',
        alignSelf: 'center',
        color: 'red',
    },
});

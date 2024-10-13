import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';


export default function ErrorMessage({ text, trigger }) {
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

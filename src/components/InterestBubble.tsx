import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from '../hooks/useTheme';

const InterestBubble = (props) => {
    const [isSelected, setIsSelected] = useState(true)
    const theme = useTheme()

    const animatedColorValue = useRef(new Animated.Value(0)).current;
    const animatedSizeValue = useRef(new Animated.Value(0)).current;


    const handlePressIn = () => {
        if (isSelected) {
            Animated.timing(animatedColorValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: false,
            }).start();

        } else {
            Animated.timing(animatedColorValue, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false,
            }).start();
        }
        setIsSelected(!isSelected)

        Animated.timing(animatedSizeValue, {
            toValue: 1,
            duration: 50,
            useNativeDriver: false,
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(animatedSizeValue, {
            toValue: 0,
            duration: 50,
            useNativeDriver: false,
        }).start();
    };

    const backgroundColor = animatedColorValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.beige, theme.cocao],
    });

    const scale = animatedSizeValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.95],
    });

    return (
        <TouchableWithoutFeedback
            onPress={props.onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View
                style={[
                    styles.buttonField,
                    {
                        backgroundColor,
                        transform: [{ scale }],
                        borderColor: theme.cocao
                    },
                ]}
            >
                <Animated.Text style={[styles.buttonText, { color: theme.coal }]}>
                    {props.value}
                </Animated.Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    buttonField: {
        marginBottom: 5,
        marginRight: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
    }
});

export default InterestBubble;
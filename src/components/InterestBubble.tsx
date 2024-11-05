import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from '../hooks/useTheme';


interface interestBubbleProps {
    value: string,
    isSelected: boolean,
    count: number,
    onPress: any,
    limit: number,
    selected: string[],
    trigger: number
}

const InterestBubble = ({ value, onPress, limit = 999, selected, trigger }: interestBubbleProps) => {
    const isSelected = selected.includes(value)

    const animatedColorValue = useRef(new Animated.Value(isSelected ? 1 : 0)).current;
    const animatedSizeValue = useRef(new Animated.Value(0)).current;

    const backgroundColor = animatedColorValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.beige, theme.cocao],
    });

    const scale = animatedSizeValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.95],
    });

    useEffect(() => {
        if (!selected.includes(value)) {
            Animated.timing(animatedColorValue, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(animatedColorValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: false,
            }).start();
        }
    }, [selected])

    useEffect(() => {
        if (!selected.includes(value)) {
            Animated.timing(animatedColorValue, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false,
            }).start();
        }
    }, [trigger])


    const handlePress = () => {
        onPress()
    }

    const handlePressIn = () => {
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


    return (
        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={handlePress}>
            <Animated.View
                style={[
                    styles.buttonField,
                    {
                        backgroundColor,
                        transform: [{ scale }],
                        borderColor: theme.cocao,
                    },
                ]}
            >
                <Animated.Text style={[styles.buttonText, { color: theme.coal }]}>
                    {value}
                </Animated.Text>
            </Animated.View>
        </TouchableWithoutFeedback >
    );
};


const theme = useTheme();

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
    },
});

export default InterestBubble;
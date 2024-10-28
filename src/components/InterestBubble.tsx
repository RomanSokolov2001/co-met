import React, { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from '../hooks/useTheme';

interface interestBubbleProps {
    value: string,
    isSelected: boolean,
    count: number,
    onPress: any
}


const InterestBubble = ({ value, isSelected, onPress, count }: interestBubbleProps) => {
    const theme = useTheme();

    const handlePress = () => {
        onPress();
    }

    const animatedColorValue = useRef(new Animated.Value(isSelected ? 1 : 0)).current;
    const animatedSizeValue = useRef(new Animated.Value(0)).current;


    const handlePressIn = () => {
        if (count > 4 && !isSelected) return

        Animated.timing(animatedColorValue, {
            toValue: isSelected ? 0 : 1,
            duration: 100,
            useNativeDriver: false,
        }).start();

        Animated.timing(animatedSizeValue, {
            toValue: 1,
            duration: 50,
            useNativeDriver: false,
        }).start();
    };

    const handlePressOut = () => {
        if (count > 4 && !isSelected) return
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
        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
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
    },
});

export default InterestBubble;
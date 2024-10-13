import React, { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const CustomButton = (props) => {
  function getBgInitial() {
    if (props.type == 'light') return '#EDE0D4'
    else return '#886650'
  }

  function getBgAfterTap() {
    if (props.type == 'light') return '#d4c8bc'
    else return '#805f4a'
  }

  function getTextCol() {
    if (props.type == 'light') return "#1E1E1E"
    else return '#EDE0D4'
  }

  // Create an Animated.Value to control all our animations
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    // Animate to 1 when pressed
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 50,
      useNativeDriver: false, // We can't use native driver because we're animating layout properties
    }).start();
  };

  const handlePressOut = () => {
    // Animate back to 0 when released
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 50,
      useNativeDriver: false,
    }).start();
  };

  // Interpolate background color
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [getBgInitial(), getBgAfterTap()],
  });

  // Interpolate button size
  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95], // Button will shrink to 95% of its size when pressed
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
            // Apply scaling transform
            transform: [{ scale }]
          },
        ]}
      >
        <Animated.Text style={[styles.buttonText, { color: getTextCol() }]}>
          {props.children}
        </Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonField: {
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default CustomButton;
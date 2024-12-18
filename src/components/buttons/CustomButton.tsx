import React, { useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from '../../hooks/useTheme';

interface CustomButtonProps {
  onPress: any,
  type: 'light' | 'dark',
  children: any
}


const CustomButton = ({ onPress = () => console.log("Pressed"), children, type = "light" }: CustomButtonProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;


  function getBgInitial() {
    if (type == 'light') return theme.beige
    else return theme.cocao
  }

  function getBgAfterTap() {
    if (type == 'light') return theme.beigeDarker
    else return theme.cocoaDarker
  }

  function getTextCol() {
    if (type == 'light') return theme.coal
    else return theme.beige
  }


  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [getBgInitial(), getBgAfterTap()],
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });


  const handlePressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 50,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 50,
      useNativeDriver: false,
    }).start();
  };


  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.buttonField,
          {
            backgroundColor,
            transform: [{ scale }]
          },
        ]}
      >
        <Animated.Text style={[styles.buttonText, { color: getTextCol() }]}>
          {children}
        </Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};


const theme = useTheme()

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
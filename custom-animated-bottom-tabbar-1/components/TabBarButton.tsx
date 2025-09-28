import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type TabBarButtonProps = {
  onPress: Function;
  onLongPress: Function;
  isFocused: boolean;
  routeName: string;
  color: string;
  label: string;
}

const TabBarButton = ({ onPress, onLongPress, isFocused, routeName, color, label }: TabBarButtonProps) => {
  const icon = {
    index: (props: any) => <MaterialCommunityIcons name='home-outline' size={24} color={'#222'} {...props} />,
    explore: (props: any) => <MaterialCommunityIcons name='compass-outline' size={24} color={'#222'} {...props} />,
    profile: (props: any) => <MaterialCommunityIcons name='face-man-profile' size={24} color={'#222'} {...props} />
  }

  const scale = useSharedValue(0);
  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 100 }
    );
  }, [scale, isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return { opacity };
  })

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.5]);
    const top = interpolate(scale.value, [0, 1], [0, 10]);
    return { transform: [{ scale: scaleValue }], top }
  })

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
      <Animated.View style={animatedIconStyle}>
        {icon[routeName]({ color: isFocused ? '#fff' : '#222' })}
      </Animated.View>
      <Animated.Text
        style={[{ color: isFocused ? '#673ab7' : '#222', fontSize: 12 }, animatedTextStyle]}

      >
        {label}
      </Animated.Text>
    </Pressable>
  )
}

export default TabBarButton

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  }
})
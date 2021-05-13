import styles from '@/constants/styles/base';
import React, { FunctionComponent, useRef, useEffect, useMemo } from 'react';
import { View, Animated } from 'react-native';
import dimensions from '@/constants/dimensions';
interface HeartReactionProps {
  size: number;
  removeHeart: () => void;
}

const HeartReaction: FunctionComponent<HeartReactionProps> = (props) => {
  const { size, removeHeart } = props;
  const heartPiceStyle = {
    width: 6 * size,
    height: 9 * size,
    bottom: 0,
    borderTopLeftRadius: 3 * size,
    borderTopRightRadius: 3 * size,
    backgroundColor: 'red',
  };
  const anim = useRef(new Animated.Value(0));

  const xOutput = useMemo(() => {
    const initXVal = Math.random() * 50;
    return [-initXVal, initXVal + Math.random() * -200];
  }, []);

  const yOutput = useMemo(() => {
    return [-10, 200 + dimensions.height * 0.222];
  }, []);

  const xVal = anim.current.interpolate({
    inputRange: [0, 100],
    outputRange: xOutput,
  });
  const yVal = anim.current.interpolate({
    inputRange: [30, 100],
    outputRange: yOutput,
  });
  const scaleVal = anim.current.interpolate({
    inputRange: [0, 30, 100],
    outputRange: [0, 80, 70],
    extrapolate: 'clamp',
  });
  const opacityVal = anim.current.interpolate({
    inputRange: [0, 5],
    outputRange: [0, 100],
  });

  useEffect(() => {
    const sequence = Animated.sequence([
      Animated.timing(anim.current, {
        toValue: 1,
        duration: 600 + Math.random() * 450,
        useNativeDriver: true,
      }),
      Animated.timing(anim.current, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);
    sequence.start(() => removeHeart());
    return () => sequence.stop();
  }, []);

  return (
    <View style={styles.heartContainer}>
      <Animated.View
        style={{
          opacity: opacityVal,
          transform: [{ scale: scaleVal, translateY: yVal, translateX: xVal }],
        }}
      >
        <View
          style={{
            width: 10 * size,
            height: 10 * size,
            backgroundColor: 'transparent',
          }}
        >
          <View
            style={{
              ...heartPiceStyle,
              position: 'absolute',
              transform: [{ rotate: '-45deg' }],
              left: size,
            }}
          />
          <View
            style={{
              ...heartPiceStyle,
              position: 'absolute',
              transform: [{ rotate: '45deg' }],
              right: size,
            }}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default HeartReaction;

import styles from '@/constants/styles/base';
import React, { useRef, useEffect, useMemo } from 'react';
import { View, Animated } from 'react-native';
import dimensions from '@/constants/dimensions';
import HeartIcon from '@/components/HeartIcon';
interface Props {
  size: number;
  removeHeart: () => void;
}

const AnimatedHeart: React.FC<Props> = (props) => {
  const { size, removeHeart } = props;

  const anim = useRef(new Animated.Value(0));
  const xOutput = useMemo(() => {
    const initXVal = Math.random() * 50;
    return [-initXVal, initXVal + Math.random() * -200];
  }, []);

  const xVal = anim.current.interpolate({
    inputRange: [0, 100],
    outputRange: xOutput,
  });
  const yVal = anim.current.interpolate({
    inputRange: [30, 100],
    outputRange: [-10, 200 + dimensions.height * 0.222],
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
        <HeartIcon size={size} />
      </Animated.View>
    </View>
  );
};

export default AnimatedHeart;

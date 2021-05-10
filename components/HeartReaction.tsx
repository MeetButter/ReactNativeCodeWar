import React, { FunctionComponent, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface HeartReactionProps {
  color: string;
  size: number;
}

const HeartReaction: FunctionComponent<HeartReactionProps> = (props) => {
  const { color, size } = props;

  const heartPiece = {
    width: 6 * size,
    height: 9 * size,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 3 * size,
    borderTopRightRadius: 3 * size,
    backgroundColor: color,
  };

  const anim = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim.current, {
          toValue: 2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(anim.current, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
    setTimeout(() => {
      anim.current.stopAnimation();
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: anim.current }] }}>
        <View
          style={[
            {
              width: 10 * size,
              height: 10 * size,
              backgroundColor: 'transparent',
            },
          ]}
        >
          <View
            style={[
              {
                transform: [{ rotate: '-45deg' }],
                left: 0.9 * size,
              },
              heartPiece,
            ]}
          />
          <View
            style={[
              {
                transform: [{ rotate: '45deg' }],
                right: 0.9 * size,
              },
              heartPiece,
            ]}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

export default HeartReaction;

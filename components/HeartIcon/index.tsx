import React from 'react';
import { View } from 'react-native';
type Props = {
  size?: number;
};

const HeartIcon: React.FC<Props> = (props) => {
  const { size = 1 } = props;
  const heartPiceStyle = {
    width: 6 * size,
    height: 9 * size,
    bottom: 0,
    borderTopLeftRadius: 3 * size,
    borderTopRightRadius: 3 * size,
    backgroundColor: 'red',
  };

  return (
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
  );
};

export default HeartIcon;

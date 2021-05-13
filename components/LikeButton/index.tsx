import styles from '@/constants/styles/base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import HeartIcon from '@/components/HeartIcon';

type Props = {
  onPress: () => void;
  hidden?: boolean;
};
export default function LikeButton({ onPress, hidden }: Props) {
  if (hidden) return null;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: 'white',
          borderColor: 'red',
          borderWidth: 1,
          paddingHorizontal: 30,
          marginLeft: 80,
        },
      ]}
    >
      <HeartIcon size={2} />
    </TouchableOpacity>
  );
}

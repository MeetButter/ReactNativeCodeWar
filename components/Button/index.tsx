import React from 'react';
import styles from '@/constants/styles/base';
import { Text, TouchableOpacity } from 'react-native';

export type Props = {
  onPress?: () => void;
  /** Text to render */
  children: Text | React.ReactNode;
};

export default function Button({ onPress, children }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

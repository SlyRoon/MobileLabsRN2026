import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '../constants/colors';

export default function ActionButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.secondaryButton,
        variant === 'danger' && styles.dangerButton,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressed,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          variant === 'secondary' && styles.secondaryText,
          disabled && styles.disabledText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  secondaryButton: {
    backgroundColor: '#E5E7EB',
  },
  dangerButton: {
    backgroundColor: colors.danger,
  },
  disabledButton: {
    backgroundColor: '#CBD5E1',
  },
  pressed: {
    opacity: 0.82,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryText: {
    color: colors.text,
  },
  disabledText: {
    color: colors.muted,
  },
});

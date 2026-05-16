import React from 'react';
import styled from 'styled-components/native';

const Button = styled.Pressable`
  align-items: center;
  background-color: ${({ theme, variant }) =>
    variant === 'danger' ? theme.danger : theme.primary};
  border-radius: 12px;
  padding: 13px 16px;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
`;

export default function GameButton({ title, onPress, variant = 'primary' }) {
  return (
    <Button onPress={onPress} variant={variant}>
      <ButtonText>{title}</ButtonText>
    </Button>
  );
}

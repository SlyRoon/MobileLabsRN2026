import React from 'react';
import styled from 'styled-components/native';

const Card = styled.View`
  background-color: ${({ theme }) => theme.card};
  border-color: ${({ done, theme }) => (done ? theme.success : theme.border)};
  border-radius: 14px;
  border-width: 1px;
  margin-bottom: 12px;
  padding: 14px;
`;

const Header = styled.View`
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.text};
  flex: 1;
  font-size: 16px;
  font-weight: 800;
  margin-right: 10px;
`;

const Badge = styled.Text`
  background-color: ${({ done, theme }) => (done ? theme.successSoft : theme.secondary)};
  border-radius: 12px;
  color: ${({ done, theme }) => (done ? theme.success : theme.primary)};
  font-size: 12px;
  font-weight: 700;
  overflow: hidden;
  padding: 5px 8px;
`;

const Description = styled.Text`
  color: ${({ theme }) => theme.muted};
  font-size: 14px;
  line-height: 20px;
  margin-top: 8px;
`;

const Progress = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: 700;
  margin-top: 10px;
`;

export default function ChallengeItem({ title, description, progress, done }) {
  return (
    <Card done={done}>
      <Header>
        <Title>{done ? `✅ ${title}` : title}</Title>
        <Badge done={done}>{done ? 'Виконано' : 'Не виконано'}</Badge>
      </Header>
      <Description>{description}</Description>
      <Progress>Прогрес: {progress}</Progress>
    </Card>
  );
}

import React from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';

import GameButton from '../components/GameButton';
import { useGame } from '../context/GameContext';

const Container = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.background};
  flex: 1;
`;

const Content = styled.ScrollView`
  flex: 1;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 8px;
`;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.muted};
  font-size: 15px;
  line-height: 22px;
  margin-bottom: 16px;
`;

const Card = styled.View`
  background-color: ${({ theme }) => theme.card};
  border-color: ${({ theme }) => theme.border};
  border-radius: 16px;
  border-width: 1px;
  margin-bottom: 14px;
  padding: 16px;
`;

const CardTitle = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 12px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.muted};
  font-size: 14px;
`;

const Value = styled.Text`
  color: ${({ theme }) => theme.text};
  flex-shrink: 1;
  font-size: 14px;
  font-weight: 700;
  text-align: right;
`;

const ButtonGap = styled.View`
  height: 10px;
`;

export default function SettingsScreen() {
  const {
    score,
    tapCount,
    doubleTapCount,
    themeMode,
    toggleTheme,
    resetProgress,
    completeCustomTask,
  } = useGame();

  const currentTheme = themeMode === 'dark' ? 'Темна' : 'Світла';

  const confirmReset = () => {
    Alert.alert(
      'Скинути прогрес?',
      'Ви точно хочете скинути всі очки та виконані завдання?',
      [
        { text: 'Скасувати', style: 'cancel' },
        { text: 'Скинути', style: 'destructive', onPress: resetProgress },
      ],
    );
  };

  return (
    <Container>
      <Content contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <Title>Налаштування</Title>
        <Subtitle>
          Цей застосунок демонструє роботу з жестами користувача у React Native.
        </Subtitle>

        <Card>
          <CardTitle>Студент</CardTitle>
          <Row>
            <Label>ПІБ</Label>
            <Value>Данілін Кирило Сергійович</Value>
          </Row>
          <Row>
            <Label>Група</Label>
            <Value>ВТ-24-1</Value>
          </Row>
          <Row>
            <Label>Підгрупа</Label>
            <Value>1</Value>
          </Row>
          <Row>
            <Label>Телефон</Label>
            <Value>0672578488</Value>
          </Row>
        </Card>

        <Card>
          <CardTitle>Тема</CardTitle>
          <Row>
            <Label>Поточна тема</Label>
            <Value>{currentTheme}</Value>
          </Row>
          <ButtonGap />
          <GameButton title="Перемкнути тему" onPress={toggleTheme} />
        </Card>

        <Card>
          <CardTitle>Прогрес</CardTitle>
          <Row>
            <Label>Очки</Label>
            <Value>{score}</Value>
          </Row>
          <Row>
            <Label>Tap</Label>
            <Value>{tapCount}</Value>
          </Row>
          <Row>
            <Label>Double tap</Label>
            <Value>{doubleTapCount}</Value>
          </Row>
          <ButtonGap />
          <GameButton title="Виконати бонусне завдання" onPress={completeCustomTask} />
          <ButtonGap />
          <GameButton title="Скинути прогрес" variant="danger" onPress={confirmReset} />
        </Card>
      </Content>
    </Container>
  );
}

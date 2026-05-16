import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';

import GameButton from '../components/GameButton';
import GameObject from '../components/GameObject';
import StatCard from '../components/StatCard';
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

const ScoreCard = styled.View`
  background-color: ${({ theme }) => theme.card};
  border-color: ${({ theme }) => theme.border};
  border-radius: 16px;
  border-width: 1px;
  margin-bottom: 14px;
  padding: 18px;
`;

const ScoreLabel = styled.Text`
  color: ${({ theme }) => theme.muted};
  font-size: 15px;
  font-weight: 700;
`;

const ScoreValue = styled.Text`
  color: ${({ theme }) => theme.primary};
  font-size: 44px;
  font-weight: 900;
  margin-top: 4px;
`;

const LastAction = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  font-weight: 700;
  margin-top: 10px;
`;

const ObjectCard = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.card};
  border-color: ${({ theme }) => theme.border};
  border-radius: 16px;
  border-width: 1px;
  justify-content: center;
  margin-bottom: 14px;
  min-height: 260px;
  overflow: hidden;
  padding: 18px;
`;

const Hint = styled.Text`
  color: ${({ theme }) => theme.muted};
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 14px;
  text-align: center;
`;

const StatsRow = styled.View`
  flex-direction: row;
  margin-bottom: 14px;
`;

const StatGap = styled.View`
  width: 10px;
`;

function clampPosition(value) {
  return Math.min(Math.max(value, -80), 80);
}

export default function GameScreen() {
  const {
    score,
    tapCount,
    doubleTapCount,
    objectSize,
    lastAction,
    handleTap,
    handleDoubleTap,
    handleLongPress,
    handleDrag,
    handleSwipeRight,
    handleSwipeLeft,
    handlePinch,
    completeCustomTask,
  } = useGame();

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onDrag = useCallback(
    (translationX, translationY) => {
      setPosition((current) => ({
        x: clampPosition(current.x + translationX),
        y: clampPosition(current.y + translationY),
      }));
      handleDrag();
    },
    [handleDrag],
  );

  return (
    <Container>
      <Content contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <Title>Gesture Clicker</Title>
        <Subtitle>
          Використовуй різні жести, щоб отримувати очки та виконувати завдання.
        </Subtitle>

        <ScoreCard>
          <ScoreLabel>Очки</ScoreLabel>
          <ScoreValue>{score}</ScoreValue>
          <LastAction>Остання дія: {lastAction}</LastAction>
        </ScoreCard>

        <ObjectCard>
          <Hint>Жести: tap, double tap, long press, drag, swipe, pinch.</Hint>
          <GameObject
            size={objectSize}
            position={position}
            onTap={handleTap}
            onDoubleTap={handleDoubleTap}
            onLongPress={handleLongPress}
            onDrag={onDrag}
            onSwipeRight={handleSwipeRight}
            onSwipeLeft={handleSwipeLeft}
            onPinch={handlePinch}
          />
        </ObjectCard>

        <StatsRow>
          <StatCard label="Звичайні кліки" value={tapCount} />
          <StatGap />
          <StatCard label="Подвійні кліки" value={doubleTapCount} />
          <StatGap />
          <StatCard label="Очки" value={score} />
        </StatsRow>

        <GameButton title="Виконати бонусне завдання" onPress={completeCustomTask} />
      </Content>
    </Container>
  );
}

import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import ChallengeItem from '../components/ChallengeItem';
import { useGame } from '../context/GameContext';
import { getChallenges } from '../utils/challenges';

const Container = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.background};
  flex: 1;
`;

const Header = styled.View`
  padding: 16px 16px 4px;
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
  margin-bottom: 10px;
`;

const ProgressBox = styled.View`
  background-color: ${({ theme }) => theme.card};
  border-color: ${({ theme }) => theme.border};
  border-radius: 14px;
  border-width: 1px;
  margin-top: 4px;
  padding: 12px 14px;
`;

const ProgressText = styled.Text`
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  font-weight: 800;
`;

export default function ChallengesScreen() {
  const game = useGame();
  const challenges = getChallenges(game);
  const doneCount = challenges.filter((item) => item.done).length;

  return (
    <Container>
      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        ListHeaderComponent={
          <Header>
            <Title>Завдання</Title>
            <Subtitle>
              Виконуй жести на головному екрані, щоб закривати завдання.
            </Subtitle>
            <ProgressBox>
              <ProgressText>
                Виконано: {doneCount} / {challenges.length}
              </ProgressText>
            </ProgressBox>
          </Header>
        }
        renderItem={({ item }) => (
          <ChallengeItem
            title={item.title}
            description={item.description}
            progress={item.progress}
            done={item.done}
          />
        )}
      />
    </Container>
  );
}

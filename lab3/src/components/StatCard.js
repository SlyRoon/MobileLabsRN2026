import React from 'react';
import styled from 'styled-components/native';

const Card = styled.View`
  background-color: ${({ theme }) => theme.card};
  border-color: ${({ theme }) => theme.border};
  border-radius: 14px;
  border-width: 1px;
  flex: 1;
  padding: 14px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.muted};
  font-size: 13px;
  margin-bottom: 6px;
`;

const Value = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  font-weight: 800;
`;

export default function StatCard({ label, value }) {
  return (
    <Card>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Card>
  );
}

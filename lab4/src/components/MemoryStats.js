import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { formatBytes } from '../utils/formatters';

function StatBox({ label, value }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function MemoryStats({ stats, error }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Пам'ять пристрою</Text>

      {error ? (
        <Text style={styles.errorText}>Статистика пам'яті недоступна</Text>
      ) : (
        <View style={styles.row}>
          <StatBox label="Загальна" value={formatBytes(stats.total)} />
          <StatBox label="Вільно" value={formatBytes(stats.free)} />
          <StatBox label="Зайнято" value={formatBytes(stats.used)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    padding: 14,
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  statBox: {
    backgroundColor: colors.background,
    borderRadius: 10,
    flex: 1,
    padding: 10,
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    marginBottom: 6,
  },
  value: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  errorText: {
    color: colors.muted,
    fontSize: 14,
  },
});

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { formatBytes, formatDate } from '../utils/formatters';
import ActionButton from './ActionButton';

export default function FileItem({ item, onOpen, onInfo, onDelete }) {
  const icon = item.isDirectory ? '📁' : '📄';
  const typeLabel = item.isDirectory ? 'Папка' : 'Файл';

  return (
    <Pressable style={styles.card} onPress={() => onOpen(item)}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.nameBlock}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.meta}>
            {typeLabel}
            {!item.isDirectory ? ` • ${formatBytes(item.size)}` : ''}
          </Text>
          <Text style={styles.date}>Змінено: {formatDate(item.modificationTime)}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <ActionButton
          title="Відкрити"
          onPress={() => onOpen(item)}
          style={styles.actionButton}
        />
        <ActionButton
          title="Інфо"
          variant="secondary"
          onPress={() => onInfo(item)}
          style={styles.actionButton}
        />
        <ActionButton
          title="Видалити"
          variant="danger"
          onPress={() => onDelete(item)}
          style={styles.actionButton}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 28,
    marginRight: 10,
    marginTop: 2,
  },
  nameBlock: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  meta: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 4,
  },
  date: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    paddingHorizontal: 8,
  },
});

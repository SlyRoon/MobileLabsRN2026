import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { formatBytes, formatDate } from '../utils/formatters';
import { isTxtFile } from '../utils/fileHelpers';
import ActionButton from './ActionButton';

function getTypeLabel(item) {
  if (!item) {
    return '';
  }

  if (item.isDirectory) {
    return 'Папка';
  }

  if (isTxtFile(item.name)) {
    return 'Текстовий файл (.txt)';
  }

  return 'Файл';
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function InfoModal({ visible, item, onClose }) {
  if (!item) {
    return null;
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Інформація</Text>

          <InfoRow label="Назва" value={item.name} />
          <InfoRow label="Тип" value={getTypeLabel(item)} />
          <InfoRow label="Шлях" value={item.relativePath} />
          <InfoRow label="Розмір" value={item.isDirectory ? '—' : formatBytes(item.size)} />
          <InfoRow label="Змінено" value={formatDate(item.modificationTime)} />

          <ActionButton title="Закрити" onPress={onClose} style={styles.closeButton} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(17, 24, 39, 0.45)',
    flex: 1,
    justifyContent: 'center',
    padding: 18,
  },
  modal: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    width: '100%',
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },
  infoRow: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingVertical: 9,
  },
  label: {
    color: colors.muted,
    fontSize: 13,
    marginBottom: 3,
  },
  value: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 16,
  },
});

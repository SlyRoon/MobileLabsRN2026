import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors } from '../constants/colors';
import ActionButton from './ActionButton';

export default function TextInputModal({
  visible,
  title,
  nameLabel,
  nameValue,
  onChangeName,
  contentValue,
  onChangeContent,
  showContentInput = false,
  onCancel,
  onSubmit,
  submitText = 'Створити',
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.label}>{nameLabel}</Text>
          <TextInput
            value={nameValue}
            onChangeText={onChangeName}
            style={styles.input}
            placeholder="Введіть назву"
            autoCapitalize="none"
          />

          {showContentInput && (
            <>
              <Text style={styles.label}>Початковий вміст</Text>
              <TextInput
                value={contentValue}
                onChangeText={onChangeContent}
                style={[styles.input, styles.contentInput]}
                placeholder="Введіть текст файлу"
                multiline
                textAlignVertical="top"
              />
            </>
          )}

          <View style={styles.buttons}>
            <ActionButton
              title="Скасувати"
              variant="secondary"
              onPress={onCancel}
              style={styles.button}
            />
            <ActionButton title={submitText} onPress={onSubmit} style={styles.button} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(17, 24, 39, 0.45)',
    flex: 1,
    justifyContent: 'center',
    padding: 18,
  },
  modal: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 14,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    color: colors.text,
    fontSize: 15,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  contentInput: {
    height: 130,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  button: {
    flex: 1,
  },
});

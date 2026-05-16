import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';

import ActionButton from '../components/ActionButton';
import FileItem from '../components/FileItem';
import InfoModal from '../components/InfoModal';
import MemoryStats from '../components/MemoryStats';
import TextInputModal from '../components/TextInputModal';
import { colors } from '../constants/colors';
import {
  ROOT_DIR,
  buildItemUri,
  ensureTrailingSlash,
  hasInvalidName,
  isTxtFile,
} from '../utils/fileHelpers';
import {
  getFileExtension,
  getRelativePath,
  normalizeTxtFileName,
} from '../utils/formatters';

export default function FileManagerScreen() {
  const [currentDir, setCurrentDir] = useState(ROOT_DIR);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [memoryStats, setMemoryStats] = useState({ total: null, free: null, used: null });
  const [memoryError, setMemoryError] = useState('');

  const [folderModalVisible, setFolderModalVisible] = useState(false);
  const [folderName, setFolderName] = useState('');

  const [fileModalVisible, setFileModalVisible] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');

  const [editorVisible, setEditorVisible] = useState(false);
  const [editorItem, setEditorItem] = useState(null);
  const [editorText, setEditorText] = useState('');
  const [editorSaving, setEditorSaving] = useState(false);

  const [infoItem, setInfoItem] = useState(null);

  useEffect(() => {
    startApp();
  }, []);

  async function startApp() {
    try {
      await initRootDirectory();
      await loadMemoryStats();
      await loadDirectory(ROOT_DIR);
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося підготувати файлову систему.');
      setLoading(false);
    }
  }

  async function initRootDirectory() {
    const rootInfo = await FileSystem.getInfoAsync(ROOT_DIR);

    if (!rootInfo.exists) {
      await FileSystem.makeDirectoryAsync(ROOT_DIR, { intermediates: true });
    }
  }

  async function loadMemoryStats() {
    try {
      const total = await FileSystem.getTotalDiskCapacityAsync();
      const free = await FileSystem.getFreeDiskStorageAsync();

      setMemoryStats({
        total,
        free,
        used: total - free,
      });
      setMemoryError('');
    } catch (error) {
      setMemoryStats({ total: null, free: null, used: null });
      setMemoryError('memory-error');
    }
  }

  async function loadDirectory(dir) {
    const targetDir = ensureTrailingSlash(dir);
    setLoading(true);

    try {
      const names = await FileSystem.readDirectoryAsync(targetDir);
      const nextItems = await Promise.all(
        names.map(async (name) => {
          const rawUri = buildItemUri(targetDir, name);
          const info = await FileSystem.getInfoAsync(rawUri, { size: true });
          const isDirectory = info.isDirectory === true;
          const uri = isDirectory ? ensureTrailingSlash(rawUri) : rawUri;

          return {
            name,
            uri,
            isDirectory,
            type: isDirectory ? 'folder' : getFileExtension(name) || 'file',
            size: info.size,
            modificationTime: info.modificationTime,
            relativePath: getRelativePath(ROOT_DIR, uri),
          };
        }),
      );

      nextItems.sort((first, second) => {
        if (first.isDirectory !== second.isDirectory) {
          return first.isDirectory ? -1 : 1;
        }

        return first.name.localeCompare(second.name);
      });

      setCurrentDir(targetDir);
      setItems(nextItems);
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося прочитати поточну папку.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  async function refreshCurrentDir() {
    await loadMemoryStats();
    await loadDirectory(currentDir);
  }

  function validateName(name, fieldName) {
    if (!name.trim()) {
      Alert.alert('Помилка', `${fieldName} не може бути порожньою.`);
      return false;
    }

    if (hasInvalidName(name)) {
      Alert.alert('Помилка', 'Назва не повинна містити символ /.');
      return false;
    }

    return true;
  }

  function closeFolderModal() {
    setFolderName('');
    setFolderModalVisible(false);
  }

  function closeFileModal() {
    setFileName('');
    setFileContent('');
    setFileModalVisible(false);
  }

  async function createFolder() {
    const cleanName = folderName.trim();

    if (!validateName(cleanName, 'Назва папки')) {
      return;
    }

    const folderUri = ensureTrailingSlash(buildItemUri(currentDir, cleanName));

    try {
      const info = await FileSystem.getInfoAsync(folderUri);

      if (info.exists) {
        Alert.alert('Помилка', 'Папка з такою назвою вже існує.');
        return;
      }

      await FileSystem.makeDirectoryAsync(folderUri);
      closeFolderModal();
      await refreshCurrentDir();
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося створити папку.');
    }
  }

  async function createTxtFile() {
    if (!validateName(fileName, 'Назва файлу')) {
      return;
    }

    const normalizedName = normalizeTxtFileName(fileName);

    if (!validateName(normalizedName, 'Назва файлу')) {
      return;
    }

    const fileUri = buildItemUri(currentDir, normalizedName);

    try {
      const info = await FileSystem.getInfoAsync(fileUri);

      if (info.exists) {
        Alert.alert('Помилка', 'Файл з такою назвою вже існує.');
        return;
      }

      await FileSystem.writeAsStringAsync(fileUri, fileContent);
      closeFileModal();
      await refreshCurrentDir();
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося створити файл.');
    }
  }

  async function openItem(item) {
    if (item.isDirectory) {
      await loadDirectory(item.uri);
      return;
    }

    if (!isTxtFile(item.name)) {
      Alert.alert('Повідомлення', 'Перегляд підтримується тільки для .txt файлів.');
      return;
    }

    try {
      const text = await FileSystem.readAsStringAsync(item.uri);
      setEditorItem(item);
      setEditorText(text);
      setEditorVisible(true);
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося відкрити файл.');
    }
  }

  async function saveEditorFile() {
    if (!editorItem) {
      return;
    }

    setEditorSaving(true);

    try {
      await FileSystem.writeAsStringAsync(editorItem.uri, editorText);
      setEditorVisible(false);
      setEditorItem(null);
      setEditorText('');
      await refreshCurrentDir();
      Alert.alert('Готово', 'Файл збережено.');
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося зберегти файл.');
    } finally {
      setEditorSaving(false);
    }
  }

  function closeEditor() {
    setEditorVisible(false);
    setEditorItem(null);
    setEditorText('');
  }

  async function goUp() {
    const current = ensureTrailingSlash(currentDir);

    if (current === ROOT_DIR) {
      return;
    }

    const withoutTrailingSlash = current.slice(0, -1);
    const parent = ensureTrailingSlash(
      withoutTrailingSlash.substring(0, withoutTrailingSlash.lastIndexOf('/') + 1),
    );

    await loadDirectory(parent.startsWith(ROOT_DIR) ? parent : ROOT_DIR);
  }

  function confirmDelete(item) {
    Alert.alert('Підтвердження', `Видалити "${item.name}"?`, [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Видалити',
        style: 'destructive',
        onPress: () => deleteItem(item),
      },
    ]);
  }

  async function deleteItem(item) {
    try {
      await FileSystem.deleteAsync(item.uri, { idempotent: true });
      await refreshCurrentDir();
    } catch (error) {
      Alert.alert(
        'Помилка',
        item.isDirectory ? 'Не вдалося видалити папку.' : 'Не вдалося видалити файл.',
      );
    }
  }

  function renderHeader() {
    const currentPath = getRelativePath(ROOT_DIR, currentDir);
    const isRoot = currentDir === ROOT_DIR;

    return (
      <View>
        <Text style={styles.title}>Файловий менеджер</Text>
        <Text style={styles.subtitle}>Лабораторна робота №4</Text>

        <MemoryStats stats={memoryStats} error={memoryError} />

        <View style={styles.pathCard}>
          <Text style={styles.pathLabel}>Поточна папка:</Text>
          <Text style={styles.pathValue}>{currentPath}</Text>
        </View>

        <View style={styles.actions}>
          <ActionButton
            title="Нова папка"
            onPress={() => setFolderModalVisible(true)}
            style={styles.topButton}
          />
          <ActionButton
            title="Новий файл"
            onPress={() => setFileModalVisible(true)}
            style={styles.topButton}
          />
          <ActionButton
            title="Оновити"
            variant="secondary"
            onPress={refreshCurrentDir}
            style={styles.topButton}
          />
          {!isRoot && (
            <ActionButton
              title="Вгору"
              variant="secondary"
              onPress={goUp}
              style={styles.topButton}
            />
          )}
        </View>

        <Text style={styles.listTitle}>Вміст папки</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <FileItem
            item={item}
            onOpen={openItem}
            onInfo={setInfoItem}
            onDelete={confirmDelete}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            {loading ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <Text style={styles.emptyText}>Папка порожня</Text>
            )}
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.content}
      />

      <TextInputModal
        visible={folderModalVisible}
        title="Нова папка"
        nameLabel="Назва папки"
        nameValue={folderName}
        onChangeName={setFolderName}
        onCancel={closeFolderModal}
        onSubmit={createFolder}
        submitText="Створити"
      />

      <TextInputModal
        visible={fileModalVisible}
        title="Новий текстовий файл"
        nameLabel="Назва файлу"
        nameValue={fileName}
        onChangeName={setFileName}
        contentValue={fileContent}
        onChangeContent={setFileContent}
        showContentInput
        onCancel={closeFileModal}
        onSubmit={createTxtFile}
        submitText="Створити"
      />

      <InfoModal
        visible={Boolean(infoItem)}
        item={infoItem}
        onClose={() => setInfoItem(null)}
      />

      <Modal visible={editorVisible} transparent animationType="fade" onRequestClose={closeEditor}>
        <KeyboardAvoidingView
          style={styles.editorOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.editorModal}>
            <Text style={styles.editorTitle}>Редагування файлу</Text>
            <Text style={styles.editorName}>{editorItem?.name}</Text>
            <TextInput
              value={editorText}
              onChangeText={setEditorText}
              style={styles.editorInput}
              multiline
              textAlignVertical="top"
              placeholder="Текст файлу"
            />
            <View style={styles.editorButtons}>
              <ActionButton
                title="Закрити"
                variant="secondary"
                onPress={closeEditor}
                style={styles.editorButton}
              />
              <ActionButton
                title={editorSaving ? 'Збереження...' : 'Зберегти'}
                onPress={saveEditorFile}
                disabled={editorSaving}
                style={styles.editorButton}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 4,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    marginBottom: 14,
  },
  pathCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    padding: 14,
  },
  pathLabel: {
    color: colors.muted,
    fontSize: 13,
    marginBottom: 4,
  },
  pathValue: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  topButton: {
    minWidth: '47%',
  },
  listTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },
  emptyBox: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    padding: 24,
  },
  emptyText: {
    color: colors.muted,
    fontSize: 15,
  },
  separator: {
    height: 10,
  },
  editorOverlay: {
    backgroundColor: 'rgba(17, 24, 39, 0.45)',
    flex: 1,
    justifyContent: 'center',
    padding: 18,
  },
  editorModal: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
  },
  editorTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  editorName: {
    color: colors.muted,
    fontSize: 14,
    marginBottom: 10,
    marginTop: 4,
  },
  editorInput: {
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    color: colors.text,
    fontSize: 15,
    height: 220,
    padding: 12,
  },
  editorButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  editorButton: {
    flex: 1,
  },
});

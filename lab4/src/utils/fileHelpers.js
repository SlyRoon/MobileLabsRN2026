import * as FileSystem from 'expo-file-system/legacy';

export const ROOT_FOLDER_NAME = 'lab4-files';
export const ROOT_DIR = `${FileSystem.documentDirectory}${ROOT_FOLDER_NAME}/`;

export function ensureTrailingSlash(path) {
  if (!path) {
    return '';
  }

  return path.endsWith('/') ? path : `${path}/`;
}

export function buildItemUri(currentDir, name) {
  return `${ensureTrailingSlash(currentDir)}${name}`;
}

export function isTxtFile(name) {
  return name.toLowerCase().endsWith('.txt');
}

export function hasInvalidName(name) {
  return name.includes('/');
}

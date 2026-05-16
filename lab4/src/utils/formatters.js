export function formatBytes(bytes) {
  if (bytes === undefined || bytes === null || Number.isNaN(Number(bytes))) {
    return '—';
  }

  const value = Number(bytes);

  if (value < 1024) {
    return `${value} B`;
  }

  const units = ['KB', 'MB', 'GB', 'TB'];
  let size = value / 1024;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  const rounded = size >= 10 ? size.toFixed(1) : size.toFixed(2);
  return `${rounded} ${units[unitIndex]}`;
}

export function formatDate(timestamp) {
  if (!timestamp) {
    return 'Невідомо';
  }

  const milliseconds = timestamp > 10000000000 ? timestamp : timestamp * 1000;
  return new Date(milliseconds).toLocaleString('uk-UA');
}

export function getFileExtension(name) {
  const parts = name.split('.');

  if (parts.length < 2) {
    return '';
  }

  return parts[parts.length - 1].toLowerCase();
}

export function normalizeTxtFileName(name) {
  const trimmed = name.trim();

  if (trimmed.toLowerCase().endsWith('.txt')) {
    return trimmed;
  }

  return `${trimmed}.txt`;
}

export function getRelativePath(rootDir, currentDir) {
  if (!rootDir || !currentDir || currentDir === rootDir) {
    return '/';
  }

  const relative = currentDir.replace(rootDir, '').replace(/\/$/, '');
  return relative ? `/${relative}` : '/';
}

export function generateNews(startId, count) {
  return Array.from({ length: count }, (_, index) => {
    const id = startId + index;

    return {
      id: String(id),
      title: `Новина ${id}`,
      description: `Короткий опис новини ${id}. Тут може бути кілька речень для демонстрації роботи FlatList, переходу на деталі та локальних даних без API.`,
      image: `https://picsum.photos/300/200?random=${id}`,
    };
  });
}

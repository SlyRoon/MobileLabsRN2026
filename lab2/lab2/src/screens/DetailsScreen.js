import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors } from '../styles/colors';

export default function DetailsScreen({ route }) {
  const news = route.params?.news;

  if (!news) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Новину не знайдено</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: news.image }} style={styles.image} />

      <View style={styles.card}>
        <Text style={styles.newsId}>ID новини: {news.id}</Text>
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.description}>{news.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 230,
    borderRadius: 10,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  newsId: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  emptyText: {
    color: colors.muted,
    fontSize: 16,
  },
});

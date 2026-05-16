import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import NewsCard from '../components/NewsCard';
import { generateNews } from '../data/news';
import { colors } from '../styles/colors';

const INITIAL_COUNT = 12;
const LOAD_COUNT = 8;

export default function MainScreen({ navigation }) {
  const [newsList, setNewsList] = useState(() => generateNews(1, INITIAL_COUNT));
  const [nextId, setNextId] = useState(INITIAL_COUNT + 1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setNewsList(generateNews(1, INITIAL_COUNT));
      setNextId(INITIAL_COUNT + 1);
      setRefreshing(false);
    }, 900);
  }, []);

  const loadMoreNews = useCallback(() => {
    if (loadingMore || refreshing) {
      return;
    }

    setLoadingMore(true);

    setTimeout(() => {
      setNewsList((currentNews) => [...currentNews, ...generateNews(nextId, LOAD_COUNT)]);
      setNextId((currentId) => currentId + LOAD_COUNT);
      setLoadingMore(false);
    }, 800);
  }, [loadingMore, nextId, refreshing]);

  const renderItem = ({ item }) => <NewsCard item={item} navigation={navigation} />;

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={newsList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={loadMoreNews}
      onEndReachedThreshold={0.4}
      initialNumToRender={8}
      maxToRenderPerBatch={8}
      windowSize={5}
      ListHeaderComponent={
        <View style={styles.header}>
          <View>
            <Text style={styles.screenTitle}>Новини</Text>
            <Text style={styles.subtitle}>Локальний список з FlatList</Text>
          </View>

          <Pressable style={styles.menuButton} onPress={() => navigation.getParent()?.openDrawer()}>
            <Text style={styles.menuButtonText}>Меню</Text>
          </Pressable>
        </View>
      }
      ListFooterComponent={
        <View style={styles.footer}>
          {loadingMore ? (
            <>
              <ActivityIndicator color={colors.primary} />
              <Text style={styles.footerText}>Завантаження новин...</Text>
            </>
          ) : (
            <Text style={styles.footerText}>Прокрутіть нижче, щоб завантажити ще</Text>
          )}
        </View>
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  screenTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 3,
  },
  menuButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  menuButtonText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '700',
  },
  separator: {
    height: 14,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 64,
    paddingTop: 10,
  },
  footerText: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
  },
});

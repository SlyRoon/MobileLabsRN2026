import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import ProductCard from '../../components/ProductCard';
import { colors } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import { products } from '../../data/products';

export default function CatalogScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    router.replace('/login');
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.studentBlock}>
          <Text style={styles.title}>Каталог товарів</Text>
          <Text style={styles.subtitle}>Данілін Кирило Сергійович, ВТ-24-1, підгрупа 1</Text>
          <Text style={styles.greeting}>Вітаємо, {user?.name || 'користувачу'}!</Text>
        </View>
        <AppButton title="Вийти" onPress={handleLogout} variant="danger" />
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.card,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    padding: 16,
  },
  studentBlock: {
    marginBottom: 12,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  greeting: {
    color: colors.text,
    fontSize: 16,
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  separator: {
    height: 14,
  },
});

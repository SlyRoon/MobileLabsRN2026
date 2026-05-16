import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import { colors } from '../../../constants/colors';
import { products } from '../../../data/products';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const product = products.find((item) => item.id === String(id));

  if (!product) {
    return (
      <View style={styles.notFoundScreen}>
        <Stack.Screen options={{ title: 'Товар не знайдено' }} />
        <Text style={styles.notFoundTitle}>Товар не знайдено</Text>
        <Text style={styles.notFoundText}>Можливо, товар був видалений або адреса неправильна.</Text>
        <Link href="/" asChild>
          <AppButton title="До каталогу" />
        </Link>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: product.title }} />
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.card}>
        <Text style={styles.id}>Код товару: {product.id}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{product.price} грн</Text>
        <Text style={styles.description}>{product.description}</Text>

        <Link href="/" asChild>
          <AppButton title="Назад до каталогу" variant="secondary" />
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  image: {
    borderRadius: 8,
    height: 220,
    marginBottom: 16,
    width: '100%',
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  id: {
    color: colors.muted,
    fontSize: 13,
    marginBottom: 8,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
  },
  price: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 14,
  },
  description: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 20,
  },
  notFoundScreen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  notFoundTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  notFoundText: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
});

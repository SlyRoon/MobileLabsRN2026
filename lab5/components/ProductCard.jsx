import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

export default function ProductCard({ product }) {
  return (
    <Link href={`/details/${product.id}`} asChild>
      <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.shortDescription}</Text>
          <View style={styles.bottomRow}>
            <Text style={styles.price}>{product.price} грн</Text>
            <Text style={styles.more}>Детальніше</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    height: 150,
    width: '100%',
  },
  content: {
    padding: 14,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  bottomRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  more: {
    color: colors.primaryDark,
    fontSize: 14,
    fontWeight: '600',
  },
});

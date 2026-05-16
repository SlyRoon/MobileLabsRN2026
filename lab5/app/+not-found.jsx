import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import { colors } from '../constants/colors';

export default function NotFoundScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Екран не знайдено</Text>
      <Text style={styles.text}>Такої сторінки немає або адреса була введена неправильно.</Text>
      <Link href="/" asChild>
        <AppButton title="Повернутися на головну" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
});

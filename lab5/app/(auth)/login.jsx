import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import FormInput from '../../components/FormInput';
import { colors } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    const result = login(email, password);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setError('');
    router.replace('/');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Вхід</Text>
        <Text style={styles.subtitle}>Увійдіть, щоб перейти до каталогу товарів</Text>

        <FormInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="student@example.com"
          keyboardType="email-address"
        />
        <FormInput
          label="Пароль"
          value={password}
          onChangeText={setPassword}
          placeholder="Введіть пароль"
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AppButton title="Увійти" onPress={handleLogin} />

        <Link href="/register" style={styles.link}>
          Немає акаунту? Зареєструватися
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 20,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 22,
  },
  error: {
    color: colors.danger,
    fontSize: 14,
    marginBottom: 12,
  },
  link: {
    color: colors.primary,
    fontSize: 15,
    marginTop: 18,
    textAlign: 'center',
  },
});

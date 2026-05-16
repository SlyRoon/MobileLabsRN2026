import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import FormInput from '../../components/FormInput';
import { colors } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function handleRegister() {
    if (password !== confirmPassword) {
      setError('Паролі не збігаються.');
      return;
    }

    const result = register(email, password, name);

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
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Реєстрація</Text>
          <Text style={styles.subtitle}>Створіть простий акаунт для входу в каталог</Text>

          <FormInput
            label="Ім'я"
            value={name}
            onChangeText={setName}
            placeholder="Ваше ім'я"
          />
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
            placeholder="Мінімум 4 символи"
            secureTextEntry
          />
          <FormInput
            label="Підтвердження паролю"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Повторіть пароль"
            secureTextEntry
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <AppButton title="Зареєструватися" onPress={handleRegister} />

          <Link href="/login" style={styles.link}>
            Уже є акаунт? Увійти
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
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

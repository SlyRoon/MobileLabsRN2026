import { Redirect, Stack } from 'expo-router';
import { colors } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Каталог товарів' }} />
      <Stack.Screen name="details/[id]" options={{ title: 'Деталі товару' }} />
    </Stack>
  );
}

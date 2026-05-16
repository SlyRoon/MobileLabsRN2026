import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from '../components/CustomDrawerContent';
import ContactsScreen from '../screens/ContactsScreen';
import { colors } from '../styles/colors';
import NewsStack from './NewsStack';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerActiveTintColor: colors.primary,
          drawerInactiveTintColor: colors.text,
          drawerStyle: { backgroundColor: colors.background },
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Drawer.Screen
          name="NewsStack"
          component={NewsStack}
          options={{
            title: 'Новини',
            drawerLabel: 'Новини',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Contacts"
          component={ContactsScreen}
          options={{
            title: 'Контакти',
            drawerLabel: 'Контакти',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

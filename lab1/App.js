import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Header />

        <View style={styles.tabsBlock}>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#2563eb',
              tabBarInactiveTintColor: '#64748b',
              tabBarIndicatorStyle: { backgroundColor: '#2563eb' },
              tabBarLabelStyle: styles.tabLabel,
              tabBarStyle: styles.tabBar,
            }}
          >
            <Tab.Screen name="Головна" component={HomeScreen} />
            <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
            <Tab.Screen name="Профіль" component={ProfileScreen} />
          </Tab.Navigator>
        </View>

        <Footer />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabsBlock: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#ffffff',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});

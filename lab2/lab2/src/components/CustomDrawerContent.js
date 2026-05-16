import { StyleSheet, Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import { colors } from '../styles/colors';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>ДК</Text>
        </View>

        <Text style={styles.name}>Данілін Кирило Сергійович</Text>
        <Text style={styles.info}>Група: ВТ-24-1</Text>
        <Text style={styles.info}>Підгрупа: 1</Text>
        <Text style={styles.info}>Телефон: 0672578488</Text>
      </View>

      <View style={styles.menu}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  profile: {
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 18,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 58,
    height: 58,
    backgroundColor: colors.primary,
    borderRadius: 29,
    marginBottom: 12,
  },
  avatarText: {
    color: colors.card,
    fontSize: 20,
    fontWeight: '700',
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  info: {
    color: colors.muted,
    fontSize: 14,
    marginBottom: 3,
  },
  menu: {
    paddingTop: 10,
  },
});

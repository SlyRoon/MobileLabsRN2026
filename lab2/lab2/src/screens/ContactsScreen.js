import { SectionList, StyleSheet, Text, View } from 'react-native';

import { contactsSections } from '../data/contacts';
import { colors } from '../styles/colors';

export default function ContactsScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.role}>{item.role}</Text>
      <Text style={styles.phone}>Телефон: {item.phone}</Text>
    </View>
  );

  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
    </View>
  );

  return (
    <SectionList
      style={styles.container}
      contentContainerStyle={styles.content}
      sections={contactsSections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  sectionHeader: {
    backgroundColor: colors.background,
    paddingBottom: 8,
    paddingTop: 14,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  role: {
    color: colors.muted,
    fontSize: 14,
    marginBottom: 8,
  },
  phone: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  separator: {
    height: 10,
  },
});

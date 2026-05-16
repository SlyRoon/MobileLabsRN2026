import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const newsList = [
  {
    id: 1,
    title: 'Створено перший екран додатку',
    date: '09.05.2026',
    text: 'У проєкті налаштовано головну сторінку зі списком простих новин.',
  },
  {
    id: 2,
    title: 'Додано навігацію між вкладками',
    date: '09.05.2026',
    text: 'Для переходу між екранами використовується Material Top Tabs.',
  },
  {
    id: 3,
    title: 'Підготовлено фотогалерею',
    date: '08.05.2026',
    text: 'На другому екрані показана проста сітка з картками фотографій.',
  },
  {
    id: 4,
    title: 'Створено форму реєстрації',
    date: '08.05.2026',
    text: 'Форма має кілька полів для введення даних користувача.',
  },
  {
    id: 5,
    title: 'Використано базові компоненти',
    date: '07.05.2026',
    text: 'У роботі використані View, Text, Image, ScrollView та TextInput.',
  },
  {
    id: 6,
    title: 'Оформлено README',
    date: '07.05.2026',
    text: 'До лабораторної роботи додано опис, інструкцію запуску і місце для скріншотів.',
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.screenTitle}>Новини</Text>

      {newsList.map((news) => (
        <View style={styles.card} key={news.id}>
          <Image source={require('../assets/icon.png')} style={styles.image} />
          <View style={styles.cardText}>
            <Text style={styles.newsTitle}>{news.title}</Text>
            <Text style={styles.date}>{news.date}</Text>
            <Text style={styles.description}>{news.text}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 14,
  },
  card: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
  },
  image: {
    width: 58,
    height: 58,
    borderRadius: 8,
    marginRight: 12,
  },
  cardText: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  date: {
    marginTop: 4,
    fontSize: 12,
    color: '#6b7280',
  },
  description: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 19,
    color: '#374151',
  },
});

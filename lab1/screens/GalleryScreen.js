import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const photos = [
  'Фото 1',
  'Фото 2',
  'Фото 3',
  'Фото 4',
  'Фото 5',
  'Фото 6',
  'Фото 7',
  'Фото 8',
];

export default function GalleryScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.screenTitle}>Фотогалерея</Text>

      <View style={styles.grid}>
        {photos.map((photo) => (
          <View style={styles.photoCard} key={photo}>
            <View style={styles.photoBox}>
              <Image source={require('../assets/icon.png')} style={styles.image} />
            </View>
            <Text style={styles.photoText}>{photo}</Text>
          </View>
        ))}
      </View>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photoCard: {
    width: '48%',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  photoBox: {
    height: 100,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 54,
    height: 54,
    borderRadius: 8,
  },
  photoText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
    color: '#374151',
  },
});

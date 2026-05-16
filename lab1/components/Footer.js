import { View, Text, StyleSheet } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>Данілін Кирило Сергійович</Text>
      <Text style={styles.text}>Група VT-24-1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  text: {
    fontSize: 13,
    color: "#475569",
  },
});

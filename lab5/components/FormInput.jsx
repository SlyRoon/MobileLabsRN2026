import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../constants/colors';

export default function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        style={styles.input}
        placeholderTextColor={colors.muted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
});

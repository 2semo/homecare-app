import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '../constants/colors';

interface Props {
  label: string;
  onPress: () => void;
}

export default function KeywordChip({ label, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.chip, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityLabel={`${label} 검색`}
      accessibilityRole="button"
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: Colors.primaryBadgeBg,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
  },
});

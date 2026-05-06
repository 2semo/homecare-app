import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import type { Service } from '../types/service';

interface Props {
  service: Service;
  onPress: () => void;
}

export default function ServiceCardHorizontal({ service, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityLabel={`인기 서비스: ${service.name}, ${service.price}`}
      accessibilityRole="button"
    >
      <View style={styles.iconBox}>
        <MaterialCommunityIcons
          name={service.iconName as any}
          size={22}
          color={Colors.primary}
        />
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {service.name}
      </Text>
      <Text style={styles.price}>{service.price}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: Colors.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.primaryBadgeBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 6,
    lineHeight: 20,
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
});

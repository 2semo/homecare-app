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
          size={20}
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
    width: 148,
    backgroundColor: Colors.sectionBg,
    borderRadius: 18,
    padding: 14,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
    letterSpacing: -0.4,
    marginBottom: 4,
    lineHeight: 18,
  },
  price: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
    letterSpacing: -0.2,
  },
});

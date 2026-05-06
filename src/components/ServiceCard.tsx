import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import type { Service } from '../types/service';

interface Props {
  service: Service;
  onPress: () => void;
}

export default function ServiceCard({ service, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityLabel={`${service.name}, ${service.price}`}
      accessibilityRole="button"
    >
      {service.isPopular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>인기</Text>
        </View>
      )}
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
    flex: 1,
    backgroundColor: Colors.sectionBg,
    borderRadius: 18,
    padding: 16,
    paddingBottom: 14,
    marginBottom: 12,
    position: 'relative',
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  popularBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.popularBadge,
    borderRadius: 9999,
    paddingHorizontal: 7,
    paddingVertical: 3,
    zIndex: 1,
  },
  popularText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    letterSpacing: -0.4,
    marginBottom: 4,
    lineHeight: 20,
  },
  price: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
    letterSpacing: -0.2,
  },
});

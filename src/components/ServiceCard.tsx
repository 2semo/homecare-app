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
      <View style={styles.iconBox}>
        <MaterialCommunityIcons
          name={service.iconName as any}
          size={24}
          color={Colors.primary}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {service.name}
        </Text>
        <Text style={styles.meta}>
          {service.category} · {service.duration}
        </Text>
        <Text style={styles.price}>{service.price}</Text>
      </View>

      {service.isPopular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>인기</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    marginBottom: 10,
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
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: Colors.primaryBadgeBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    flexShrink: 0,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  meta: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  popularBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.popularBadge,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  popularText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

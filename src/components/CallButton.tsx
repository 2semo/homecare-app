import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';

interface Props {
  onPress: () => void;
  disabled?: boolean;
  serviceName: string;
}

export default function CallButton({ onPress, disabled = false, serviceName }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      accessibilityLabel={`${serviceName} 문의하기, 전화 연결`}
      accessibilityRole="button"
    >
      <View style={styles.inner}>
        <View style={styles.ring}>
          <MaterialCommunityIcons name="phone" size={16} color="#FFFFFF" />
        </View>
        <Text style={styles.text}>문의하기</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 9999,
    marginHorizontal: 16,
    paddingVertical: 16,
    shadowColor: Colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  disabled: {
    backgroundColor: Colors.ctaDisabled,
    shadowOpacity: 0,
    elevation: 0,
  },
  pressed: {
    opacity: 0.85,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
});

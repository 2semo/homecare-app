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
      accessibilityLabel={`${serviceName} 신청하기, 전화 연결`}
      accessibilityRole="button"
    >
      <View style={styles.inner}>
        <MaterialCommunityIcons name="phone" size={20} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.text}>신청하기</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    marginHorizontal: 16,
    paddingVertical: 16,
  },
  disabled: {
    backgroundColor: Colors.ctaDisabled,
  },
  pressed: {
    opacity: 0.85,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

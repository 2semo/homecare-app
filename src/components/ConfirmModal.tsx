import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';

interface Props {
  visible: boolean;
  serviceName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  visible,
  serviceName,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <MaterialCommunityIcons name="phone" size={40} color={Colors.primary} />

          <Text style={styles.name}>{serviceName}</Text>
          <Text style={styles.guide}>신청 전화를 연결할까요?</Text>

          <View style={styles.buttons}>
            <Pressable
              style={({ pressed }) => [styles.btn, styles.cancelBtn, pressed && styles.pressed]}
              onPress={onCancel}
              accessibilityLabel="전화 연결 취소"
            >
              <Text style={styles.cancelText}>취소</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.btn, styles.confirmBtn, pressed && styles.pressed]}
              onPress={onConfirm}
              accessibilityLabel="전화 연결 확인"
            >
              <Text style={styles.confirmText}>전화하기</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    marginHorizontal: 32,
    padding: 24,
    alignItems: 'center',
    width: '85%',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 12,
    textAlign: 'center',
  },
  guide: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    width: '100%',
  },
  btn: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: Colors.sectionBg,
  },
  confirmBtn: {
    backgroundColor: Colors.primary,
  },
  pressed: {
    opacity: 0.8,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textBody,
  },
  confirmText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

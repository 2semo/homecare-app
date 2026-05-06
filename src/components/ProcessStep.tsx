import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import type { ProcessStep as ProcessStepType } from '../types/service';

interface Props {
  steps: ProcessStepType[];
}

export default function ProcessStepList({ steps }: Props) {
  return (
    <View style={styles.container}>
      {steps.map((item, index) => (
        <View key={item.step} style={styles.row}>
          <View style={styles.left}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.step}</Text>
            </View>
            {index < steps.length - 1 && <View style={styles.line} />}
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  left: {
    alignItems: 'center',
    width: 24,
    marginRight: 14,
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  line: {
    width: 1,
    height: 28,
    backgroundColor: Colors.border,
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  desc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

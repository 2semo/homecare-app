import { useRef } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { Colors } from '../constants/colors';
import type { CategoryFilter } from '../types/service';

const TABS: { label: string; value: CategoryFilter }[] = [
  { label: '전체', value: 'all' },
  { label: '가전 클리닝', value: '가전클리닝' },
  { label: '홈 클리닝', value: '홈클리닝' },
  { label: '윈도우ALL케어', value: '윈도우ALL케어' },
  { label: '이전·설치', value: '이전설치' },
];

interface Props {
  selected: CategoryFilter;
  onSelect: (value: CategoryFilter) => void;
}

export default function CategoryTab({ selected, onSelect }: Props) {
  const scrollRef = useRef<ScrollView>(null);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.content}
    >
      {TABS.map((tab) => {
        const active = selected === tab.value;
        return (
          <Pressable
            key={tab.value}
            style={({ pressed }) => [
              styles.chip,
              active && styles.chipActive,
              pressed && !active && styles.chipPressed,
            ]}
            onPress={() => onSelect(tab.value)}
            accessibilityLabel={`${tab.label} 카테고리`}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexShrink: 0,
    backgroundColor: Colors.cardBg,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },
  chip: {
    backgroundColor: Colors.cardBg,
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: {
    backgroundColor: Colors.textPrimary,
    borderColor: Colors.textPrimary,
  },
  chipPressed: {
    opacity: 0.7,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
});

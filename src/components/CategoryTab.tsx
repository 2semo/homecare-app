import { useRef } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { Colors } from '../constants/colors';
import type { CategoryFilter } from '../types/service';

const TABS: { label: string; value: CategoryFilter }[] = [
  { label: '전체', value: 'all' },
  { label: '가전 클리닝', value: '가전클리닝' },
  { label: '홈 클리닝', value: '홈클리닝' },
  { label: '이전·설치', value: '이전설치' },
  { label: '윈도우ALL케어', value: '윈도우ALL케어' },
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
              styles.tab,
              active && styles.tabActive,
              pressed && !active && styles.tabPressed,
            ]}
            onPress={() => onSelect(tab.value)}
            accessibilityLabel={`${tab.label} 카테고리`}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
          >
            <Text style={[styles.tabText, active && styles.tabTextActive]}>
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
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  tab: {
    backgroundColor: Colors.sectionBg,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabPressed: {
    opacity: 0.7,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
});

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmptyState from '@/components/EmptyState';
import KeywordChip from '@/components/KeywordChip';
import ServiceCard from '@/components/ServiceCard';
import { Colors } from '@/constants/colors';
import { SERVICES } from '@/data/services';
import { filterServices } from '@/lib/search';
import type { Service } from '@/types/service';

const SUGGESTED_KEYWORDS = ['에어컨', '세탁기', '냉장고', '청소', '이전설치', '클리닝'];

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState('');

  const results = query.trim() ? filterServices(SERVICES, query) : [];
  const hasSearched = query.trim().length > 0;

  const handleKeyword = useCallback((keyword: string) => {
    setQuery(keyword);
    inputRef.current?.focus();
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
    inputRef.current?.focus();
  }, []);

  const handleServicePress = useCallback((service: Service) => {
    router.push(`/service/${service.id}`);
  }, [router]);

  const renderServiceItem = useCallback(({ item }: { item: Service }) => (
    <ServiceCard service={item} onPress={() => handleServicePress(item)} />
  ), [handleServicePress]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={Colors.cardBg} />

      {/* 검색 헤더 */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.inputRow}>
          <MaterialCommunityIcons
            name="magnify"
            size={20}
            color={Colors.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            placeholder="서비스명, 가전 종류로 검색"
            placeholderTextColor={Colors.textDisabled}
            returnKeyType="search"
            clearButtonMode="never"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <Pressable onPress={handleClear} hitSlop={8}>
              <MaterialCommunityIcons name="close-circle" size={18} color={Colors.textDisabled} />
            </Pressable>
          )}
        </View>
      </View>

      {/* 추천 검색어 */}
      {!hasSearched && (
        <View style={styles.suggestSection}>
          <Text style={styles.suggestLabel}>추천 검색어</Text>
          <View style={styles.chipRow}>
            {SUGGESTED_KEYWORDS.map((kw) => (
              <KeywordChip key={kw} label={kw} onPress={() => handleKeyword(kw)} />
            ))}
          </View>
        </View>
      )}

      {/* 검색 결과 */}
      {hasSearched && (
        results.length > 0 ? (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={renderServiceItem}
            contentContainerStyle={styles.resultList}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            ListHeaderComponent={
              <Text style={styles.resultCount}>{results.length}개의 서비스</Text>
            }
          />
        ) : (
          <EmptyState
            message={`"${query}" 검색 결과가 없습니다`}
            subMessage="다른 키워드로 검색하거나\n추천 검색어를 이용해보세요"
            actionLabel="전체 보기"
            onAction={() => setQuery('')}
          />
        )
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pageBg,
  },
  header: {
    backgroundColor: Colors.cardBg,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.sectionBg,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  suggestSection: {
    backgroundColor: Colors.cardBg,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  suggestLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resultList: {
    paddingTop: 4,
    paddingBottom: 16,
  },
  resultCount: {
    fontSize: 13,
    color: Colors.textSecondary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

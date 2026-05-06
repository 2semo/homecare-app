import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CategoryTab from '@/components/CategoryTab';
import ServiceCard from '@/components/ServiceCard';
import ServiceCardHorizontal from '@/components/ServiceCardHorizontal';
import { Colors } from '@/constants/colors';
import { POPULAR_SERVICES, SERVICES } from '@/data/services';
import type { CategoryFilter, Service } from '@/types/service';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const filtered = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  const handleServicePress = useCallback((service: Service) => {
    router.push(`/service/${service.id}`);
  }, [router]);

  const renderServiceItem = useCallback(({ item }: { item: Service }) => (
    <ServiceCard service={item} onPress={() => handleServicePress(item)} />
  ), [handleServicePress]);

  const ListHeader = (
    <View>
      {/* 헤더 */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>홈케어 서비스</Text>
        <Text style={styles.headerSub}>롯데하이마트 안산선부</Text>
      </View>

      {/* 인기 서비스 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>인기 서비스</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.popularList}
        >
          {POPULAR_SERVICES.map((service) => (
            <ServiceCardHorizontal
              key={service.id}
              service={service}
              onPress={() => handleServicePress(service)}
            />
          ))}
        </ScrollView>
      </View>

      {/* 전체 서비스 */}
      <View style={styles.allServicesHeader}>
        <Text style={styles.sectionTitle}>전체 서비스</Text>
      </View>

      {/* 카테고리 탭 */}
      <CategoryTab selected={activeCategory} onSelect={setActiveCategory} />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.cardBg} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderServiceItem}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pageBg,
  },
  header: {
    backgroundColor: Colors.cardBg,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  headerSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  section: {
    marginTop: 16,
    backgroundColor: Colors.cardBg,
    paddingTop: 16,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  popularList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  allServicesHeader: {
    backgroundColor: Colors.cardBg,
    marginTop: 8,
    paddingTop: 16,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  listContent: {
    paddingBottom: 16,
  },
});

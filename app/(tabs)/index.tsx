import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CategoryTab from '@/components/CategoryTab';
import ConfirmModal from '@/components/ConfirmModal';
import ServiceCard from '@/components/ServiceCard';
import { Colors } from '@/constants/colors';
import { PHONE, POPULAR_SERVICES, SERVICES } from '@/data/services';
import { makeCall } from '@/lib/phone';
import type { CategoryFilter, Service } from '@/types/service';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [modalVisible, setModalVisible] = useState(false);

  const filtered = (() => {
    if (activeCategory !== 'all') {
      return SERVICES.filter((s) => s.category === activeCategory);
    }
    const popularIds = new Set(POPULAR_SERVICES.map((s) => s.id));
    const rest = SERVICES.filter((s) => !popularIds.has(s.id));
    return [...POPULAR_SERVICES, ...rest];
  })();

  const handleServicePress = useCallback((service: Service) => {
    router.push(`/service/${service.id}`);
  }, [router]);

  const handleCallConfirm = useCallback(async () => {
    setModalVisible(false);
    await makeCall(PHONE);
  }, []);

  const renderServiceItem = useCallback(({ item }: { item: Service }) => (
    <ServiceCard service={item} onPress={() => handleServicePress(item)} />
  ), [handleServicePress]);

  const ListHeader = (
    <View>
      {/* ── 헤더 ── */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerRow}>
          <View style={styles.headerBrand}>
            <View style={styles.lotteMark}>
              <Text style={styles.lotteMarkText}>LOTTE Hi-MART</Text>
            </View>
            <Text style={styles.headerStore}>안산선부점</Text>
          </View>
          <Pressable
            style={({ pressed }) => [styles.callBtn, pressed && { opacity: 0.85 }]}
            onPress={() => setModalVisible(true)}
            accessibilityLabel="전화 문의하기"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons name="phone" size={15} color="#FFFFFF" />
            <Text style={styles.callBtnText}>문의하기</Text>
          </Pressable>
        </View>
      </View>

      {/* ── 히어로 ── */}
      <View style={styles.hero}>
        <View style={styles.heroEyebrowPill}>
          <Text style={styles.heroEyebrowText}>안산선부점 홈케어</Text>
        </View>
        <Text style={styles.heroTitle}>{'믿을 수 있는\n홈케어, 동네에서.'}</Text>
        <Text style={styles.heroSub}>
          {'에어컨청소부터 입주청소·방충망시공까지.\n롯데하이마트 안산선부점에서\n직접 관리하는 홈케어 서비스입니다.'}
        </Text>
        <View style={styles.heroMeta}>
          <Text style={styles.heroMetaText}>평일·주말 10–20시</Text>
          <Text style={styles.heroMetaDot}>·</Text>
          <Text style={styles.heroMetaText}>당일 견적</Text>
        </View>
      </View>

      {/* ── 통계 스트립 ── */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNum}>
            12,400<Text style={styles.statAccent}>+</Text>
          </Text>
          <Text style={styles.statLabel}>누적 시공</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNum}>
            4.9<Text style={styles.statAccent}>/5</Text>
          </Text>
          <Text style={styles.statLabel}>평균 별점</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNum}>당일</Text>
          <Text style={styles.statLabel}>견적 회신</Text>
        </View>
      </View>

      {/* ── 전체 서비스 섹션 헤더 ── */}
      <View style={styles.sectionHead}>
        <Text style={styles.sectionEyebrow}>SERVICES</Text>
        <Text style={styles.sectionTitle}>전체 서비스</Text>
        <Text style={styles.sectionSub}>직영 기사가 직접 방문해 깨끗하게 마무리합니다.</Text>
      </View>

      {/* ── 카테고리 칩 ── */}
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
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
      <ConfirmModal
        visible={modalVisible}
        serviceName="롯데하이마트 안산선부"
        onConfirm={handleCallConfirm}
        onCancel={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pageBg,
  },

  // ── 헤더
  header: {
    backgroundColor: Colors.cardBg,
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.04)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  lotteMark: {
    backgroundColor: Colors.lotteRed,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  lotteMarkText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  headerStore: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '400',
    letterSpacing: -0.3,
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 9999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
  },
  callBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },

  // ── 히어로
  hero: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
    backgroundColor: '#FAFCFF',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.dividerSoft,
  },
  heroEyebrowPill: {
    backgroundColor: Colors.primaryFaint,
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 16,
  },
  heroEyebrowText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
    letterSpacing: 0.2,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -1.4,
    lineHeight: 44,
    textAlign: 'center',
    marginBottom: 14,
  },
  heroSub: {
    fontSize: 15,
    lineHeight: 23,
    color: Colors.textSecondary,
    letterSpacing: -0.3,
    textAlign: 'center',
    marginBottom: 22,
  },
  heroMeta: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  heroMetaText: {
    fontSize: 12,
    color: Colors.textSecondary,
    letterSpacing: -0.2,
  },
  heroMetaDot: {
    fontSize: 12,
    color: '#C5C5CB',
  },

  // ── 통계 스트립
  stats: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBg,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dividerSoft,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNum: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.7,
  },
  statAccent: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    letterSpacing: -0.2,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.dividerSoft,
    marginVertical: 4,
  },

  // ── 전체 서비스 섹션 헤더
  sectionHead: {
    backgroundColor: Colors.cardBg,
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 8,
    marginTop: 8,
  },
  sectionEyebrow: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: 0.4,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.7,
    marginBottom: 4,
  },
  sectionSub: {
    fontSize: 14,
    color: Colors.textSecondary,
    letterSpacing: -0.3,
  },

  // ── 그리드
  gridRow: {
    paddingHorizontal: 20,
    gap: 12,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: Colors.pageBg,
  },
});

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Linking, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CallButton from '@/components/CallButton';
import ConfirmModal from '@/components/ConfirmModal';
import EmptyState from '@/components/EmptyState';
import ProcessStepList from '@/components/ProcessStep';
import { Colors } from '@/constants/colors';
import { getServiceById } from '@/data/services';
import { makeCall } from '@/lib/phone';
import type { Category } from '@/types/service';

const CTA_HEIGHT = 72;

const CATEGORY_GUARANTEE: Record<Category, { icon: string; title: string; desc: string }> = {
  '가전클리닝': {
    icon: 'shield-check',
    title: '가전 수리비 1년 무상 보증',
    desc: '클리닝 완료 후 1년간 고장수리비 보장보험 100% 제공',
  },
  '홈클리닝': {
    icon: 'currency-usd-off',
    title: '추가요금 Zero 보증',
    desc: '사전 미고지 추가요금 발생 시 100% 환급 + 2만 L.Point 지급',
  },
  '이전설치': {
    icon: 'shield-check',
    title: '이사 가전 수리비 1년 보증',
    desc: '이전설치 완료 후 1년간 고장수리비 보장보험 100% 제공',
  },
  '윈도우ALL케어': {
    icon: 'window-check',
    title: '시공 품질 14일 무상 재시공',
    desc: '시공 후 14일 이내 품질 불량 시 무상 재시공 100% 보장',
  },
};

const COMMON_GUARANTEES = [
  {
    icon: 'clock-check-outline',
    title: '시간약속 100% 이행',
    desc: '방문 일자·시공시간 미준수 시 2만 L.Point 즉시 지급',
  },
  {
    icon: 'wrench-check',
    title: 'AS 90일 무상 재수리',
    desc: 'AS 완료 후 90일 이내 동일 증상 발생 시 무상 재수리 + 2만 L.Point',
  },
  {
    icon: 'refresh-circle',
    title: '품질 불량 14일 무상 재시공',
    desc: '서비스 후 14일 이내 품질 불량 시 무상 재시공 100%',
  },
];

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);

  const service = getServiceById(id ?? '');

  const handleCallConfirm = useCallback(async () => {
    setModalVisible(false);
    if (service) {
      await makeCall(service.phone);
    }
  }, [service]);

  const handleQuotation = useCallback(() => {
    if (service?.quotationUrl) {
      Linking.openURL(service.quotationUrl);
    }
  }, [service]);

  if (!service) {
    return (
      <View style={styles.container}>
        <EmptyState
          message="서비스를 찾을 수 없습니다"
          subMessage="요청하신 서비스 정보가 없습니다"
          actionLabel="홈으로 돌아가기"
          onAction={() => router.replace('/')}
          iconName="alert-circle-outline"
        />
      </View>
    );
  }

  const ctaBottom = insets.bottom + 16;
  const categoryGuarantee = CATEGORY_GUARANTEE[service.category];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.cardBg} />

      {/* 상단 헤더 */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={28}
          color={Colors.textPrimary}
          onPress={() => router.back()}
          accessibilityLabel="뒤로 가기"
        />
        <Text style={styles.headerTitle} numberOfLines={1}>
          {service.name}
        </Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: CTA_HEIGHT + ctaBottom + 16 },
        ]}
      >
        {/* 서비스 대표 정보 */}
        <View style={styles.heroCard}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons
              name={service.iconName as any}
              size={40}
              color={Colors.primary}
            />
          </View>
          <View style={styles.heroInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.serviceName}>{service.name}</Text>
              {service.isPopular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>인기</Text>
                </View>
              )}
            </View>
            <Text style={styles.categoryText}>{service.category} · {service.duration}</Text>
          </View>
        </View>

        {/* 가격 */}
        <View style={styles.section}>
          <SectionTitle title="서비스 요금" />
          <View style={styles.priceBox}>
            <Text style={styles.priceValue}>{service.price}</Text>
            {service.priceNote && (
              <Text style={styles.priceNote}>{service.priceNote}</Text>
            )}
          </View>
        </View>

        {/* 상세 견적 */}
        {service.quotationUrl && (
          <View style={styles.section}>
            <Pressable
              style={({ pressed }) => [styles.quotationBtn, pressed && styles.quotationBtnPressed]}
              onPress={handleQuotation}
              accessibilityLabel="상세 견적 확인하기"
              accessibilityRole="link"
            >
              <MaterialCommunityIcons name="calculator-variant-outline" size={20} color="#FFFFFF" />
              <Text style={styles.quotationBtnText}>상세 견적 확인하기</Text>
              <MaterialCommunityIcons name="open-in-new" size={16} color="rgba(255,255,255,0.75)" />
            </Pressable>
            <Text style={styles.quotationNote}>정확한 견적은 위 링크에서 확인하세요</Text>
          </View>
        )}

        {/* 안심 보증 혜택 — 카테고리별 대표 보증 */}
        <View style={styles.guaranteeSection}>
          <View style={styles.guaranteeHeader}>
            <MaterialCommunityIcons name="shield-star" size={18} color="#FFFFFF" />
            <Text style={styles.guaranteeHeaderText}>하이마트 안심케어 100% 보증제</Text>
          </View>

          {/* 카테고리별 핵심 보증 */}
          <View style={styles.guaranteeMainCard}>
            <MaterialCommunityIcons
              name={categoryGuarantee.icon as any}
              size={24}
              color={Colors.guarantee}
            />
            <View style={styles.guaranteeMainInfo}>
              <Text style={styles.guaranteeMainTitle}>{categoryGuarantee.title}</Text>
              <Text style={styles.guaranteeMainDesc}>{categoryGuarantee.desc}</Text>
            </View>
          </View>

          {/* 공통 보증 */}
          {COMMON_GUARANTEES.map((g, i) => (
            <View key={i} style={styles.guaranteeRow}>
              <MaterialCommunityIcons name={g.icon as any} size={18} color={Colors.guarantee} />
              <View style={styles.guaranteeInfo}>
                <Text style={styles.guaranteeTitle}>{g.title}</Text>
                <Text style={styles.guaranteeDesc}>{g.desc}</Text>
              </View>
            </View>
          ))}

          <Text style={styles.guaranteeNote}>
            ※ 방문 미준수 시 2만 L.Point는 L.POINT 통합회원가입 필수
          </Text>
        </View>

        {/* 이런 분께 추천 */}
        <View style={styles.section}>
          <SectionTitle title="이런 분께 추천해요" />
          <Text style={styles.reasonText}>{service.reason}</Text>
        </View>

        {/* 서비스 포인트 */}
        <View style={styles.section}>
          <SectionTitle title="서비스 포인트" />
          {service.highlights.map((item, i) => (
            <View key={i} style={styles.highlightRow}>
              <MaterialCommunityIcons name="check-circle" size={16} color={Colors.primary} />
              <Text style={styles.highlightText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* 진행 방식 */}
        <View style={styles.section}>
          <SectionTitle title="진행 방식" />
          <ProcessStepList steps={service.process} />
        </View>
      </ScrollView>

      {/* 고정 CTA */}
      <View style={[styles.ctaContainer, { bottom: ctaBottom }]}>
        <CallButton
          serviceName={service.name}
          onPress={() => setModalVisible(true)}
        />
      </View>

      {/* 전화 연결 확인 모달 */}
      <ConfirmModal
        visible={modalVisible}
        serviceName={service.name}
        onConfirm={handleCallConfirm}
        onCancel={() => setModalVisible(false)}
      />
    </View>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pageBg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    paddingHorizontal: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  headerRight: {
    width: 28,
  },
  scrollContent: {
    paddingTop: 8,
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 8,
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: Colors.primaryBadgeBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  heroInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  popularBadge: {
    backgroundColor: Colors.popularBadge,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  popularText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  categoryText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 6,
  },
  section: {
    backgroundColor: Colors.cardBg,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  priceBox: {
    backgroundColor: Colors.primaryBadgeBg,
    borderRadius: 10,
    padding: 16,
  },
  priceValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
  },
  priceNote: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 6,
  },
  // 보증 섹션
  guaranteeSection: {
    backgroundColor: Colors.cardBg,
    marginBottom: 8,
    overflow: 'hidden',
  },
  guaranteeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.guarantee,
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  guaranteeHeaderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  guaranteeMainCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.guaranteeBg,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 4,
    borderRadius: 10,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.guaranteeBorder,
  },
  guaranteeMainInfo: {
    flex: 1,
  },
  guaranteeMainTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.guarantee,
    marginBottom: 4,
  },
  guaranteeMainDesc: {
    fontSize: 12,
    color: Colors.textBody,
    lineHeight: 18,
  },
  guaranteeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: 4,
  },
  guaranteeInfo: {
    flex: 1,
  },
  guaranteeTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  guaranteeDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  guaranteeNote: {
    fontSize: 11,
    color: Colors.textDisabled,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  quotationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    gap: 8,
  },
  quotationBtnPressed: {
    opacity: 0.85,
  },
  quotationBtnText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  quotationNote: {
    fontSize: 12,
    color: Colors.textDisabled,
    textAlign: 'center',
    marginTop: 8,
  },
  reasonText: {
    fontSize: 14,
    color: Colors.textBody,
    lineHeight: 22,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  highlightText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textBody,
    lineHeight: 20,
  },
  ctaContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

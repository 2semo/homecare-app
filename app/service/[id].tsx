import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CallButton from '@/components/CallButton';
import ConfirmModal from '@/components/ConfirmModal';
import EmptyState from '@/components/EmptyState';
import ProcessStepList from '@/components/ProcessStep';
import { Colors } from '@/constants/colors';
import { getServiceById } from '@/data/services';
import { makeCall } from '@/lib/phone';

const CTA_HEIGHT = 72;

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

        {/* 보증 */}
        {service.warranty && (
          <View style={styles.warrantyBox}>
            <MaterialCommunityIcons name="shield-check" size={18} color={Colors.primary} />
            <Text style={styles.warrantyText}>{service.warranty}</Text>
          </View>
        )}
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
  warrantyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 8,
    gap: 10,
  },
  warrantyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
  },
  ctaContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

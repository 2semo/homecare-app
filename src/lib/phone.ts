import { Alert, Linking } from 'react-native';

export function formatPhone(phone: string): string {
  const d = phone.replace(/\D/g, '');
  if (d.startsWith('02')) {
    return d.replace(/^(02)(\d{3,4})(\d{4})$/, '$1-$2-$3');
  }
  return d.replace(/^(\d{3,4})(\d{3,4})(\d{4})$/, '$1-$2-$3');
}

export async function makeCall(phone: string): Promise<void> {
  if (!phone) return;
  const url = `tel:${phone}`;
  const supported = await Linking.canOpenURL(url);
  if (!supported) {
    Alert.alert(
      '전화 연결이 어렵습니다',
      `직접 전화해 주세요:\n${formatPhone(phone)}`,
      [{ text: '확인' }],
    );
    return;
  }
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert(
      '전화 연결에 실패했습니다',
      `직접 전화해 주세요:\n${formatPhone(phone)}`,
      [{ text: '확인' }],
    );
  }
}

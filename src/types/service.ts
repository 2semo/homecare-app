export type Category = '가전클리닝' | '홈클리닝' | '이전설치' | '윈도우ALL케어';
export type CategoryFilter = Category | 'all';

export interface ProcessStep {
  step: number;
  label: string;
  desc: string;
}

export interface Service {
  id: string;
  name: string;
  category: Category;
  keywords: string[];
  price: string;
  priceNote?: string;
  duration: string;
  phone: string;
  warranty?: string;
  highlights: string[];
  process: ProcessStep[];
  reason: string;
  isPopular?: boolean;
  iconName: string;
  quotationUrl?: string;
}

export interface EmptyStateProps {
  message: string;
  subMessage?: string;
  actionLabel?: string;
  onAction?: () => void;
  iconName?: string;
}

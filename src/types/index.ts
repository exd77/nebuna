export type BadgeType = "Populer" | "Terlaris" | "Promo" | "Instan" | "Limited" | "Baru" | "Ready" | "Premium";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDesc: string;
  price: number;
  originalPrice?: number;
  category: CategorySlug;
  tags: string[];
  rating: number;
  reviews: number;
  sales: number;
  featured: boolean;
  badge?: BadgeType;
  delivery: string;
  accentColor: string;
  iconBg: string;
}

export type CategorySlug =
  | "hiburan"
  | "ai-tools"
  | "developer"
  | "social-premium"
  | "produktivitas"
  | "security";

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  description: string;
  icon: string;
  count: number;
  accentColor: string;
  products: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TrustCard {
  icon: string;
  title: string;
  description: string;
}

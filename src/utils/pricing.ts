import { WebsiteType, BasicService } from '../types/calculator';

export const BASE_PRICES: Record<WebsiteType, number> = {
  static: 500,
  dynamic: 1500,
  corporate: 2500,
  'one-page': 800,
  ecommerce: 3500,
};

export const PRICE_PER_PAGE: Record<WebsiteType, number> = {
  static: 100,
  dynamic: 200,
  corporate: 250,
  'one-page': 0,
  ecommerce: 300,
};

export const calculateTotalCost = (
  websiteType: WebsiteType,
  pages: number,
  services: BasicService[]
): number => {
  const basePrice = BASE_PRICES[websiteType];
  const pagePrice = PRICE_PER_PAGE[websiteType] * (pages - 1);
  const servicesPrice = services
    .filter((service) => service.selected)
    .reduce((sum, service) => sum + service.price, 0);

  return basePrice + pagePrice + servicesPrice;
};
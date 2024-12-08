export type WebsiteType = 'static' | 'dynamic' | 'corporate' | 'one-page' | 'ecommerce';

export interface BasicService {
  id: string;
  name: string;
  price: number;
  selected?: boolean;
}

export interface ContactInfo {
  name: string;
  city: string;
  email: string;
  mobile: string;
}

export interface CalculatorState {
  websiteType: WebsiteType;
  numberOfPages: number;
  basicServices: BasicService[];
  advancedServices: BasicService[];
  specialRequirements: string;
}
export interface LocalizedString {
  en: string;
  ar: string;
}

export type ServiceCategory =
  | 'general'
  | 'electrical'
  | 'cooling'
  | 'brakes'
  | 'diagnostics'
  | 'ac'
  | 'tires';

export interface ProviderServiceItem {
  id: string;
  name: LocalizedString;
  category: ServiceCategory;
  priceFromEgp: number;
  durationMins: number;
}

export interface ProviderReview {
  id: string;
  authorName: string;
  rating: number;
  date: string;
  comment: LocalizedString;
  verifiedRequestLabel: LocalizedString;
  flagged?: boolean;
}

export interface ProviderRecord {
  id: string;
  name: LocalizedString;
  district: LocalizedString;
  address: LocalizedString;
  type: 'mechanic' | 'parts_seller' | 'both';
  rating: number;
  reviewCount: number;
  distanceKm: number;
  lat: number;
  lng: number;
  isOpen: boolean;
  isVerified: boolean;
  isTopRated: boolean;
  hours: LocalizedString;
  phone: string;
  thumbnailUrl: string;
  heroUrl: string;
  logoUrl: string;
  about: LocalizedString;
  tags: LocalizedString[];
  categories: ServiceCategory[];
  services: ProviderServiceItem[];
  reviews: ProviderReview[];
}

export interface PartSellerOffer {
  providerId: string;
  providerName: LocalizedString;
  district: LocalizedString;
  distanceKm: number;
  priceEgp: number;
  condition: 'new' | 'used';
  updatedMinutesAgo: number;
  isVerified: boolean;
}

export interface SparePartRecord {
  id: string;
  partNumber: string;
  name: LocalizedString;
  category: ServiceCategory;
  compatibleModels: string[];
  description: LocalizedString;
  imageUrl: string;
  offers: PartSellerOffer[];
}

export interface VehicleRecord {
  id: string;
  make: string;
  model: string;
  year: number;
  plate: string;
  mileageKm: number;
}

export interface MaintenanceItem {
  id: string;
  vehicleId: string;
  title: LocalizedString;
  dueInKm: number; // negative if overdue
  lastDoneDate: string;
  lastDoneKm: number;
  status: 'upcoming' | 'overdue' | 'completed';
}

export interface FuelEntry {
  id: string;
  vehicleId: string;
  date: string;
  odometerKm: number;
  liters: number;
  costEgp: number;
  consumptionLPer100Km?: number;
}

export type RequestStatus = 'pending' | 'accepted' | 'completed' | 'declined';

export interface CustomerRequest {
  id: string;
  type: 'service' | 'part_delivery' | 'roadside_sos';
  title: LocalizedString;
  providerId: string;
  providerName: LocalizedString;
  vehicleName: string;
  createdAtLabel: LocalizedString;
  priceEstimateEgp: number;
  status: RequestStatus;
  notes?: string;
  reviewed?: boolean;
}

export interface NotificationItem {
  id: string;
  title: LocalizedString;
  body: LocalizedString;
  minutesAgo: number;
  read: boolean;
  linkTo: string;
}


export type TenureType = 'Mailo' | 'Freehold' | 'Leasehold' | 'Customary';

export interface LandParcel {
  id: string;
  name: string;
  location: string;
  price: number;
  sizeAcres: number;
  tenureType: TenureType;
  farmingSuitability: number;
  image: string;
  description: string;
  soilType: string;
  rainfall: string;
}

export type ViewState = 'landing' | 'marketplace' | 'detail' | 'compare';

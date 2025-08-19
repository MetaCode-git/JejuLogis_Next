export interface CompanyConfig {
  company: {
    name: string;
    brandName: string;
    logo: string;
    favicon: string;
    phone: string;
    email: string;
    address: string;
    businessHours: string;
    businessNumber: string;
    ownerName: string;
    bankInfo: {
      bankName: string;
      accountNumber: string;
      accountHolder: string;
    };
  };
  designatedDriver: {
    name: string;
    corporationName: string;
    phone: string;
  };
  services: {
    vehicleTransport: boolean;
    designatedDriver: boolean;
    insurance: boolean;
    consignment: boolean;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  apiEndpoints: {
    baseUrl: string;
    carListEndpoint: string;
    estimateEndpoint: string;
    findCarEndpoint: string;
  };
}

export interface CarModel {
  id: string;
  manufacturer: string;
  model: string;
  year: number;
}

export interface EstimateRequest {
  vehicleId: string;
  departureAddress: string;
  arrivalAddress: string;
  departureDate: string;
  contactPhone: string;
  contactName: string;
}

export interface EstimateResponse {
  id: string;
  estimatedCost: number;
  distance: number;
  duration: string;
  additionalFees: number;
  totalCost: number;
}
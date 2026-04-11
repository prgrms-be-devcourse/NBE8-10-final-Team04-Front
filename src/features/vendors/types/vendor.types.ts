// src/features/vendors/types/vendor.types.ts

export interface ModelFamily {
  id: number;
  familyName: string;
  commonDescription: string;
}

export interface Vendor {
  id: number;
  name: string;
  officialUrl: string;
  active: boolean;
  deprecated: boolean;
}

// 🌟 API 응답에 맞춘 Family 상세 타입 추가
export interface FamilyDetail {
  id: number;
  vendorName: string;
  familyName: string;
  commonDescription: string;
  inputTypes: string[];
  outputTypes: string[];
  createdAt: string;
  updatedAt: string;
}
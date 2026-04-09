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

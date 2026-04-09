// src/features/vendors/api/vendorApi.ts
import {apiClient} from "@/lib/axios";
import {type ApiResponse} from "@/types/api.types";
import {type Vendor, type ModelFamily} from "../types/vendor.types";

export const vendorApi = {
  getVendors: async () => {
    const {data} = await apiClient.get<ApiResponse<Vendor[]>>("/api/v1/info/vendors");
    return data.data;
  },

  getVendorFamilies: async (vendorId: number) => {
    const {data} = await apiClient.get<ApiResponse<ModelFamily[]>>(`/api/v1/info/vendors/${vendorId}/families`);
    return data.data;
  },
};

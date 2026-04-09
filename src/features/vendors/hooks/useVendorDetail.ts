// src/features/vendors/hooks/useVendorDetail.ts
import {useQuery} from "@tanstack/react-query";
import {vendorApi} from "../api/vendorApi";

export function useVendorDetail(vendorId: string | undefined) {
  const {
    data: families,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vendors", "families", vendorId],
    queryFn: () => vendorApi.getVendorFamilies(Number(vendorId)),
    enabled: !!vendorId && !isNaN(Number(vendorId)),
  });

  return {
    families: families || [],
    isLoading,
    error,
  };
}

// src/features/vendors/hooks/useVendors.ts
import {useQuery} from "@tanstack/react-query";
import {vendorApi} from "../api/vendorApi";

export function useVendors() {
  const {data, isLoading, error} = useQuery({
    queryKey: ["vendors"],
    queryFn: vendorApi.getVendors,
  });

  return {
    // API 응답 구조가 { data: { data: [...] } } 형태일 경우를 대비해 처리
    vendors: data || [],
    isLoading,
    error,
  };
}

import {apiClient} from "@/lib/axios";
import {type ApiResponse} from "@/types/api.types";
import {type McpTokenListResponse, type McpTokenCreateResponse} from "../types/mcp.types";

export const mcpApi = {
  getTokens: async () => {
    const {data} = await apiClient.get<ApiResponse<McpTokenListResponse>>("/api/v1/mcp/tokens");
    return data.data;
  },
  createToken: async (payload: {name: string; expiresAt: string}) => {
    const {data} = await apiClient.post<ApiResponse<McpTokenCreateResponse>>("/api/v1/mcp/tokens", payload);
    return data.data;
  },
  deleteToken: async (tokenId: number) => {
    await apiClient.delete(`/api/v1/mcp/tokens/${tokenId}`);
  },
};

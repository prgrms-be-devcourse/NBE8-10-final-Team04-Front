export interface McpToken {
  tokenId: number;
  name: string;
  tokenPrefix: string;
  expiresAt: string;
  lastUsedAt: string | null;
  revoked: boolean;
}

export interface McpTokenCreateResponse extends McpToken {
  token: string; // 발급 시에만 제공되는 평문 토큰
}

export interface McpTokenListResponse {
  tokens: McpToken[];
}

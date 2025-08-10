import type { ApiResponse, BalanceResponse } from './api_response';

const api_base = '/currency-ms';

export async function attemptFetchPlayerBalance(
  token: string
): Promise<ApiResponse<BalanceResponse>> {
  if (import.meta.env.DEV) {
    return {
      status: 200,
      body: { balance: 1024 }
    };
  }
  const response = await fetch(`${api_base}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  const body = await response.json();
  return { status: response.status, body };
}

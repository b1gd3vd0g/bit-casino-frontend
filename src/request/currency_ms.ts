import type { ApiResponse, BalanceResponse } from './api_response';

const api_base = '/currency';

export async function attemptFetchPlayerBalance(
  token: string
): Promise<ApiResponse<BalanceResponse>> {
  const response = await fetch(api_base, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  const body = await response.json();
  return { status: response.status, body };
}

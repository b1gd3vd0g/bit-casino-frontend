import type { ApiResponse } from './api_response';

const api_base = '/slots-ms';

export interface ByteBuilderResponse {
  payout: number;
  byte: string;
  event: string | null;
}

export async function attemptSpinByteBuilder(
  token: string,
  multiplier: number
): Promise<ApiResponse<ByteBuilderResponse>> {
  if (import.meta.env.DEV)
    return {
      status: 200,
      body: { payout: 78, byte: '0100 1110', event: null }
    };
  const response = await fetch(`${api_base}/byte_builder`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ multiplier })
  });
  const body = await response.json();
  return { status: response.status, body };
}

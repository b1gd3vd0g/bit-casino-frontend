import type { ApiResponse, TokenResponse } from './api_response';

export async function attemptPlayerRegistration(
  username: string,
  email: string,
  password: string
): Promise<ApiResponse<TokenResponse>> {
  const response = await fetch('http://player-ms:3000', {
    method: 'POST',
    body: JSON.stringify({ username, email, password })
  });
  const body = await response.json();
  return { status: response.status, body };
}

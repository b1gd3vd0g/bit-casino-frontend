import type { ApiResponse, TokenResponse } from './api_response';

const api_base = '/player/';

export async function attemptPlayerRegistration(
  username: string,
  email: string,
  password: string
): Promise<ApiResponse<TokenResponse>> {
  const response = await fetch(api_base, {
    method: 'POST',
    body: JSON.stringify({ username, email, password })
  });
  const body = await response.json();
  return { status: response.status, body };
}

export async function attemptPlayerLogin(
  username: string,
  password: string
): Promise<ApiResponse<TokenResponse>> {
  const response = await fetch(`${api_base}authn`, {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
  const body = await response.json();
  return { status: response.status, body };
}

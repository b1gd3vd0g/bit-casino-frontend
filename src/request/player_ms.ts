import type {
  ApiResponse,
  PlayerResponse,
  TokenResponse
} from './api_response';

const api_base = '/player';

export async function attemptPlayerRegistration(
  username: string,
  email: string,
  password: string
): Promise<ApiResponse<TokenResponse>> {
  if (import.meta.env.DEV) {
    return { status: 201, body: { token: 'placeholder' } };
  }
  const response = await fetch(`${api_base}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  });
  const body = await response.json();
  return { status: response.status, body };
}

export async function attemptPlayerLogin(
  username: string,
  password: string
): Promise<ApiResponse<TokenResponse>> {
  if (import.meta.env.DEV) {
    return { status: 200, body: { token: 'placeholder' } };
  }
  const response = await fetch(`${api_base}/authn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  const body = await response.json();
  return { status: response.status, body };
}

export async function attemptTokenAuthentication(
  token: string
): Promise<ApiResponse<PlayerResponse>> {
  if (import.meta.env.DEV) {
    return {
      status: 200,
      body: {
        username: 'test_user',
        id: '256',
        email: 'tester@bitcasino.bigdevdog.com',
        created_at: '03/17/2000'
      }
    };
  }
  const response = await fetch(`${api_base}/authn`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  const body = await response.json();
  return { status: response.status, body };
}

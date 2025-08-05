import type {
  ApiResponse,
  BonusResponse,
  StreakResponse
} from './api_response';

const api_base = '/reward/';

export async function attemptCheckDailyBonus(
  token: string
): Promise<ApiResponse<BonusResponse>> {
  const response = await fetch(api_base, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  const body = await response.json();
  return { status: response.status, body };
}

export async function attemptClaimDailyBonus(
  token: string
): Promise<ApiResponse<StreakResponse>> {
  const response = await fetch(api_base, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  const body = await response.json();
  return { status: response.status, body };
}

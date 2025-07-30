import { redirect } from 'react-router-dom';
import { attemptTokenAuthentication } from './request/player_ms';
import type { PlayerResponse } from './request/api_response';

export async function homeLoader(): Promise<PlayerResponse> {
  const token = sessionStorage.getItem('token');
  if (!token) throw redirect('/welcome');
  const response = await attemptTokenAuthentication(token);
  if (response.status === 200) return response.body as PlayerResponse;
  else {
    sessionStorage.removeItem('token');
    throw redirect('/welcome');
  }
}

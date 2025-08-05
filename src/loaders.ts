import { redirect } from 'react-router-dom';
import { attemptTokenAuthentication } from './request/player_ms';
import type {
  BalanceResponse,
  BonusResponse,
  PlayerResponse
} from './request/api_response';
import { attemptFetchPlayerBalance } from './request/currency_ms';
import { attemptCheckDailyBonus } from './request/reward_ms';

export interface HomeInfo {
  player: PlayerResponse;
  balance: number;
  bonus: BonusResponse;
}

export async function homeLoader(): Promise<HomeInfo> {
  // Authenticate player token.
  const token = sessionStorage.getItem('token');
  if (!token) throw redirect('/welcome');

  const promises = await Promise.all([
    attemptTokenAuthentication(token),
    attemptFetchPlayerBalance(token),
    attemptCheckDailyBonus(token)
  ]);

  promises.forEach((response) => {
    if (response.status !== 200) {
      console.log(promises);
      throw new Error('Could not pull player info from database.');
    }
  });

  return {
    player: promises[0].body as PlayerResponse,
    balance: (promises[1].body as BalanceResponse).balance,
    bonus: promises[2].body as BonusResponse
  };
}

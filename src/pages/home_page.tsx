import { type HomeInfo } from '../loaders';
import { useLoaderData } from 'react-router-dom';
import { attemptClaimDailyBonus } from '../request/reward_ms';
import { useState } from 'react';
import { attemptFetchPlayerBalance } from '../request/currency_ms';
import type { BalanceResponse } from '../request/api_response';

import profileIcon from '../assets/img/profile_icon.png';

export default function HomePage() {
  const homeInfo = useLoaderData() as HomeInfo;

  const [player] = useState(homeInfo.player);
  const [balance, setBalance] = useState(homeInfo.balance);
  const [bonus, setBonus] = useState(homeInfo.bonus);

  const claimDailyBonus = async () => {
    const token = sessionStorage.getItem('token') ?? '';
    const claim = await attemptClaimDailyBonus(token);
    if (claim.status !== 200) {
      return;
    }
    const newBal = await attemptFetchPlayerBalance(token);
    setBalance((newBal.body as BalanceResponse).balance);
    setBonus({
      streak: bonus.streak + 1,
      available: false
    });
  };

  return (
    <>
      <img src={profileIcon} className='float-right' />
      <h1>Welcome, {player.username}</h1>
      <h2>Current Balance: {balance}</h2>
      <h3>Daily bonus is {bonus.available ? 'available' : 'unavailable'}</h3>
      <h4>Current streak is {bonus.streak}</h4>
      <button
        disabled={!bonus.available}
        className='bg-amber-100'
        onClick={claimDailyBonus}
      >
        Claim Daily Bonus
      </button>
    </>
  );
}

import { useNavigate } from 'react-router-dom';
import { attemptClaimDailyBonus } from '../util/request/reward_ms';
import { useContext, useEffect, useState } from 'react';
import { attemptFetchPlayerBalance } from '../util/request/currency_ms';
import type { BalanceResponse } from '../util/request/api_response';
import TypingText from '../reusable/text';
import { MenuButton } from '../reusable/buttons';
import { timeTillNewUtcDay } from '../util/time';
import { AccountContext, type AccountContextData } from '../util/context';

export default function HomePage() {
  const [remaining, setRemaining] = useState(timeTillNewUtcDay());

  const ctx = useContext(AccountContext) as AccountContextData;
  const { account, setAccount } = ctx;
  useEffect(() => {
    const timeout = setTimeout(() => setRemaining((prev) => prev - 1), 1_000);
    return () => clearTimeout(timeout);
  });

  const claimDailyBonus = async () => {
    const token = sessionStorage.getItem('token') ?? '';
    const claim = await attemptClaimDailyBonus(token);
    if (claim.status !== 200) {
      return;
    }
    const newBal = await attemptFetchPlayerBalance(token);
    setAccount((prev) => {
      return {
        ...prev,
        balance: (newBal.body as BalanceResponse).balance,
        bonus: { streak: prev.bonus.streak + 1, available: false }
      };
    });
  };

  const hours = `${Math.floor(remaining / 3600) - 1}`.padStart(2, '0');
  const minutes = `${(Math.floor(remaining / 60) % 60) - 1}`.padStart(2, '0');
  const seconds = `${remaining % 60}`.padStart(2, '0');

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex flex-col justify-evenly grow-2'>
        <div>
          <TypingText text={`Welcome, ${account.player.username}`} />
          <MenuButton
            text='Claim Daily Bonus'
            onClick={claimDailyBonus}
            disabled={!account.bonus.available}
          />
          <p className='text-xl text-center'>
            {hours}:{minutes}:{seconds}
            {account.bonus.available ? ' left to claim' : ' until next bonus'}.
          </p>
        </div>
        <GameMenu />
      </div>
    </div>
  );
}

function GameMenu() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Select a game to play</h2>
      <div className='border-2 p-4 m-2 w-[750px] max-w-9/10 mx-auto flex justify-evenly'>
        <MenuButton
          text='Slots'
          onClick={() => {
            navigate('/slots/byte_builder');
          }}
        />
        <MenuButton text='Poker' onClick={() => {}} disabled={true} />
      </div>
    </div>
  );
}

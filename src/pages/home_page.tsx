import { type HomeInfo } from '../loaders';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { attemptClaimDailyBonus } from '../util/request/reward_ms';
import { useState } from 'react';
import { attemptFetchPlayerBalance } from '../util/request/currency_ms';
import type {
  BalanceResponse,
  BonusResponse
} from '../util/request/api_response';

import profileIconStd from '../assets/img/profile_icon.png';
import profileIconHov from '../assets/img/profile_icon_hover.png';
import flame from '../assets/img/flame.png';
import bitSymbol from '../assets/img/bit_symbol.png';
import TypingText from '../reusable/text';
import { MenuButton } from '../reusable/buttons';
import { attemptPlayerDeletion } from '../util/request/player_ms';

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
    <div className='min-h-screen flex flex-col'>
      <div className='flex justify-between items-center p-2'>
        <h1>Bit Casino</h1>
        <ProfileHeaderBox balance={balance} bonus={bonus} />
      </div>
      <div className='grow-2 flex flex-col justify-center'>
        <TypingText text={`Welcome, ${player.username}`} />
        <MenuButton
          text='Claim Daily Bonus'
          onClick={claimDailyBonus}
          disabled={!bonus.available}
        />
      </div>
    </div>
  );
}

interface ProfileHeaderBoxProps {
  balance: number;
  bonus: BonusResponse;
}

function ProfileHeaderBox({ balance, bonus }: ProfileHeaderBoxProps) {
  const [popup, setPopup] = useState(false);

  return (
    <div className='flex flex-col'>
      <div className='flex items-center'>
        <img src={bitSymbol} className='h-8 w-8' />
        <h2 className='pl-1 pr-2'>{balance}</h2>
        <img src={flame} className='h-8 w-8' />
        <h2 className='pl-1 pr-2'>{bonus.streak}</h2>
        <ProfileIcon setPopup={setPopup} />
      </div>
      {popup ? <ProfilePopup /> : <></>}
    </div>
  );
}

interface ProfileIconProps {
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileIcon({ setPopup }: ProfileIconProps) {
  const [hover, setHover] = useState(false);

  return (
    <img
      src={hover ? profileIconHov : profileIconStd}
      className='h-12 w-12'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setPopup((prev) => !prev)}
    />
  );
}

function ProfilePopup() {
  const navigate = useNavigate();
  function signOut() {
    sessionStorage.removeItem('token');
    navigate('/welcome');
  }

  async function deleteAccount() {
    const deletion = await attemptPlayerDeletion(
      sessionStorage.getItem('token') ?? ''
    );
    console.log(deletion);
    switch (deletion.status) {
      case 204: {
        sessionStorage.removeItem('token');
        navigate('/welcome');
        break;
      }
      default: {
        console.log('Could not delete account.');
      }
    }
  }

  return (
    <div className='border-2 mr-2 my-2 py-2 px-5'>
      <MenuButton text='Sign out' onClick={signOut} />
      <MenuButton text='Delete account' onClick={deleteAccount} />
    </div>
  );
}

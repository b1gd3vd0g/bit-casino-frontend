import { useContext, useState } from 'react';

import bitSymbol from './assets/img/bit_symbol.png';
import flame from './assets/img/flame.png';
import stdProfile from './assets/img/profile_icon.png';
import hovProfile from './assets/img/profile_icon_hover.png';
import { AccountContext, type AccountContextData } from './util/context';
import { useNavigate } from 'react-router-dom';
import { attemptPlayerDeletion } from './util/request/player_ms';
import { MenuButton } from './reusable/buttons';

export default function Header() {
  return (
    <header className='flex justify-between items-center p-2'>
      <h1>Bit Casino</h1>
      <ProfileHeaderBox />
    </header>
  );
}

function ProfileHeaderBox() {
  const [popup, setPopup] = useState(false);

  const ctx = useContext(AccountContext) as AccountContextData;
  const { balance, bonus } = ctx.account;

  return (
    <div className='flex flex-col'>
      <div className='flex items-center p-2'>
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
      src={hover ? hovProfile : stdProfile}
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
    <div className='border-2 mr-2 my-2 py-2 px-5 absolute top-17 right-2'>
      <MenuButton text='Sign out' onClick={signOut} />
      <MenuButton text='Delete account' onClick={deleteAccount} />
    </div>
  );
}

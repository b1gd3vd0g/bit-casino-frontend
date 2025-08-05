import { type HomeInfo } from '../loaders';
import { useLoaderData } from 'react-router-dom';

export default function HomePage() {
  const homeInfo = useLoaderData() as HomeInfo;
  const { player, balance, bonus } = homeInfo;

  return (
    <>
      <h1>Welcome, {player.username}</h1>
      <h2>Current Balance: {balance}</h2>
      <h3>Daily bonus is {bonus.available}</h3>
      <h4>Current streak is {bonus.streak}</h4>
    </>
  );
}

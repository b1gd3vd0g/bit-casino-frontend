import type { PlayerResponse } from '../request/api_response';
import { useLoaderData } from 'react-router-dom';

export default function HomePage() {
  const player = useLoaderData() as PlayerResponse;

  return (
    <>
      <h1>Welcome, {player.username}.</h1>
    </>
  );
}

import { useEffect, useState } from 'react';
import { attemptTokenAuthentication } from '../request/player_ms';
import type { MessageResponse, PlayerResponse } from '../request/api_response';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const token: string = sessionStorage.getItem('token') ?? '';

  useEffect(() => {
    if (!username) {
      (async () => {
        const response = await attemptTokenAuthentication(token);
        switch (response.status) {
          case 200: {
            const player = response.body as PlayerResponse;
            setUsername(player.username);
            break;
          }
          default: {
            const message = response.body as MessageResponse;
            // Token authentication failed??
            console.log(message);
            console.log('logging out...');
            sessionStorage.removeItem('token');
            navigate('/welcome');
          }
        }
      })();
    }
  }, [username, navigate, token]);

  return (
    <>
      <h1>Welcome, {username}.</h1>
    </>
  );
}

import { useRef } from 'react';

export function useSound(path: string) {
  const audioRef = useRef(new Audio(path));

  const play = () => {
    audioRef.current.currentTime = 0;
    audioRef.current
      .play()
      .catch((err) => console.warn('Failed to play sound: ', err));
  };

  return play;
}

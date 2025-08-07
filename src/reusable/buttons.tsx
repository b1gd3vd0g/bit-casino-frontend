import { useSound } from '../hooks/use_sound.ts';

import chips1 from '../assets/sfx/chips_1.wav';

interface ButtonProps {
  /** What should happen when the button is clicked. */
  onClick: () => void;
  /** What text should the button display. */
  text: string;
  /** Is the button able to be clicked given the current state? (Default: false) */
  disabled?: boolean;
  /** Should the button be centered? (Default: true) */
  center?: boolean;
}

export function MenuButton({
  onClick,
  text,
  disabled = false,
  center = true
}: ButtonProps): React.ReactElement {
  const playSfx = useSound(chips1);

  const mx = center ? 'mx-auto' : 'mx-2';
  const colorChoices = disabled ? 'brightness-50' : 'hover:border-fuchsia-500';

  return (
    <button
      className={`block border-1 text-2xl py-2 px-5 my-2 ${mx} ${colorChoices}`}
      onClick={() => {
        onClick();
        playSfx();
      }}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

interface BackButtonProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps): React.ReactElement {
  return <MenuButton onClick={onClick} text='<' center={false} />;
}

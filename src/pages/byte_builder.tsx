import { useContext, useEffect, useState } from 'react';
import { MenuButton } from '../reusable/buttons';
import { AccountContext, type AccountContextData } from '../util/context';
import {
  attemptSpinByteBuilder,
  type ByteBuilderResponse
} from '../util/request/slots_ms';

export default function ByteBuilder() {
  return (
    <div className='flex flex-col grow-2'>
      <h1>Byte Builder</h1>
      <Machine />
    </div>
  );
}

/**
 * This component displays the interface for interacting with Byte Builder, and
 * is also the source of its state.
 */
function Machine() {
  /** The result of spinning the machine; the byte displayed on the screen. */
  const [byte, setByte] = useState('0000 0000');
  /** The multiplier for the wager and the payout. */
  const [multiplier, setMultiplier] = useState(1);
  /** The payout rewarded by the most recent spin. */
  const [payout, setPayout] = useState(0);
  /** The index of the last bit which is currently spinning. -1 when idle.*/
  const [spinning, setSpinning] = useState(-1);

  // When the machine starts spinning, reveal a new reel every 1-2 seconds.
  useEffect(() => {
    setTimeout(() => {
      if (spinning >= 0) setSpinning(spinning - 1);
    }, Math.random() * 1000 + 1000);
  }, [spinning]);

  /**
   * Call the backend to spin the machine and set its state to reflect the HTTP
   * response.
   */
  async function spinMachine() {
    setSpinning(10);
    const spin = await attemptSpinByteBuilder(
      sessionStorage.getItem('token') ?? '',
      multiplier
    );
    switch (spin.status) {
      case 200:
        setByte((spin.body as ByteBuilderResponse).byte);
        setPayout((spin.body as ByteBuilderResponse).payout * multiplier);
    }
  }

  return (
    <div className='border-2 p-5 max-w-9/10 x-[750px] mx-auto my-5'>
      <ByteDisplay
        byte={Array.from(byte)
          .filter((c) => c !== ' ')
          .map((c) => parseInt(c))}
        spinning={spinning}
      />
      <div className='flex justify-evenly'>
        <WagerSide multiplier={multiplier} setMultiplier={setMultiplier} />
        <SpinSide
          multiplier={multiplier}
          onClick={spinMachine}
          payout={spinning < 0 ? payout : undefined}
        />
      </div>
    </div>
  );
}

interface ByteDisplayProps {
  /**
   * The byte that is the **result of a spin**; not *necessarily* the byte
   * that is displayed.
   */
  byte: number[];
  /** The index of the last reel which is currently spinning. -1 when idle. */
  spinning: number;
}

/**
 * This is the display of the "reels". It will display the bits at an index less
 * than or equal to `spinning` as spinning; the others will display the bit at
 * their respective index in `byte`, which reflect the actual result of a spin.
 */
function ByteDisplay({ byte, spinning }: ByteDisplayProps) {
  let i = -1;
  const bits = byte.map((bit) => {
    i++;
    return (
      <BitDisplay
        bit={bit}
        spinning={i <= spinning}
        spacer={i === 3}
        key={`byte_builder_bit_display_${i}`}
      />
    );
  });

  return <div className='flex justify-center my-10'>{bits}</div>;
}

interface BitDisplayProps {
  /** The bit that should be displayed **if** it is not spinning. */
  bit: number;
  /** Is this bit currently spinning? */
  spinning: boolean;
  /** Do you want to display a small gap between this bit and the next? */
  spacer: boolean;
}

/**
 * This is the display of a single **bit** of the `byte` represented on the
 * machine. It will display its proper bit when it is not spinning, but
 * otherwise will display a random value.
 */
function BitDisplay({ bit, spinning, spacer }: BitDisplayProps) {
  const [displayedBit, setDisplayedBit] = useState('0');

  useEffect(() => {
    if (spinning) {
      const timeout = setTimeout(() => {
        setDisplayedBit((prev) => {
          while (true) {
            const next = ['0', '1', '-', '_', '~', '.'][
              Math.floor(Math.random() * 6)
            ];
            if (next !== prev) return next;
          }
        });
      }, Math.random() * 100);
      return () => clearTimeout(timeout);
    }
  }, [spinning, displayedBit]);

  return (
    <div className={`border-1 p-5 text-3xl ${spacer ? 'mr-4' : 'mr-1'}`}>
      {spinning ? displayedBit : bit}
    </div>
  );
}

interface WagerSideProps {
  /** The multiplier state variable. */
  multiplier: number;
  /** The setter for `multiplier`. */
  setMultiplier: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Displays the **bottom left** part of the machine's interface, where the
 * **multiplier** can be set and displayed, and the minimum wager can be viewed.
 */
function WagerSide({ multiplier, setMultiplier }: WagerSideProps) {
  const ctx = useContext(AccountContext) as AccountContextData;
  const { account } = ctx;
  const balance = account.balance;

  return (
    <div className='w-1/2 px-5'>
      <div className='flex items-center'>
        <p className='text-2xl mr-3'>Wager:</p>
        <div className='border-1 py-2 px-5 grow-2'>
          <p className='text-2xl text-right'>{128 * multiplier}</p>
        </div>
      </div>
      <div className='flex items-center'>
        <MenuButton
          text='-'
          onClick={() => setMultiplier(Math.max(1, multiplier / 2))}
          center={false}
          disabled={multiplier === 1}
        />
        <p className='text-2xl'>x {multiplier}</p>
        <MenuButton
          text='+'
          onClick={() => setMultiplier(multiplier * 2)}
          disabled={balance < 128 * (2 * multiplier)}
          center={false}
        />
      </div>
    </div>
  );
}

interface SpinSideProps {
  /** The multiplier state variable. */
  multiplier: number;
  /** The function that should happen when the "spin" button is clicked. */
  onClick: () => void;
  /** The net result of your bet. */
  payout?: number;
}

/**
 * Displays the **bottom right** part of the machine's interface, where the
 * payout screen is, and the button to spin the machine. If payout is undefined,
 * (the machine is spinning), it will display '---'.
 */
function SpinSide({ multiplier, onClick, payout }: SpinSideProps) {
  const ctx = useContext(AccountContext) as AccountContextData;
  const { account } = ctx;
  const balance = account.balance;

  return (
    <div className='flex flex-col w-1/2 px-5'>
      <div className='border-1 px-5 py-2'>
        <p className='text-2xl text-right'>
          {payout === undefined ? '---' : payout * multiplier}
        </p>
      </div>
      <MenuButton
        text='Spin'
        onClick={onClick}
        disabled={balance < multiplier * 128}
      />
    </div>
  );
}

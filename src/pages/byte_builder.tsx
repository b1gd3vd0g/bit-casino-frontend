import { useEffect, useState } from 'react';
import { MenuButton } from '../reusable/buttons';

export default function ByteBuilder() {
  return (
    <div className='flex flex-col grow-2'>
      <h1>Byte Builder</h1>
      <Machine />
    </div>
  );
}

function Machine() {
  const [spinning, setSpinning] = useState(-1);

  useEffect(() => {
    setTimeout(() => {
      if (spinning >= 0) setSpinning(spinning - 1);
    }, Math.random() * 2000);
  }, [spinning]);

  const [byte] = useState('0000 0000');

  return (
    <div className='border-2 p-5 max-w-9/10 x-[750px] mx-auto my-5'>
      <ByteDisplay
        byte={Array.from(byte)
          .filter((c) => c !== ' ')
          .map((c) => parseInt(c))}
        spinning={spinning}
      />
      <div className='flex justify-evenly'>
        <MultiplierButtons />
        <MenuButton
          text='Spin'
          onClick={() => setSpinning(12)}
          center={false}
        />
      </div>
    </div>
  );
}

interface ByteDisplayProps {
  byte: number[];
  spinning: number;
}

function ByteDisplay({ byte, spinning }: ByteDisplayProps) {
  let i = -1;
  const bits = byte.map((bit) => {
    i++;
    return (
      <BitDisplay
        bit={bit}
        spinning={i < spinning}
        spacer={i === 3}
        key={`byte_builder_bit_display_${i}`}
      />
    );
  });

  return <div className='flex justify-center my-10'>{bits}</div>;
}

interface BitDisplayProps {
  bit: number;
  spinning: boolean;
  spacer: boolean;
}

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

function MultiplierButtons() {
  return (
    <div className='flex justify-between w-fit'>
      <MenuButton text='-' onClick={() => {}} center={false} className='mx-5' />
      <MenuButton text='+' onClick={() => {}} center={false} className='mx-5' />
    </div>
  );
}

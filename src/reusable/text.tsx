import { useEffect, useState } from 'react';

interface TypingTextProps {
  /** The text to display. */
  text: string;
  /** Characters per second. */
  cps?: number;
}

export default function TypingText({ text, cps = 10 }: TypingTextProps) {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (index <= text.length) {
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 1000 / cps);
      return () => clearTimeout(timeout);
    }
  }, [text, cps, index]);

  return (
    <>
      <h1>
        {text.substring(0, index)}
        <span className='inline-block w-[1ch] h-[1.5ch] bg-emerald-500 animate-[blink_0.75s_steps(1,start)_infinite] ml-1'></span>
      </h1>
    </>
  );
}

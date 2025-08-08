interface BoxProps {
  children: React.ReactElement;
}

export default function Box({ children }: BoxProps) {
  return (
    <div className='w-[750px] max-w-9/10 mx-auto my-5 p-2 border-foreground border-2'>
      {children}
    </div>
  );
}

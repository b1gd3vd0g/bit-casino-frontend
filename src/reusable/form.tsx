import { useState } from 'react';

type FormGroupProps = {
  label: string;
  hint?: string;
  rows?: number;
  type?: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  formatter?: (s: string) => string;
  validator?: (s: string) => boolean;
  reference: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
};

export function FormGroup({
  label,
  hint = '',
  rows = 1,
  type = 'text',
  setter,
  formatter = (s) => s,
  validator = (s) => (s ? true : false)
}: FormGroupProps) {
  const id = label.toLowerCase().replace(/\W/g, '-');

  type Border = 'normal' | 'invalid';
  const BORDER_CLASSES = {
    normal: 'border-[var(--dark-green)] border-1',
    invalid: 'border-[var(--dark-red)] border-2'
  };

  const [border, setBorder] = useState<Border>('normal');

  const formatInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.target.value = formatter(event.target.value);
  };

  const validateInput = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const valid = validator(value);
    if (valid || !(valid || value)) {
      // Either the field is empty, or the value inside is valid.
      setter(value);
      setBorder('normal');
    } else if (value) {
      // The value is invalid! Highlight the field to reflect that,
      // and set the state variable to the empty string.
      setter('');
      setBorder('normal');
    }
  };

  const textarea = (
    <textarea
      id={id}
      name={id}
      placeholder={hint}
      className={`${BORDER_CLASSES[border]} w-1/1 resize-none`}
      onBlur={validateInput}
      onChange={formatInput}
      rows={rows}
    ></textarea>
  );

  const input = (
    <input
      type={type}
      id={id}
      name={id}
      placeholder={hint}
      className={`${BORDER_CLASSES[border]} w-[400px]`}
      onBlur={validateInput}
      onChange={formatInput}
    />
  );

  const field = rows > 1 ? textarea : input;

  // We always want text areas to be on their own line, below the label.
  const flex = rows > 1 ? 'flex-col' : 'flex';

  return (
    <div className={`${flex} justify-between m-2 flex-wrap`}>
      <label htmlFor={id} className='pr-2'>
        {label}
      </label>
      {field}
    </div>
  );
}

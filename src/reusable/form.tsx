import { useState } from 'react';

type FormGroupProps = {
  /** The label for the input field. */
  label: string;
  /** The placeholder value in the input field. */
  hint?: string;
  /**
   * The number of rows in the field. 1 (default) creates an `input` field;
   * greater than 1 creates a `textarea`.
   */
  rows?: number;
  /**
   * The type of the input field. Only important if `rows === 1`. Critical for
   * password fields.
   */
  type?: string;
  /** A function to set the state variable. */
  setter: React.Dispatch<React.SetStateAction<string>>;
  /** A function to automatically format the input within the field as you type. */
  formatter?: (s: string) => string;
  /** A function to ensure valid input when the field leaves focus. */
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
  validator = (s) => (s ? true : false),
  reference
}: FormGroupProps) {
  const id = label.toLowerCase().replace(/\W/g, '-');

  type Border = 'normal' | 'invalid';
  const BORDER_CLASSES = {
    normal: 'border-foreground border-1',
    invalid: 'border-accent border-2'
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
    if (valid || !value) {
      // Either the field is empty, or the value inside is valid.
      setter(value);
      setBorder('normal');
    } else if (value) {
      // The value is invalid! Highlight the field to reflect that,
      // and set the state variable to the empty string.
      setter('');
      setBorder('invalid');
    }
  };

  const textarea = (
    <textarea
      id={id}
      name={id}
      placeholder={hint}
      className={`${BORDER_CLASSES[border]} w-1/1 resize-none text-2xl p-1`}
      onBlur={validateInput}
      onChange={formatInput}
      rows={rows}
      ref={reference as React.RefObject<HTMLTextAreaElement>}
    ></textarea>
  );

  const input = (
    <input
      type={type}
      id={id}
      name={id}
      placeholder={hint}
      className={`${BORDER_CLASSES[border]} w-[400px] text-2xl/normal py-1 px-3`}
      onBlur={validateInput}
      onChange={formatInput}
      ref={reference as React.RefObject<HTMLInputElement>}
    />
  );

  const field = rows > 1 ? textarea : input;

  // We always want text areas to be on their own line, below the label.
  const flex = rows > 1 ? 'flex-col' : 'flex';

  return (
    <div className={`${flex} justify-between m-2 flex-wrap`}>
      <label htmlFor={id} className='text-2xl mr-2'>
        {label}
      </label>
      {field}
    </div>
  );
}

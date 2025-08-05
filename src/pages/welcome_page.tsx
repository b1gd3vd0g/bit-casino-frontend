import { useRef, useState } from 'react';
import { FormGroup } from '../reusable/form';
import {
  attemptPlayerLogin,
  attemptPlayerRegistration
} from '../request/player_ms';
import type { MessageResponse, TokenResponse } from '../request/api_response';
import { useNavigate } from 'react-router-dom';

type UserChoice = 'undecided' | 'login' | 'register';

export default function WelcomePage() {
  const [choice, setChoice] = useState<UserChoice>('undecided');
  let form;
  switch (choice) {
    case 'undecided':
      form = <ChoiceForm setter={setChoice} />;
      break;
    case 'login':
      form = <LoginForm setter={setChoice} />;
      break;
    case 'register':
      form = <RegisterForm setter={setChoice} />;
      break;
  }
  return (
    <div>
      <h1>Welcome to Bit Casino!</h1>
      <div className='bg-gray-200 w-[750px] max-w-9/10 m-auto p-2'>{form}</div>
    </div>
  );
}

function RegisterForm({ setter }: ChoiceFormProps) {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const usernameRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const emailRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const passwordRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // useEffect(() => {
  //   usernameRef.current?.blur();
  //   emailRef.current?.blur();
  //   passwordRef.current?.blur();
  // }, []);

  const navigate = useNavigate();

  async function submitForm(): Promise<void> {
    usernameRef.current?.blur();
    emailRef.current?.blur();
    passwordRef.current?.blur();

    console.log(`${username} ${email} ${password}`);
    const registration = await attemptPlayerRegistration(
      username,
      email,
      password
    );

    switch (registration.status) {
      case 201: {
        const { token } = registration.body as TokenResponse;
        console.log(token);
        sessionStorage.setItem('token', token);
        navigate('/');
        break;
      }
      default: {
        const { message } = registration.body as MessageResponse;
        console.log(message);
      }
    }
  }

  return (
    <>
      <BackButton setter={setter} />
      <h2>Create a new account:</h2>
      <FormGroup
        label='Username'
        setter={setUsername}
        reference={usernameRef}
      />
      <FormGroup label='Email address' setter={setEmail} reference={emailRef} />
      <FormGroup
        label='Password'
        type='password'
        setter={setPassword}
        reference={passwordRef}
      />
      <button
        className='block m-auto my-2 bg-gray-500 w-fit text-3xl px-4 py-2 rounded-xl'
        onClick={submitForm}
      >
        Submit
      </button>
    </>
  );
}

function LoginForm({ setter }: ChoiceFormProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const usernameRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const passwordRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // useEffect(() => {
  //   usernameRef.current?.blur();
  //   passwordRef.current?.blur();
  // }, []);

  const navigate = useNavigate();

  async function submitForm(): Promise<void> {
    usernameRef.current?.blur();
    passwordRef.current?.blur();
    const login = await attemptPlayerLogin(username, password);
    switch (login.status) {
      case 200: {
        const { token } = login.body as TokenResponse;
        console.log(token);
        sessionStorage.setItem('token', token);
        navigate('/');
        break;
      }
      default: {
        const { message } = login.body as MessageResponse;
        console.log(message);
      }
    }
  }

  return (
    <>
      <BackButton setter={setter} />
      <h2>Log into your account:</h2>
      <FormGroup
        label='Username'
        setter={setUsername}
        reference={usernameRef}
      />
      <FormGroup
        label='Password'
        type='password'
        setter={setPassword}
        reference={passwordRef}
      />
      <button
        className='block m-auto my-2 bg-gray-500 w-fit text-3xl px-4 py-2 rounded-xl'
        onClick={submitForm}
      >
        Submit
      </button>
    </>
  );
}

function BackButton({ setter }: ChoiceFormProps) {
  return (
    <button
      className='block m-4 my-2 bg-gray-500 w-fit text-3xl px-4 py-2 rounded-xl'
      onClick={() => setter('undecided')}
    >
      {'<'}
    </button>
  );
}

type ChoiceFormProps = {
  setter: React.Dispatch<React.SetStateAction<UserChoice>>;
};

function ChoiceForm({ setter }: ChoiceFormProps) {
  return (
    <div className='flex flex-col items-center'>
      <button
        className='bg-gray-500 w-fit p-2 rounded-xl m-2'
        onClick={() => setter('login')}
      >
        Log in
      </button>
      <button
        className='bg-gray-500 w-fit p-2 rounded-xl m-2'
        onClick={() => setter('register')}
      >
        Create account
      </button>
    </div>
  );
}

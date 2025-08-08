import { useRef, useState } from 'react';
import { FormGroup } from '../reusable/form';
import {
  attemptPlayerLogin,
  attemptPlayerRegistration
} from '../util/request/player_ms';
import type {
  MessageResponse,
  TokenResponse
} from '../util/request/api_response';
import { useNavigate } from 'react-router-dom';
import TypingText from '../reusable/text';
import { BackButton, MenuButton } from '../reusable/buttons';
import Box from '../reusable/box';

type UserChoice = 'undecided' | 'login' | 'register';

/**
 * This is the page that all unauthenticated users will be directed to upon
 * visiting Bit Casino. It will display one of three forms: the ChoiceForm,
 * the RegisterForm, or the LoginForm, based on the user's choices.
 */
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
    <div className='min-h-screen flex flex-col justify-center items-center '>
      <TypingText text='Welcome to Bit Casino!' cps={10} />
      <Box>{form}</Box>
    </div>
  );
}

type WelcomeFormProps = {
  /**
   * This is the setter for the state variable "choice", allowing the user to
   * decide if they want to login or register.
   */
  setter: React.Dispatch<React.SetStateAction<UserChoice>>;
};

/**
 * Present two buttons to the user, allowing them to log in or to create a new
 * account.
 */
function ChoiceForm({ setter }: WelcomeFormProps) {
  return (
    <div className='flex flex-col items-center'>
      <MenuButton text='Log in' onClick={() => setter('login')} />
      <MenuButton text='Create account' onClick={() => setter('register')} />
    </div>
  );
}

/**
 * Present a login form to the user, which will call upon the player
 * microservice to authenticate the username and password. Upon successful
 * authentication, it will redirect the user to the home page (/).
 */
function LoginForm({ setter }: WelcomeFormProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const usernameRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const passwordRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const navigate = useNavigate();

  async function submitForm(): Promise<void> {
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
      <BackButton onClick={() => setter('undecided')} />
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
      <MenuButton
        text='Submit'
        onClick={submitForm}
        disabled={!(username && password)}
      />
    </>
  );
}

/**
 * Present a registration form to the user, which will call upon the player
 * microservice to create a new player account. Upon successful account
 * creation, it will redirect the user to the home page (/).
 */
function RegisterForm({ setter }: WelcomeFormProps) {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const usernameRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const emailRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const passwordRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const navigate = useNavigate();

  async function submitForm(): Promise<void> {
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
      <BackButton onClick={() => setter('undecided')} />
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
      <MenuButton
        text='Submit'
        onClick={() => submitForm()}
        disabled={!(username && password && email)}
      />
    </>
  );
}

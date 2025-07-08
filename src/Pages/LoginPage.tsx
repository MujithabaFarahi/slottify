import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import LinkedInIcon from '../assets/icons/linkedin.svg';
import logo from '../assets/icons/logo.svg';
import bg from '../assets/images/Login Art.png';
import bgMobile from '../assets/images/Login Art (1).png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { useAuth } from '@/config/AuthContext';
import { Button } from '@/components/ui/button';
import { setIsLoading } from '@/redux/features/authSlice';
import { auth } from '@/config/Firebase';
import { Input } from '@/components/ui/input';
import type { AppDispatch, RootState } from '@/redux/store/store';

export default function LoginPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.auth);

  const [isVisible] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const validateEmail = (email: string) => {
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as string;
    setEmail(value);

    if (value.length > 0 && !validateEmail(value)) {
      setEmailError('Incorrect email. Please try again.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as string;
    setPassword(value);

    // if (!validatePassword(value)) {
    //   setPasswordError('Wrong password. Please check and retry.');
    // } else {
    //   setPasswordError('');
    // }
  };

  const handleLinkedInLogin = () => {
    const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      import.meta.env.VITE_LINKEDIN_REDIRECT_URI
    );
    // const scope = encodeURIComponent('r_basicprofile');
    const scope = encodeURIComponent('openid profile email');
    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    // window.open(linkedInAuthUrl);
    window.location.href = linkedInAuthUrl;
  };

  const { user, userType } = useAuth();

  useEffect(() => {
    if (user && userType) {
      console.log('User type detected:', userType);
      if (userType === 'CANDIDATE') {
        navigate('/jobs');
      } else {
        navigate('/dashboard');
      }
    }
  }, [loading, user, userType, navigate]);

  return (
    <div className=" bg-primary-50 font-noto">
      <div className="flex min-h-screen gap-16 p-5 mx-auto md:justify-evenly md:items-center bg-primary-50 max-w-screen-2xl">
        <div className="flex flex-col gap-6 grow max-h-[860px]">
          <div className="hidden md:flex ">
            <img src={logo} alt="IrecruitHub" />
          </div>
          <div className="flex flex-col h-full gap-8 mx-auto md:max-w-sm md:justify-center grow">
            <div className="relative md:hidden">
              <div className="mb-4 rounded-full">
                <img src={logo} alt="IrecruitHub" />
              </div>
              <img
                src={bgMobile}
                alt="Human"
                className="object-cover w-full min-h-48 rounded-2xl"
              />
            </div>
            <div className="flex flex-col flex-grow">
              <h3 className="text-2xl font-bold md:text-4xl text-primary-800">
                Welcome Back 👋
              </h3>
              <p className="hidden my-6 text-sm md:flex">
                Today is a new day. It's your day. You shape it. Sign in to
                start finding recruiters easily.
              </p>
              <div className="flex flex-col gap-4 mt-6">
                <Input
                  // inputClassName="overflow-hidden bg-white border-2 rounded-md border-grey-200"
                  name="email"
                  value={email}
                  placeholder="E.g., jhondoe@gmail.com"
                  onChange={handleEmailChange}
                  // label="Email Address"
                  // errorMessage={emailError}
                />
                <Input
                  // inputClassName="overflow-hidden bg-white border-2 rounded-md border-grey-200"
                  name="password"
                  value={password}
                  minLength={8}
                  placeholder="Enter Your 8 digit Password Here"
                  onChange={handlePasswordChange}
                  // label="Password"
                  type={isVisible ? 'text' : 'password'}
                  //   endContent={
                  //     <button
                  //       className="focus:outline-none"
                  //       type="button"
                  //       onClick={() => setIsVisible(!isVisible)}
                  //       aria-label="toggle password visibility"
                  //     >
                  //       {isVisible ? (
                  //         <p className="text-xs font-semibold underline">Hide</p>
                  //       ) : (
                  //         <p className="text-xs font-semibold underline">Show</p>
                  //       )}
                  //     </button>
                  //   }
                />
              </div>
              <div className="flex justify-end mt-2">
                <a
                  className="text-sm font-semibold focus:outline-none text-primary-500"
                  href="/forget"
                >
                  Forgot Password?
                </a>
              </div>

              <Button
                // loading={loading}
                onClick={async () => {
                  try {
                    dispatch(setIsLoading(true));
                    console.log('Attempting login...', { email, password });

                    if (!email || !password) {
                      toast.error('Email and Password cannot be empty.');
                      dispatch(setIsLoading(false));
                      return;
                    }

                    // 🔹 Step 1: Firebase Authentication
                    const userCredential = await signInWithEmailAndPassword(
                      auth,
                      email,
                      password
                    );
                    const user = userCredential.user;
                    console.log('Firebase authentication successful:', user);

                    // 🔹 Step 2: Get Firebase ID Token
                    const idToken = await user.getIdToken();
                    console.log('Firebase ID Token:', idToken);

                    // 🔹 Step 3: Send Login Request to Backend
                    const response = await fetch(
                      `${
                        import.meta.env.VITE_API_BASE_URL
                      }/web/common/auth/login`,
                      {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          idToken,
                          email,
                          password,
                        }),
                      }
                    );

                    const payload = await response.json();
                    console.log('Backend response:', payload);

                    if (response.ok && payload.user) {
                      console.log('User role from backend:', payload.user.role);

                      // ✅ 🔹 Step 4: Store user details in local storage
                      localStorage.setItem(
                        'userData',
                        JSON.stringify({
                          email: payload.user.email,
                          id: payload.user.id,
                          name: payload.user.name || payload.user.companyName,
                          imageUrl: payload.user.photoUrl || '',
                          role: payload.user.role,
                          idToken,
                        })
                      );

                      if (payload.user.role === 'CANDIDATE') {
                        navigate('/getalljobs');
                      } else {
                        navigate('/dashboard');
                      }
                    } else {
                      toast.error(payload.message || 'Invalid credentials.');
                    }

                    dispatch(setIsLoading(false));
                  } catch (error) {
                    dispatch(setIsLoading(false));
                    toast.error('Login failed. Please check your credentials.');
                    console.error('Login failed:', error);
                  }
                }}
                // buttonContent="Login"
                disabled={!email || !password}
              >
                Login
              </Button>

              <div className="flex items-center gap-4 my-4">
                <div className="w-full border-b border-primary-100"></div>
                <p className="pb-0.5 text-center text-xs text-[#222222]">or</p>
                <div className="w-full border-b border-primary-100"></div>
              </div>

              <Button
                className="py-3.5 text-sm font-bold border  text-black rounded-lg full py md:text-base bg-gradient-to-l from-primary-100 to-white border-primary-100"
                onClick={() => {
                  handleLinkedInLogin();
                }}
                // buttonContent={
                //   <p className="w-full ">Continue with LinkedIn</p>
                // }
              >
                Continue with LinkedIn
              </Button>

              <div className="flex justify-center my-4 text-sm">
                <p>
                  Don’t you have an account?&nbsp;{' '}
                  <span>
                    <button
                      onClick={() => {
                        navigate('/register');
                      }}
                      className="font-semibold focus:outline-none text-primary-500"
                      type="button"
                    >
                      Sign Up
                    </button>
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-end flex-grow md:mb-4 md:justify-center">
              <p className="text-[10px] text-center w-full text-grey-500 font-noto">
                Copyright © 2025 TECHGROW | All Rights Reserved
                {/* Copyright © 2024 SYNTAX Pvt(Ltd) | All Rights Reserved |{' '}
                <span className="text-black underline cursor-pointer decoration-grey-500">
                  Terms and Conditions
                </span>{' '}
                |{' '}
                <span className="text-black underline cursor-pointer decoration-grey-500">
                  Privacy Policy
                </span> */}
              </p>
            </div>
          </div>
        </div>
        <div className="hidden w-1/2 md:flex">
          <div className="relative">
            <img
              src={bg}
              alt="Human"
              className="object-cover w-full rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

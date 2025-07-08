// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import logo from '../assets/icons/logo.svg';
// import bg from '../assets/images/Login Art.png';
// import bgMobile from '../assets/images/Login Art (1).png';
// import back from '../assets/icons/linkedin.svg';

// import { useDispatch } from 'react-redux';
// import type { AppDispatch } from '@/redux/store';
// import { CustomInput } from 'components/CustomInput';
// import { Button } from '@/components/ui/button';

// export default function ForgotPasswordPage() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();

//   // const { loading } = useSelector((state: RootState) => state.auth);

//   const [email, setEmail] = useState<string>('');
//   const [emailError, setEmailError] = useState<string>('');
//   const [emailRequired, setEmailRequired] = useState(false);
//   // const [isOpen, setIsOpen] = useState(false);

//   // const onOpen = () => {
//   //   setIsOpen(true);
//   // };

//   // const onClose = () => {
//   //   setIsOpen(false);
//   // };

//   // const onOpenChange = () => {
//   //   setIsOpen(!isOpen);
//   // };

//   const validateEmail = (email: string) => {
//     const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
//     return emailRegex.test(email);
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value as string;
//     setEmail(value);

//     if (value.length > 0 && !validateEmail(value)) {
//       setEmailError('Incorrect email. Please try again.');
//     } else {
//       setEmailError('');
//     }
//   };

//   return (
//     <div className=" bg-primary-50 font-noto">
//       <div className="flex min-h-screen gap-16 p-5 mx-auto md:justify-evenly md:items-center bg-primary-50 max-w-screen-2xl">
//         <div className="flex flex-col gap-6 grow max-h-[860px]">
//           <div className="hidden md:flex ">
//             <img src={logo} alt="IrecruitHub" />
//           </div>
//           <div className="flex flex-col h-full gap-8 mx-auto md:max-w-sm md:justify-center grow">
//             <div className="relative md:hidden">
//               <div className="mb-4 rounded-full">
//                 <img src={logo} alt="IrecruitHub" />
//               </div>
//               <img
//                 src={bgMobile}
//                 alt="Human"
//                 className="object-cover w-full min-h-48 rounded-2xl"
//               />
//             </div>
//             <div className="flex flex-col flex-grow">
//               <div
//                 className="flex items-center w-16 gap-2 mb-4 cursor-pointer"
//                 onClick={() => {
//                   navigate('/login');
//                 }}
//               >
//                 <img src={back} alt="Arrow back"></img>
//                 <p className="text-sm font-semibold">Back</p>
//               </div>
//               <h3 className="text-2xl font-bold md:text-4xl text-primary-800">
//                 Forgot Password 🔑
//               </h3>
//               <p className="hidden my-6 text-sm md:flex">
//                 Please enter the below details to reset your password
//               </p>
//               <div className="flex flex-col gap-4 mt-6">
//                 <CustomInput
//                   inputClassName="overflow-hidden bg-white border-2 rounded-md border-grey-200"
//                   name="email"
//                   value={email}
//                   required={emailRequired}
//                   placeholder="E.g., info@syntaxerreur.com"
//                   onChange={handleEmailChange}
//                   label="Email Address"
//                   errorMessage={emailError}
//                 />
//               </div>

//               <Button
//                 onClick={async () => {
//                   try {
//                     // const reset = await sendPasswordResetEmail(auth, email);
//                     // console.log(reset);
//                     // dispatch(resetPassword({ email }));
//                     // onOpen();
//                   } catch (error) {
//                     console.error('Error sending reset email:', error);
//                   }
//                 }}
//                 disabled={emailError.length > 0 || !email}
//               >
//                 Send Mail{' '}
//               </Button>

//               {/* <SuccessModal
//                 isOpen={isOpen}
//                 onClose={onClose}
//                 onOpenChange={onOpenChange}
//                 onButtonClick={onClose}
//                 mainHeading="Mail Sent!"
//                 title="Email Sent Successful"
//                 description="We sent an e-mail to&nbsp;"
//                 email={email}
//               /> */}

//               <div className="flex justify-center my-4 text-sm">
//                 <p>
//                   Don’t you have an account?&nbsp;{' '}
//                   <span>
//                     <button
//                       onClick={() => {
//                         navigate('/register');
//                       }}
//                       className="font-semibold focus:outline-none text-primary-500"
//                       type="button"
//                     >
//                       Sign Up
//                     </button>
//                   </span>
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-end flex-grow md:mb-4 md:justify-center">
//               <p className="text-[10px] text-center w-full text-grey-500 font-noto">
//                 Copyright © 2025 TECHGROW | All Rights Reserved
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="hidden w-1/2 md:flex">
//           <div className="relative">
//             <img
//               src={bg}
//               alt="Human"
//               className="object-cover w-full rounded-2xl"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

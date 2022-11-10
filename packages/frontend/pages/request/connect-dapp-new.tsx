// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

export default function ConnectDappHandler (): JSX.Element {
  return <p>placeholder!()</p>;
}

// import { Dialog, RadioGroup } from '@headlessui/react';
// import { CheckIcon, XIcon } from '@heroicons/react/outline';
// import { hexToU8a, u8aToHex } from '@skyekiwi/util';
// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
// // redux
// import { useDispatch, useSelector } from 'react-redux';

// import { compressParameters, decompressParameters } from '@choko-wallet/core/util';
// import Modal from '@choko-wallet/frontend/components/Modal';
// // import SuperButton from '@choko-wallet/frontend/components/SuperButton';
// import { selectCurrentUserAccount, selectUserAccount } from '@choko-wallet/frontend/features/redux/selectors';
// import { decryptCurrentUserAccount, loadUserAccount, switchUserAccount } from '@choko-wallet/frontend/features/slices/user';
// import { ConnectDappDescriptor, ConnectDappRequest } from '@choko-wallet/request-handler';

// // http://localhost:3000/request/connect-dapp?requestType=connectDapp&payload=01789c6360606029492d2e61a00c883b67e467e72b8427e6e4a4962838e61464242a8490626c4b5d75fdc2841bf124d809006db70e53&callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Falpha

// function ConnectDappHandler (): JSX.Element {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const userAccount = useSelector(selectUserAccount);
//   const currentUserAccount = useSelector(selectCurrentUserAccount);

//   const [openPasswordModal, setOpenPasswordModal] = useState(false);
//   const [password, setPassword] = useState('');

//   const [mounted, setMounted] = useState<boolean>(false);

//   const [selectedUserAccount, setSelectedUserAccount] = useState<string>('');
//   const [request, setRequest] = useState<ConnectDappRequest>(null);
//   const [callback, setCallback] = useState<string>('');

//   useEffect(() => {
//     if (!localStorage.getItem('serialziedUserAccount')) {
//       void router.push('/account');
//     } else {
//       dispatch(loadUserAccount());
//     }

//     setMounted(true);
//   }, [dispatch, router]);// initialization

//   useEffect(() => {
//     if (!router.isReady) return;
//     const payload = router.query.payload as string;
//     const callbackUrl = router.query.callbackUrl as string;
//     const u8aRequest = decompressParameters(hexToU8a(payload));

//     setCallback(callbackUrl);
//     setRequest(ConnectDappRequest.deserialize(u8aRequest));
//   }, [router.isReady, router.query]);

//   useEffect(() => {
//     if (userAccount && currentUserAccount) {
//       setSelectedUserAccount(currentUserAccount.address);
//     }
//   }, [router, dispatch, userAccount, currentUserAccount]);

//   function unlock () {
//     if (request) {
//       try {
//         dispatch(decryptCurrentUserAccount(password));
//         console.log('successfully');
//         toast('Password Correct, Redirecting...', {
//           duration: 5000,
//           icon: '👏',
//           style: {
//             background: 'green',
//             color: 'white',
//             fontFamily: 'Poppins',
//             fontSize: '17px',
//             fontWeight: 'bolder',
//             padding: '20px'
//           }
//         });

//         if (currentUserAccount && !currentUserAccount.isLocked) {
//           void (async () => {
//             const connectDapp = new ConnectDappDescriptor();
//             const response = await connectDapp.requestHandler(request, currentUserAccount);
//             const s = response.serialize();

//             setPassword('');
//             setOpenPasswordModal(false);

//             window.location.href = callback + `?response=${u8aToHex(compressParameters(s))}&responseType=connectDapp`;
//           })();
//         }
//       } catch (e) {
//         toast('Wrong Password!', {
//           style: {
//             background: 'red',
//             color: 'white',
//             fontFamily: 'Poppins',
//             fontSize: '16px',
//             fontWeight: 'bolder',
//             padding: '20px'
//           }
//         });
//       }
//     }
//   }

//   function closeModal () {
//     setPassword('');
//     setOpenPasswordModal(false);
//   }

//   if (!mounted) {
//     return null;
//   }

//   return (
//     <div className='bg-primary min-h-screen p-5 md:p-10 lg:p-20 flex items-center justify-center'>
//       <Toaster />

//       <div className='relative gradient-border p-[2px] rounded-3xl w-full max-w-[700px]'>
//         <div className='pink_gradient' />

//         <div className='z-20 relative bg-gradient-to-br from-gray-900 to-black flex-grow shadow-xl rounded-3xl flex flex-col p-10 '>
//           <p className='absolute text-xl md:text-3xl md:m-6 italic text-gray-200 top-4 right-4'>{request?.dappOrigin.activeNetwork.text}</p>
//           <p className='my-3 text-gradient font-poppins'>Request to Connect From a Dapp</p>
//           <p className='my-3 text-gradient font-poppins'>Give the Dapp your public address.</p>
//           <p className='my-3 text-gradient font-poppins'>DApp Origin: {request?.dappOrigin.displayName}</p>

//           <RadioGroup className=''
//             onChange={setSelectedUserAccount}
//             value={selectedUserAccount}>
//             {Object.keys(userAccount).map((name, index) => (
//               <RadioGroup.Option
//                 className={({ checked }) =>
//                   `${checked ? 'bg-gradient-to-br from-gray-900 to-black border border-[#03F3FF] ' : ' bg-gray-700 '}
//                       m-5 relative flex cursor-pointer  rounded-lg p-4 shadow-md focus:outline-none font-poppins`
//                 }
//                 key={index}
//                 onClick={() => dispatch(switchUserAccount(name))}
//                 value={name}
//               >
//                 {({ checked }) => (
//                   <div className='flex w-full items-center justify-center p-3'>
//                     <div className='flex items-center'>
//                       <div className='text-sm '>
//                         <RadioGroup.Label
//                           as='div'
//                           className={`font-medium  ${checked ? 'text-gradient' : 'text-white'}`}
//                         >
//                           <div className='w-[230px] md:w-full'
//                             style={{ overflowWrap: 'break-word' }}>{name}</div>
//                         </RadioGroup.Label>
//                       </div>
//                     </div>

//                   </div>
//                 )}
//               </RadioGroup.Option>
//             ))}
//           </RadioGroup>

//           <div className='flex items-center justify-evenly '>

//             <div className='flex items-center justify-center '
//               onClick={() => setOpenPasswordModal(true)}
//             >
//               {/* <SuperButton Icon={CheckIcon}
//                 title='OK' /> */}
//             </div>
//             <div className='flex items-center justify-center '
//               onClick={() => router.push('/')}
//             >
//               {/* <SuperButton Icon={XIcon}
//                 title='Cancel' /> */}
//             </div>
//           </div>

//         </div>

//         <div className='blue_gradient z-10' />
//       </div>

//       {/* <Modal
//       // closeModal={closeModal}
//       // isOpen={openPasswordModal}
//       >

//         <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black p-6 text-left align-middle shadow-xl transition-all border border-[#00f6ff] '>
//           <Dialog.Title
//             as='h3'
//             className='font-poppins text-lg font-medium leading-6 text-gradient w-72'
//           >
//             Unlock Wallet with Password
//           </Dialog.Title>
//           <div className='my-6'>
//             <p className='text-sm text-gray-500'>
//               <input className='input input-bordered w-full bg-gray-700'
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder='Account Password'

//                 type='password'
//                 value={password}
//               />
//             </p>
//           </div>

//           <div className='mt-4 flex justify-between'>
//             <button
//               className='font-poppins py-3 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'

//               onClick={unlock}
//               type='button'
//             >
//               Unlock
//             </button>

//           </div>
//         </Dialog.Panel>

//       </Modal> */}
//     </div>
//   );
// }

// export default ConnectDappHandler;

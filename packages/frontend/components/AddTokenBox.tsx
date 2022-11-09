// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

export {};
// import { ApiPromise, WsProvider } from '@polkadot/api';
// import { u8aToHex } from '@skyekiwi/util';
// import { Alchemy } from 'alchemy-sdk';
// import { ethers } from 'ethers';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';

// import { xxHash } from '@choko-wallet/core/util';

// import alchemyAll from '../utils/alchemy';
// import { KnownNetworks, Network } from '../utils/knownNetworks';

// interface Props {
//   knownNetworks?: KnownNetworks;
//   closeAddTokenModal?: () => void;
//   currentNetwork: Network;
// }

// type FormData = {
//   ERC20TokenAddress: string;

// }

// // interface networkObject {
// //   [key: string]: Network
// // }

// // wss://acala-rpc.dwellir.com
// const AddNetworkBox = ({ closeAddTokenModal, currentNetwork, knownNetworks }: Props): JSX.Element => {
//   const { formState: { errors }, handleSubmit, register, setValue } = useForm<FormData>();
//   const [addTokenLoading, setAddTokenLoading] = useState<boolean>(false);

//   const onSubmit = handleSubmit(async (formData) => {
//     if (addTokenLoading) return;
//     setAddTokenLoading(true);

//     // const notification = toast.loading('Adding Token...');
//     console.log(formData);

//     // 获取币信息metadata 加到localstorage? 重新加载带localstorage?  获取余额

//     try {
//       // alchemy
//       const alchemy: Alchemy = alchemyAll.alchemyEthGoerli;

//       // 0x326C977E6efc84E512bB9C30f76E30c160eD06FB  goerli的erc20

//       const balances = await alchemy.core.getTokenBalances('0xBF544eBd099Fa1797Ed06aD4665646c1995629EE');

//       console.log('balances', balances);
//       const metadata = await alchemy.core.getTokenMetadata(formData.ERC20TokenAddress);

//       console.log('metadata', metadata);
//     } catch (err) {

//     }
//   });

//   // console.log('networkType,networkType', networkType);

//   return (
//     <form
//       onSubmit={onSubmit}
//     >

//       <div className=''>
//         <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins font-semibold'>
//           ERC20 Token Address: </p>
//         <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins font-semibold'>
//           On {currentNetwork.info}</p>
//         <input
//           className='input border border-[#c67391] w-full '
//           {...register('ERC20TokenAddress', { required: true })}
//           placeholder='0x0000'
//           type='text'
//         />
//         {/* 0x326C977E6efc84E512bB9C30f76E30c160eD06FB */}
//       </div>

//       {Object.keys(errors).length > 0 && (
//         <div className='p-2 space-y-2 text-red-500 font-poppins font-semibold'>
//           {errors.ERC20TokenAddress?.type === 'required' && (
//             <p>Token Address is required</p>
//           )}

//         </div>
//       )}

//       {addTokenLoading
//         ? (
//           <img
//             alt=''
//             className='object-cover w-full h-20'
//             src='https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif'
//           />
//         )
//         : <button
//           className='mt-5 py-3 px-6 font-medium text-[18px] text-primary bg-[#c67391] rounded-[10px] outline-none font-poppins'
//           type='submit'
//         >
//           Add Token
//         </button>
//       }

//     </form >
//   );
// };

// export default AddNetworkBox;

// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiPromise, WsProvider } from '@polkadot/api';
import { u8aToHex } from '@skyekiwi/util';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ethers } from "ethers";
import { KnownNetworks, Network } from '@choko-wallet/core';
import { xxHash } from '@choko-wallet/core/util';

interface Props {
  knownNetworks: KnownNetworks;
  closeAddTokenModal: () => void;
}

type FormData = {
  ERC20TokenAddress: string;

}

interface networkObject {
  [key: string]: Network
}

// wss://acala-rpc.dwellir.com
const AddNetworkBox = ({ closeAddTokenModal, knownNetworks }: Props): JSX.Element => {
  const { formState: { errors }, handleSubmit, register, setValue } = useForm<FormData>();
  const [addTokenLoading, setAddTokenLoading] = useState<boolean>(false);


  const onSubmit = handleSubmit(async (formData) => {
    if (addTokenLoading) return;
    setAddTokenLoading(true);

    // const notification = toast.loading('Adding Token...');
    console.log(formData)



  });

  // console.log('networkType,networkType', networkType);

  return (
    <form
      onSubmit={onSubmit}
    >

      <div className=''>
        <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins font-semibold'>
          ERC20 Token Address:</p>
        <input
          className='input border border-[#c67391] w-full '
          {...register('ERC20TokenAddress', { required: true })}
          placeholder='0x0000'
          type='text'
        />
      </div>




      {Object.keys(errors).length > 0 && (
        <div className='p-2 space-y-2 text-red-500 font-poppins font-semibold'>
          {errors.ERC20TokenAddress?.type === 'required' && (
            <p>Network RPC is required</p>
          )}

        </div>
      )}

      {addTokenLoading
        ? (
          <img
            alt=''
            className='object-cover w-full h-20'
            src='https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif'
          />
        )
        : <button
          className='mt-5 py-3 px-6 font-medium text-[18px] text-primary bg-[#c67391] rounded-[10px] outline-none font-poppins'
          type='submit'
        >
          Add Token
        </button>
      }

    </form >
  );
};

export default AddNetworkBox;

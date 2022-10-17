// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type FormData = {
  networkName: string
  netWorkRPC: string
}

const AddNetworkBox = () => {
  const { formState: { errors },
    handleSubmit,
    register,
    setValue } = useForm<FormData>();

  const onSubmit = handleSubmit((formData) => {
    const notification = toast.loading('Adding Network...');

    try {
      // add network  with switch this network ?  fetch balance ?
      // throuth redux to fire off home action?
      // netWorkRPC 是否需要check 已存在怎么处理

      setTimeout(() => {
        console.log('added:', formData.networkName);

        setValue('networkName', '');
        setValue('netWorkRPC', '');

        toast.success('New Network Added', {
          id: notification
        });
      }, 3000);
    } catch (err) {
      toast.error('Whoops! something went wrong!', {
        id: notification
      });
      console.log(err);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
    >
      <div className=''>
        <p className=' text-gray-700 dark:text-white mt-3 mb-1'>Network Name</p>
        <input
          {...register('networkName', { required: true })}
          className='input border border-[#c67391] w-full '
          placeholder={'Polkadot'}
          type='text'
        />
      </div>

      <div className=''>
        <p className=' text-gray-700 dark:text-white mt-3 mb-1'>Network RPC</p>
        <input
          className='input border border-[#c67391] w-full '
          {...register('netWorkRPC', { required: true })}
          placeholder='wss://polkadot.parity.io/ws'
          type='text'
        />
      </div>

      {Object.keys(errors).length > 0 && (
        <div className='p-2 space-y-2 text-red-500'>
          {errors.networkName?.type === 'required' && (
            <p>Network Name is required</p>
          )}
          {errors.netWorkRPC?.type === 'required' && (
            <p>Network RPC is required</p>
          )}
        </div>
      )}

      <button
        className='mt-5 py-3 px-6 font-medium text-[18px] text-primary bg-[#c67391] rounded-[10px] outline-none '
        type='submit'
      >
        Add Network
      </button>

    </form >
  );
};

export default AddNetworkBox;

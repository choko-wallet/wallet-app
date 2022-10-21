// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiPromise, WsProvider } from '@polkadot/api';
import { u8aToHex } from '@skyekiwi/util';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { KnownNetworks, Network } from '@choko-wallet/core';
import { xxHash } from '@choko-wallet/core/util';

interface Props {
  knownNetworks: KnownNetworks;
  closeAddNetworkModal: () => void;
}

type FormData = {
  // networkName: string
  netWorkRPC: string
}

interface networkObject {
  [key: string]: Network
}

// wss://acala-rpc.dwellir.com
const AddNetworkBox = ({ closeAddNetworkModal, knownNetworks }: Props): JSX.Element => {
  const { formState: { errors }, handleSubmit, register, setValue } = useForm<FormData>();
  const [addNetworkLoading, setAddNetworkLoading] = useState<boolean>(false);
  const [networkType, setNetworkType] = useState<string>('polkadot');

  const networkTypeArray: string[] = ['polkadot', 'ethereum'];

  const onSubmit = handleSubmit(async (formData) => {
    if (addNetworkLoading) return;
    setAddNetworkLoading(true);

    const notification = toast.loading('Adding Network...');

    try {
      const provider = new WsProvider(formData.netWorkRPC);
      const api = await ApiPromise.create({ provider });

      const chainInfo = api.registry.getChainProperties();
      const [chain] = await Promise.all([api.rpc.system.chain()]);

      const networkForAdding = new Network({
        /* eslint-disable */
        defaultProvider: formData.netWorkRPC,
        info: chain.toLocaleLowerCase(),
        networkType: 'polkadot',
        providers: { defaultProvider: formData.netWorkRPC },
        text: chain + ' Network',
        // @ts-ignore
        nativeTokenSymbol: chainInfo.toHuman().tokenSymbol[0],
        // @ts-ignore
        nativeTokenDecimal: Number(chainInfo.toHuman().tokenDecimals[0]),
        /* eslint-enable */
      });

      const hexString = u8aToHex(xxHash(chain.toLocaleLowerCase()));

      if (Object.keys(knownNetworks).includes(hexString)) { // check network already exists or not
        throw new Error('Network already exists');
      }

      knownNetworks[hexString] = networkForAdding;// home can get

      // add network to localstorage
      const maybeNetworkAdded: string = localStorage.getItem('networkAdded');
      const maybeNetworkAddedObject: networkObject | null = JSON.parse(maybeNetworkAdded) as networkObject | null;
      const networkObject: networkObject = maybeNetworkAddedObject || {};

      networkObject[hexString] = networkForAdding;
      localStorage.setItem('networkAdded', JSON.stringify(networkObject));
      console.log('added:', JSON.parse(localStorage.getItem('networkAdded')));

      // console.log('added:', networkForAdding);

      // setValue('networkName', '');
      setValue('netWorkRPC', '');
      closeAddNetworkModal();
      setAddNetworkLoading(false);
      toast.success('New Network Added', {
        id: notification
      });
    } catch (err) {
      setAddNetworkLoading(false);
      toast.error('Whoops! something went wrong!', {
        id: notification
      });
      console.log(err);
    }
  });

  // console.log('networkType,networkType', networkType);

  return (
    <form
      onSubmit={onSubmit}
    >
      {/* <div className=''>
        <p className=' text-gray-700 dark:text-white mt-3 mb-1'>Network Name</p>
        <input
          {...register('networkName', { required: true })}
          className='input border border-[#c67391] w-full '
          placeholder={'Polkadot'}
          type='text'
        />
      </div> */}

      <div className=''>
        <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins font-semibold'>
          Network RPC</p>
        <input
          className='input border border-[#c67391] w-full '
          {...register('netWorkRPC', { required: true })}
          placeholder='wss://polkadot.parity.io/ws'
          type='text'
        />
      </div>

      <p className=' text-gray-700 dark:text-white mt-4  font-poppins font-semibold'>
        Network Type: {networkType}</p>
      <div className='flex items-center justify-between'>
        {networkTypeArray.map((item) => {
          return (
            <div
              className=''
              key={item}
              onClick={() => setNetworkType(item)} >
              {networkType === item
                ? <p className='px-10 py-4 my-2 font-bold text-black transition duration-150
                bg-[#c67391] rounded-full shadow-md hover:shadow-xl active:scale-90 '>{item}</p>
                : <p className='px-10 py-4 my-2 font-bold text-gray-600 transition duration-150
                bg-white rounded-full shadow-md hover:shadow-xl active:scale-90 '>{item}</p>
              }
            </div>
          );
        })
        }
      </div>

      {Object.keys(errors).length > 0 && (
        <div className='p-2 space-y-2 text-red-500 font-poppins font-semibold'>
          {/* {errors.networkName?.type === 'required' && (
            <p>Network Name is required</p>
          )} */}
          {errors.netWorkRPC?.type === 'required' && (
            <p>Network RPC is required</p>
          )}
        </div>
      )}

      {addNetworkLoading
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
          Add Network
        </button>
      }

    </form >
  );
};

export default AddNetworkBox;

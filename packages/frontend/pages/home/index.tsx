// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog } from '@headlessui/react';
import { CameraIcon, CheckIcon, ChevronRightIcon, XIcon } from '@heroicons/react/outline';
import { DocumentDuplicateIcon, DownloadIcon, PaperAirplaneIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Toaster } from 'react-hot-toast';
import QRCode from 'react-qr-code';
import { QrReader } from 'react-qr-reader';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import AddTokenBox from '@choko-wallet/frontend/components/AddTokenBox';
import Balance from '@choko-wallet/frontend/components/Balance';
import Footer from '@choko-wallet/frontend/components/Footer';
import NetworkSelection from '@choko-wallet/frontend/components/NetworkSelection';
import { BalanceInfo } from '@choko-wallet/frontend/utils/types';

import DropdownForNetwork from '../../components/DropdownForNetwork';
import DropdownForSend from '../../components/DropdownForSend';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import { selectCurrentNetwork, selectCurrentUserAccount, selectKnownNetworks, selectLoading, selectStatus } from '../../features/redux/selectors';
import { useAppThunkDispatch } from '../../features/redux/store';
import { loadAllNetworks } from '../../features/slices/network';
import { endLoading, setClose, startLoading, toggle } from '../../features/slices/status';
import { loadUserAccount } from '../../features/slices/user';
import { ethFetchBalance } from '../../utils/ethFetchBalance';
import { polkadotFetchBalance } from '../../utils/polkadotFetchBalance';
import { toastFail, toastSuccess } from '../../utils/toast';

/* eslint-disable sort-keys */
export default function Home(): JSX.Element {
  const dispatch = useAppThunkDispatch();

  const nodeRef = React.useRef(null);

  const { setTheme, theme } = useTheme();
  const router = useRouter();

  const currentUserAccount = useSelector(selectCurrentUserAccount);
  const currentNetwork = useSelector(selectCurrentNetwork);
  const knownNetworks = useSelector(selectKnownNetworks);
  const status = useSelector(selectStatus);
  const loadingText = useSelector(selectLoading);

  const [mounted, setMounted] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [amount, setAmount] = useState<number>(0);
  const [amountToCurrency, setAmountToCurrency] = useState<number>(0);
  const [openScan, setOpenScan] = useState<boolean>(false);
  const [addressToSend, setAddressToSend] = useState<string>('');
  const [showCheck, setShowCheck] = useState<boolean>(false);

  const [networkToReceive, setNetworkToReceive] = useState<string>('');
  const [balanceInfo, setBalanceInfo] = useState<BalanceInfo>({});

  const networks = ['Ethereum (ERC20)', 'BNB Smart Chain (BEP20)', 'Tron (TRC20)'];

  useEffect(() => {
    if (loadingText && loadingText.length !== 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loadingText]);

  useEffect(() => {
    // Fetch balance and price once the network & user account is loaded in Redux
    if (!knownNetworks) return;
    if (!currentUserAccount) return;
    if (!currentNetwork) return;
    // no need to await
    console.log('useEffect-changenetwork')//切换网络或变量 可能会多次触发useEffect
    void fetchBalanceAndPrice();//
    setMounted(true);
  }, [currentNetwork, currentUserAccount]);

  useEffect(() => {
    // IF account is not in localStorage - redirect to account creation page
    if (!localStorage.getItem('serialziedUserAccount')) {
      void router.push('/account');
    } else {
      // We are all good. Load UserAccount & Networks
      dispatch(loadUserAccount());
      dispatch(loadAllNetworks());
    }
  }, [dispatch, router]);

  useEffect(() => {
    if (theme !== 'dark' && theme !== 'light') {
      setTheme('light');
    }
  }, [setTheme, theme]);

  const fetchBalanceAndPrice = async () => {
    dispatch(startLoading('Fetching Balance ...'));

    const network = knownNetworks[currentNetwork];
    console.log('network', network)
    switch (network.networkType) {
      case 'polkadot':
        try {
          const res = await polkadotFetchBalance(network, currentUserAccount.address);

          console.log(res);
          setBalanceInfo(res);
          dispatch(endLoading());
          toastSuccess(`Changed to ${network.text}`);
        } catch (e) {
          console.error(e);
          dispatch(endLoading());
          toastFail('Someting Wrong! Please Switch To Other Network.');
        }

        break;
      case 'ethereum':
        try {
          console.log('ethereum');
          // const res = await ethFetchBalance(network, currentUserAccount.address);
          // const res = await ethFetchBalance(network, '0xa5E4E1BB29eE2D16B07545CCf565868aE34F92a2');
          const res = await ethFetchBalance(network, '0xBF544eBd099Fa1797Ed06aD4665646c1995629EE');//goerli

          console.log('res', res);

          setBalanceInfo(res);
          dispatch(endLoading());
          toastSuccess(`Changed to ${network.text}`);
        } catch (e) {
          console.error(e);
          dispatch(endLoading());
          toastFail('Someting Wrong! Please Switch To Other Network.');
        }

        break;
    }
  };




  if (!mounted || !localStorage.getItem('serialziedUserAccount')) { return null; }

  if (loading) return <Loading />;

  const handleCopy = () => {
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  };
  // console.log('currentNetwork-11', knownNetworks[network])

  return (
    <div className={theme}>

      <div className='relative bg-gradient-to-br from-[#DEE8F1] to-[#E4DEE8] dark:from-[#22262f] dark:to-[#22262f] min-h-screen flex flex-col justify-between'>
        <Toaster />
        <Header />

        <CSSTransition
          className='md:hidden z-40 p-6 w-[300px] bg-[#DEE8F1] dark:bg-[#22262f] absolute top-0 bottom-0'
          classNames='drawer'
          in={status.homeMobileDrawer}
          nodeRef={nodeRef}
          timeout={500}
          unmountOnExit
        >
          <div ref={nodeRef}>
            <p className='text-lg flex  w-full font-semibold justify-between text-black dark:text-white font-poppins'>Change Network
              <XIcon className=' text-black dark:text-white h-8 w-8 cursor-pointer '
                onClick={() => dispatch(toggle('homeMobileDrawer'))} />
            </p>

            <div className='flex md:flex-col items-center md:h-full bg-transparent' >

              <NetworkSelection />

            </div>
          </div>
        </CSSTransition>

        < main className='min-h-[750px] bg-transparent h-80v  dark:bg-[#22262f] max-w-7xl mx-auto' >

          <div className='bg-transparent flex-col h-full  flex md:flex-row mx-3 md:mx-10'>

            <div className='bg-transparent'>
              <button
                className='md:hidden mb-2 w-[158px] h-[40px] flex items-center justify-center active:scale-95 transition duration-150 ease-out py-1   bg-[#4797B5] rounded-[8px] outline-none '
                onClick={() => dispatch(toggle('homeMobileDrawer'))}
              >
                <p className='ml-1  text-white text-md font-semibold font-poppins'>NETWORK</p>
                <ChevronRightIcon className=' text-white h-6 w-6 ml-6  ' />
              </button>
              <p className='ml-1 hidden md:block text-gray-800 dark:text-white text-md font-semibold font-poppins'>NETWORK</p>

              {/* wideScreen network */}
              <div className=' hidden md:inline-flex md:flex-col bg-transparent dark:bg-[#22262f] items-center md:h-full mr-10' >
                <NetworkSelection />
              </div>
            </div>

            <Balance balance={balanceInfo} />

          </div>

          {/* send modal */}
          <Modal modalName='homeSend'>
            <div className={theme}>
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br from-gray-800 to-black p-6 text-left align-middle shadow-xl transition-all border border-[#00f6ff]'>
                <Dialog.Title
                  as='h3'
                  className='text-lg  font-medium leading-6 flex items-center mb-6 '
                >
                  <div className='flex items-center  flex-grow'>
                    <PaperAirplaneIcon className='rotate-45 text-gray-700 h-8 w-8 dark:text-[#03F3FF]' />
                    {theme === 'dark'
                      ? <p className=' text-gradient font-poppins'>Send Crypto</p>
                      : <p className=' text-gray-700 font-poppins'>Send Crypto</p>
                    }
                  </div>
                  <div onClick={() => dispatch(setClose('homeSend'))}>
                    <XIcon className='  h-8 w-8 cursor-pointer text-black dark:text-white' />
                  </div>
                </Dialog.Title>
                <div className='mt-2 '>

                  {/* <DropdownForSend Cryptos={balanceInfo}
                    defaultValue={cryptoToSend}
                    onClick={setCryptoToSend} /> */}
                  {/* 这个位置  cryptoToSend是home中的useState变量 用来发送 不用的话 该怎么办  */}

                  <p className=' text-gray-700 dark:text-white '>From</p>
                  <div className=' p-2 my-1 text-gray-700 flex space-x-2 items-center dark:border-blue-300 border border-gray-300 rounded-lg '>
                    <p className='flex flex-grow dark:text-white font-poppins'>5G16tBnZEmtnL6A5nxZJpJtUw</p>

                    <CopyToClipboard
                      text={'5G16tBnZEmtnL6A5nxZJpJtUw'}>
                      <div onClick={handleCopy}>
                        {showCheck
                          ? <CheckIcon className='text-green-600 dark:text-green-300 animate-ping ml-2 p-1 h-7 w-7 bg-gray-200 dark:bg-primary cursor-pointer rounded-full' />
                          : <DocumentDuplicateIcon className=' text-gray-500 dark:text-[#03F3FF] ml-2 p-1 h-7 w-7 bg-gray-200 dark:bg-primary cursor-pointer rounded-full' />}

                      </div>
                    </CopyToClipboard>
                  </div>

                  <div className='relative'>

                    <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins'>To</p>

                    <input className='font-poppins input input-bordered input-info w-full '
                      onChange={(e) => setAddressToSend(e.target.value)}
                      placeholder='Destination Address'
                      type='text'
                      value={addressToSend} />
                    <CameraIcon
                      className='absolute top-9 right-2 text-gray-600 ml-2 p-1 h-7 w-7 bg-gray-200 dark:bg-primary cursor-pointer rounded-full dark:text-[#03F3FF]'
                      onClick={() => dispatch(toggle('homeQRScanner'))} />

                  </div>

                  {status.homeQRScanner &&
                    <div>
                      <QrReader
                        className='absolute top-0 right-5 left-5 bottom-0 z-40'
                        constraints={{ facingMode: 'user' }}
                        onResult={(result, error) => {
                          if (result) {
                            // setAddressToSend(result?.text)
                            dispatch(setClose('homeQRScanner'));
                          }

                          if (error) {
                            console.info(error);
                          }
                        }}
                      />
                      <div className='absolute top-16 right-10 z-50 rounded-full p-2 bg-red-100'>
                        <XIcon className='h-5 w-5'
                          onClick={() => dispatch(setClose('homeQRScanner'))} />
                      </div>

                    </div>}

                  <div className='flex items-end'>
                    <div className='relative'>
                      <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins'>Amount</p>

                      <input

                        className='font-poppins pr-12 input input-bordered input-info w-full '
                        max='10000000'
                        min='0'
                        // onChange={(e) => {
                        //   setAmount(parseFloat(e.target.value));
                        //   setAmountToCurrency(
                        //     parseFloat((parseFloat(e.target.value) * cryptoToSend.price).toFixed(2)));
                        // }}
                        placeholder='0.0'
                        type='number'
                        value={amountToCurrency ? amount : null} />
                      {/* <p className=' absolute bottom-4 right-2 text-sm font-poppins'>{cryptoToSend.shortName}</p> */}
                    </div>

                    <p className='mx-1 pb-3'>=</p>
                    <div className='relative'>
                      <p className=' text-gray-700'></p>
                      <input
                        className='font-poppins pr-12  input input-bordered input-info w-full '
                        max='10000000'
                        min='0'
                        // onChange={(e) => {
                        //   setAmountToCurrency(parseFloat(e.target.value));
                        //   setAmount(
                        //     parseFloat((parseFloat(e.target.value) / cryptoToSend.price).toFixed(8)));
                        // }}
                        placeholder='0.0'
                        type='number'
                        value={amount ? amountToCurrency : null} />
                      <p className='absolute bottom-4 right-2 text-sm font-poppins'>USD</p>
                    </div>

                  </div>
                  {/* <p className='font-poppins text-gray-700 dark:text-white text-sm'>{cryptoToSend.name} price: {cryptoToSend.price}</p> */}

                  {/* <p className=' text-gray-700 dark:text-white py-1 pt-3 font-poppins'>Network Fee {' '} {cryptoToSend.networkFee}</p> */}

                  {/* <p className=' text-gray-700 dark:text-white text-sm font-poppins'>Estimated confirmation time {cryptoToSend.estimatedTime}</p> */}

                </div>

                <div className='mt-4'>

                  <button
                    className='font-poppins py-3 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
                    onClick={() => dispatch(setClose('homeSend'))}

                    type='button'
                  >
                    Send
                  </button>

                </div>
              </Dialog.Panel>
            </div>
          </Modal>

          {/* receive modal */}
          <Modal modalName='homeReceive'>
            <div className={theme}>
              <Dialog.Panel className='md:w-[600px] w-96 max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br from-gray-800 to-black p-6 text-left align-middle shadow-xl transition-all border border-[#00f6ff]'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 flex items-center mb-6'
                >

                  <DownloadIcon className=' text-gray-700 h-8 w-8 dark:text-[#03F3FF] ' />
                  {theme === 'dark' ? <p className=' text-gradient flex flex-grow font-poppins'>Receive Crypto</p> : <p className=' text-gray-700 flex flex-grow font-poppins'>Receive Crypto</p>}

                  <div onClick={() => dispatch(setClose('homeReceive'))}>
                    <XIcon className=' text-black h-8 w-8 cursor-pointer dark:text-white' />
                  </div>

                </Dialog.Title>
                <div className='mt-2 '>
                  {/* <DropdownForSend Cryptos={cryptoInfo}
                    defaultValue={cryptoToReceive}
                    onClick={setCryptoToReceive} /> */}

                  <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins'>Network</p>

                  {/* <DropdownForNetwork defaultValue={networkToReceive}
                    networks={networks}
                    onClick={setNetworkToReceive} /> */}

                  <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins'>Address</p>

                  <div className=' p-2 my-1 text-gray-700 flex space-x-2 items-center  border border-gray-300 rounded-lg dark:border-blue-300'>
                    <p className='flex flex-grow text-gray-700 dark:text-white mb-1 font-poppins'></p>

                    <CopyToClipboard
                      text={' '}>
                      <div onClick={handleCopy}>
                        {showCheck
                          ? <CheckIcon className='text-green-600 dark:text-green-300 animate-ping ml-2 p-1 h-7 w-7 bg-gray-200 dark:bg-primary cursor-pointer rounded-full' />
                          : <DocumentDuplicateIcon className=' text-gray-500 dark:text-[#03F3FF] ml-2 p-1 h-7 w-7 bg-gray-200 dark:bg-primary cursor-pointer rounded-full' />}

                      </div>
                    </CopyToClipboard>
                  </div>

                  <div className='relative h-64 w-64 mx-auto m-3 '>
                    <QRCode
                      size={256}
                      style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                      value={' '} />
                  </div>

                  <div className='flex space-x-5'>
                    <div>
                      <p className='dark:text-white text-gray-700 pt-3 font-poppins'>Expected arrival</p>
                      {/* <p className='dark:text-white text-gray-700 text-sm font-poppins'>{cryptoToReceive.arrival}</p> */}
                    </div>
                    <div>
                      <p className='dark:text-white text-gray-700 pt-3 font-poppins'>Minimum deposit</p>
                      {/* <p className='dark:text-white text-gray-700 text-sm font-poppins'>{cryptoToReceive.minDeposit}</p> */}
                    </div>
                  </div>
                  {/* <p className='dark:text-white text-gray-700 text-sm pt-3 font-poppins'>Send only {cryptoToReceive.name} to this deposit address.</p> */}
                  <p className='dark:text-white text-gray-700 text-sm font-poppins'>Ensure the network is {' '}
                    <span className='text-red-400'>{networkToReceive}</span>.</p>

                </div>

              </Dialog.Panel>
            </div>
          </Modal>

          {/* add network modal pink */}
          <Modal modalName='homeAddNetwork'>
            <div className={theme}>
              <Dialog.Panel className='md:w-[600px] w-96 max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br from-gray-800 to-black p-6 text-left align-middle shadow-xl transition-all border border-[#c67391]'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 flex items-center mb-6'
                >
                  <p className=' text-gray-700 dark:text-white flex flex-grow font-poppins'>Add Network</p>
                  <div onClick={() => dispatch(setClose('homeAddNetwork'))}>
                    <XIcon className=' text-black h-8 w-8 cursor-pointer dark:text-white' />
                  </div>
                </Dialog.Title>

                {/* <AddNetworkBox
                  closeAddNetworkModal={closeAddNetworkModal}
                  knownNetworks={knownNetworks}
                /> */}

              </Dialog.Panel>
            </div >
          </Modal>

          {/* add token modal pink */}
          <Modal modalName='homeAddToken'>
            <div className={theme}>
              <Dialog.Panel className='md:w-[600px] w-96 max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br from-gray-800 to-black p-6 text-left align-middle shadow-xl transition-all border border-[#c67391]'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 flex items-center mb-6'
                >
                  <p className=' text-gray-700 dark:text-white flex flex-grow font-poppins'>Add ERC20 Token</p>
                  <div onClick={() => dispatch(setClose('homeAddToken'))}>
                    <XIcon className=' text-black h-8 w-8 cursor-pointer dark:text-white' />
                  </div>
                </Dialog.Title>

                {/* <AddTokenBox
                  closeAddTokenModal={closeAddTokenModal}
                  knownNetworks={knownNetworks}
                /> */}

              </Dialog.Panel>
            </div >
          </Modal>

        </main >
        <Footer />

      </div >
    </div >
  );
}

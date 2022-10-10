// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog } from '@headlessui/react';
import { CameraIcon, CheckIcon, ChevronRightIcon, XIcon } from '@heroicons/react/outline';
import { DocumentDuplicateIcon, DownloadIcon, PaperAirplaneIcon } from '@heroicons/react/solid';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'react-qr-code';
import { QrReader } from 'react-qr-reader';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import Balance from '@choko-wallet/frontend/components/Balance';
import Footer from '@choko-wallet/frontend/components/Footer';
import NetworkSelection from '@choko-wallet/frontend/components/NetworkSelection';
import { fetchCoinPrice } from '@choko-wallet/frontend/features/slices/coinSlice';
import { knownNetworks } from '@choko-wallet/known-networks';

import DropdownForNetwork from '../../components/DropdownForNetwork';
import DropdownForSend from '../../components/DropdownForSend';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import { selectChangeCurrentAccountLoading } from '../../features/redux/selectors';
import { useAppThunkDispatch } from '../../features/redux/store';
import { loadUserAccount } from '../../features/slices/userSlice';

interface Crypto {
  name: string;
  img: string;
  price: number;
  shortName: string;
  networkFee: string;
  estimatedTime: string;
  arrival: string;
  MinDeposit: string;
}

const coinPriceData = { bitcoin: { usd: 19000 }, dogecoin: { usd: 0.0600 }, ethereum: { usd: 1000.00 } };

/* eslint-disable sort-keys */
function Home (): JSX.Element {
  const nodeRef = React.useRef(null);
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  // const dispatch = useDispatch();
  const dispatch = useAppThunkDispatch();
  // const coinPriceFromRedux = useSelector(selectCoinPrice);
  // const currentUserAccount = useSelector(selectCurrentUserAccount);
  // const reduxError = useSelector(selectError);
  const changeAccountLoading = useSelector(selectChangeCurrentAccountLoading);
  const [networkSelection, setNetworkSelection] = useState<string>('847e7b7fa160d85f');
  const [network, setNetwork] = useState<string>('847e7b7fa160d85f');
  const [mounted, setMounted] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);
  const [isNetworkChangeOpen, setIsNetworkChangeOpen] = useState<boolean>(false);
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const [isSendOpen, setIsSendOpen] = useState<boolean>(false);
  const [isReceiveOpen, setIsReceiveOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [amountToCurrency, setAmountToCurrency] = useState<number>(0);
  const [openScan, setOpenScan] = useState<boolean>(false);
  const [addressToSend, setAddressToSend] = useState<string>('');
  const [showCheck, setShowCheck] = useState<boolean>(false);
  const [addNetworkModalOpen, setAddNetworkModalOpen] = useState<boolean>(false);
  const [networkInput, setNetworkInput] = useState<string>('');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const [cryptoToSend, setCryptoToSend] = useState<Crypto>({ name: 'Bitcoin', img: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/btc.png', price: coinPriceData?.bitcoin.usd, shortName: 'BTC', networkFee: '0.00000123BTC', estimatedTime: '20min', arrival: '6 network confirmations', MinDeposit: '0.0000001BTC' });
  const [cryptoToReceive, setCryptoToReceive] = useState<Crypto>({ name: 'Bitcoin', img: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/btc.png', price: coinPriceData?.bitcoin.usd, shortName: 'BTC', networkFee: '0.00000123BTC', estimatedTime: '20min', arrival: '6 network confirmations', MinDeposit: '0.0000001BTC' });
  const [networkToReceive, setNetworkToReceive] = useState<string>('');
  const cryptoInfo = [
    { name: 'Bitcoin', img: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/btc.png', price: coinPriceData?.bitcoin.usd, shortName: 'BTC', networkFee: '0.00000123BTC', estimatedTime: '20min', arrival: '6 network confirmations', MinDeposit: '0.0000001BTC' },
    { name: 'Ethereum', img: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png', price: coinPriceData?.ethereum.usd, shortName: 'ETH', networkFee: '0.00000123ETH', estimatedTime: '5min', arrival: '6 network confirmations', MinDeposit: '0.0000001ETH' },
    { name: 'Dogecoin', img: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/doge.png', price: coinPriceData?.dogecoin.usd, shortName: 'DOGE', networkFee: '1.00DOGE', estimatedTime: '1min', arrival: '6 network confirmations', MinDeposit: '0.0000001DOGE' }
  ];

  const currentAccount = '';
  const networks = ['Ethereum (ERC20)', 'BNB Smart Chain (BEP20)', 'Tron (TRC20)'];

  useEffect(() => { // for changing network or account
    const getBalance = async () => {
      const provider = new WsProvider(knownNetworks[network].defaultProvider);
      const api = await ApiPromise.create({
        provider: provider
      });

      const data = await api.query.system.account(currentAccount);
      // console.error(data['data'].toHuman()['free']);

      const tokenDecimals = {
        '847e7b7fa160d85f': 12,
        '0018a49f151bcb20': 12,
        e658ad422326d7f7: 10
      };

      /* eslint-disable */
      // @ts-ignore
      setBalance(Number(data.data.toHuman().free.replaceAll(',', '')) / (10 ** tokenDecimals[network]));
      /* eslint-enable */
      console.log('balance', balance);
      // const chainInfo = await api.registry.getChainProperties()
      // return ( data.createdAtHash.free )
    };

    void getBalance();

    void dispatch(fetchCoinPrice({ coinArray: ['bitcoin', 'ethereum', 'dogecoin'], currency: 'usd' }));
  }, [network, currentAccount, balance, dispatch]);

  // console.log('coinPriceFromRedux', coinPriceFromRedux)

  useEffect(() => { // for intialization
    if (!localStorage.getItem('serialziedUserAccount')) {
      void router.push('/account');
    } else {
      setMounted(true);

      if (theme !== 'dark' && theme !== 'light') {
        setTheme('light');
      }

      dispatch(loadUserAccount());
    }

    console.log('intialization');
  }, [dispatch, router, setTheme, theme]);

  if (!mounted || !localStorage.getItem('serialziedUserAccount')) { return null; }

  if (isLoadingOpen) return <Loading title='Changing Network' />;
  if (changeAccountLoading) return <Loading title='Changing Account' />;

  const changeNetwork = async () => {
    dispatch(fetchCoinPrice({ coinArray: ['bitcoin', 'ethereum', 'dogecoin'], currency: 'usd' }))
      .unwrap()
      .then((result) => {
        console.log('result', result);// 直接给回组件 没传给redux 也可以给redux保存
      }).catch((rejectedValueOrSerializedError) => {
        console.log('redux-rejectedValueOrSerializedError', rejectedValueOrSerializedError);
      });

    setIsLoadingOpen(true);
    setNetwork(networkSelection);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsLoadingOpen(false);
        setIsNetworkChangeOpen(true);

        resolve();
      }, 3000);
    });
  };

  function closeNetworkChangeModal () {
    setIsNetworkChangeOpen(false);
  }

  function closeSendModal () {
    setIsSendOpen(false);
  }

  function closeReceiveModal () {
    setIsReceiveOpen(false);
  }

  function closeAddNetworkModal () {
    setAddNetworkModalOpen(false);
    setNetworkInput('');
  }

  const handleCopy = () => {
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  };

  return (
    <div className={theme}>

      <div className='relative bg-gradient-to-br from-[#DEE8F1] to-[#E4DEE8] dark:from-[#22262f] dark:to-[#22262f] min-h-screen'>
        {/* <Toaster /> */}
        <Header />

        {/* drawer */}
        <CSSTransition
          className='md:hidden z-40 p-6 w-[300px] bg-[#DEE8F1] dark:bg-[#22262f] absolute top-0 bottom-0'
          classNames='drawer'
          in={drawerOpen}
          nodeRef={nodeRef}
          timeout={500}
          unmountOnExit
        >
          <div ref={nodeRef}>
            <p className='text-lg flex  w-full font-semibold justify-between text-black dark:text-white font-poppins  '>Change Network
              <XIcon className=' text-black dark:text-white h-8 w-8 cursor-pointer '
                onClick={() => setDrawerOpen(!drawerOpen)} />
            </p>

            <div className='flex md:flex-col items-center md:h-full bg-transparent' >

              <NetworkSelection
                changeNetwork={changeNetwork}
                network={network}
                networkSelection={networkSelection}
                setAddNetworkModalOpen={setAddNetworkModalOpen}
                setNetworkSelection={setNetworkSelection} />

            </div>
          </div>
        </CSSTransition>

        < main className='min-h-[750px] h-85v bg-transparent dark:bg-[#22262f] max-w-7xl mx-auto' >
          <div className='bg-transparent flex-col md:h-full  flex md:flex-row m-3 md:m-10'>
            <div className='bg-transparent'>
              <button
                className='md:hidden mb-2 w-[158px] h-[40px] flex items-center justify-center active:scale-95 transition duration-150 ease-out py-1   bg-[#4797B5] rounded-[8px] outline-none '
                onClick={() => setDrawerOpen(!drawerOpen)}
              >
                <p className='ml-1  text-white text-md font-semibold font-poppins'>NETWORK</p>
                <ChevronRightIcon className=' text-white h-6 w-6 ml-6  ' />
              </button>
              <p className='ml-1 hidden md:block text-gray-800 dark:text-white text-md font-semibold font-poppins'>NETWORK</p>

              {/* wideScreen network */}
              <div className=' hidden md:inline-flex md:flex-col bg-transparent dark:bg-[#22262f] items-center md:h-full mr-10' >
                <NetworkSelection
                  changeNetwork={changeNetwork}
                  network={network}
                  networkSelection={networkSelection}
                  setAddNetworkModalOpen={setAddNetworkModalOpen}
                  setNetworkSelection={setNetworkSelection} />
              </div>
            </div>

            <Balance
              cryptoInfo={cryptoInfo}
              currentNetworkName={knownNetworks[network].text}
              setIsReceiveOpen={setIsReceiveOpen}
              setIsSendOpen={setIsSendOpen} />

          </div>

          {/* network change modal */}
          <Modal closeModal={closeNetworkChangeModal}
            isOpen={isNetworkChangeOpen} >
            <div className={theme}>
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br from-gray-900 to-black p-6 text-left align-middle shadow-xl transition-all border  border-[#00f6ff] dark:border-[#00f6ff]'>
                <Dialog.Title
                  as='h3'
                  className='font-poppins text-lg font-medium leading-6 text-black dark:text-white w-72'
                >
                  Changed successfully
                </Dialog.Title>
                <div className='mt-2'>
                  <p className='text-sm font-poppins text-gray-500 dark:text-white'>
                    {`Network changed to ${knownNetworks[networkSelection].text}`}
                  </p>
                </div>

                <div className='mt-4'>
                  <button
                    className='font-poppins py-3 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
                    onClick={closeNetworkChangeModal}
                    type='button'
                  >
                    OK
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Modal>

          {/* send modal */}
          <Modal closeModal={closeSendModal}
            isOpen={isSendOpen}>
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
                  <div onClick={closeSendModal}>
                    <XIcon className='  h-8 w-8 cursor-pointer text-black dark:text-white' />
                  </div>
                </Dialog.Title>
                <div className='mt-2 '>

                  <DropdownForSend Cryptos={cryptoInfo}
                    defaultValue={cryptoToSend}
                    onClick={setCryptoToSend} />

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
                      onClick={() => setOpenScan(!openScan)} />

                  </div>

                  {openScan &&
                    <div>
                      <QrReader
                        className='absolute top-0 right-5 left-5 bottom-0 z-40'
                        constraints={{ facingMode: 'user' }}
                        onResult={(result, error) => {
                          if (result) {
                            // setAddressToSend(result?.text);//这个位置官方写法还报错 不行就换插件
                            setOpenScan(false);
                          }

                          if (error) {
                            console.info(error);
                          }
                        }}
                      />
                      <div className='absolute top-16 right-10 z-50 rounded-full p-2 bg-red-100'>
                        <XIcon className='h-5 w-5'
                          onClick={() => setOpenScan(false)} />
                      </div>

                    </div>}

                  <div className='flex items-end'>
                    <div className='relative'>
                      <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins'>Amount</p>

                      <input

                        className='font-poppins pr-12 input input-bordered input-info w-full '
                        max='10000000'
                        min='0'
                        onChange={(e) => {
                          setAmount(parseFloat(e.target.value));
                          setAmountToCurrency(
                            parseFloat((parseFloat(e.target.value) * cryptoToSend.price).toFixed(2)));
                        }}
                        placeholder='0.0'
                        type='number'
                        value={amountToCurrency ? amount : null} />
                      <p className=' absolute bottom-4 right-2 text-sm font-poppins'>{cryptoToSend.shortName}</p>
                    </div>

                    <p className='mx-1 pb-3'>=</p>
                    <div className='relative'>
                      <p className=' text-gray-700'></p>
                      <input
                        className='font-poppins pr-12  input input-bordered input-info w-full '
                        max='10000000'
                        min='0'
                        onChange={(e) => {
                          setAmountToCurrency(parseFloat(e.target.value));
                          setAmount(
                            parseFloat((parseFloat(e.target.value) / cryptoToSend.price).toFixed(8)));
                        }}
                        placeholder='0.0'
                        type='number'
                        value={amount ? amountToCurrency : null} />
                      <p className='absolute bottom-4 right-2 text-sm font-poppins'>USD</p>
                    </div>

                  </div>
                  <p className='font-poppins text-gray-700 dark:text-white text-sm'>{cryptoToSend.name} price: {cryptoToSend.price}</p>

                  <p className=' text-gray-700 dark:text-white py-1 pt-3 font-poppins'>Network Fee {' '} {cryptoToSend.networkFee}</p>

                  <p className=' text-gray-700 dark:text-white text-sm font-poppins'>Estimated confirmation time {cryptoToSend.estimatedTime}</p>

                </div>

                <div className='mt-4'>

                  <button
                    className='font-poppins py-3 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
                    onClick={closeSendModal}

                    type='button'
                  >
                    Send
                  </button>

                </div>
              </Dialog.Panel>
            </div>
          </Modal>

          {/* receive modal */}
          <Modal closeModal={closeReceiveModal}
            isOpen={isReceiveOpen}>
            <div className={theme}>

              <Dialog.Panel className='md:w-[600px] w-96 max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br from-gray-800 to-black p-6 text-left align-middle shadow-xl transition-all border border-[#00f6ff]'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 flex items-center mb-6'
                >

                  <DownloadIcon className=' text-gray-700 h-8 w-8 dark:text-[#03F3FF] ' />
                  {theme === 'dark' ? <p className=' text-gradient flex flex-grow font-poppins'>Receive Crypto</p> : <p className=' text-gray-700 flex flex-grow font-poppins'>Receive Crypto</p>}

                  <div onClick={closeReceiveModal}>
                    <XIcon className=' text-black h-8 w-8 cursor-pointer dark:text-white' />
                  </div>

                </Dialog.Title>
                <div className='mt-2 '>
                  <DropdownForSend Cryptos={cryptoInfo}
                    defaultValue={cryptoToReceive}
                    onClick={setCryptoToReceive} />

                  <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins'>Network</p>

                  <DropdownForNetwork defaultValue={networkToReceive}
                    networks={networks}
                    onClick={setNetworkToReceive} />

                  <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins'>Address</p>

                  <div className=' p-2 my-1 text-gray-700 flex space-x-2 items-center  border border-gray-300 rounded-lg dark:border-blue-300'>
                    <p className='flex flex-grow text-gray-700 dark:text-white mb-1 font-poppins'>5G16tBnZEmtnL6A5nxZJpJtUw</p>

                    <CopyToClipboard
                      text={'5G16tBnZEmtnL6A5nxZJpJtUw'}>
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
                      value={'5G16tBnZEmtnL6A5nxZJpJtUw'} />
                  </div>

                  <div className='flex space-x-5'>
                    <div>
                      <p className='dark:text-white text-gray-700 pt-3 font-poppins'>Expected arrival</p>
                      <p className='dark:text-white text-gray-700 text-sm font-poppins'>{cryptoToReceive.arrival}</p>
                    </div>
                    <div>
                      <p className='dark:text-white text-gray-700 pt-3 font-poppins'>Minimum deposit</p>
                      <p className='dark:text-white text-gray-700 text-sm font-poppins'>{cryptoToReceive.MinDeposit}</p>
                    </div>
                  </div>
                  <p className='dark:text-white text-gray-700 text-sm pt-3 font-poppins'>Send only {cryptoToReceive.name} to this deposit address.</p>
                  <p className='dark:text-white text-gray-700 text-sm font-poppins'>Ensure the network is {' '}
                    <span className='text-red-400'>{networkToReceive}</span>.</p>

                </div>

              </Dialog.Panel>
            </div>
          </Modal>

          {/* add network modal pink */}
          <Modal closeModal={closeAddNetworkModal}
            isOpen={addNetworkModalOpen} >
            <div className={theme}>
              <Dialog.Panel className='md:w-[600px] w-96 max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br from-gray-800 to-black p-6 text-left align-middle shadow-xl transition-all border border-[#c67391]'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 flex items-center mb-6'
                >
                  <p className=' text-gray-700 dark:text-white flex flex-grow font-poppins'>Add Network</p>

                  <div onClick={closeAddNetworkModal}>
                    <XIcon className=' text-black h-8 w-8 cursor-pointer dark:text-white' />
                  </div>

                </Dialog.Title>

                <div className='mt-2'>
                  <p className=' text-gray-700 dark:text-white mt-3 mb-1'>Network Name</p>
                  <input className=' input border border-[#c67391] w-full  '
                    onChange={(e) => setNetworkInput(e.target.value)}
                    placeholder='Polkadot'
                    type='text'
                    value={networkInput} />

                  <p className=' text-gray-700 dark:text-white mt-3 mb-1'>Network Info</p>
                  <input className=' input border border-[#c67391] w-full '
                    onChange={(e) => setNetworkInput(e.target.value)}
                    placeholder='polkadot'
                    type='text'
                    value={networkInput} />

                  <p className=' text-gray-700 dark:text-white mt-3 mb-1'>Network RPC</p>
                  <input className=' input border border-[#c67391] w-full '
                    onChange={(e) => setNetworkInput(e.target.value)}
                    placeholder='wss://polkadot.parity.io/ws'
                    type='text'
                    value={networkInput} />

                </div>

                <div className='mt-4'>
                  <button
                    className='py-3 px-6 font-medium text-[18px] text-primary bg-[#c67391] rounded-[10px] outline-none '
                    onClick={closeAddNetworkModal}
                    type='button'
                  >
                    OK
                  </button>
                </div>
              </Dialog.Panel>
            </div >

          </Modal>

        </main >
        <Footer />

      </div >
    </div >
  );
}

export default Home;

// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NextPage, NextPageContext } from 'next';
import { useSession } from 'next-auth/react';

import Head from 'next/head';
import React, { useEffect } from 'react';

import ContactMe from '../components/landingComponents/ContactMe';
import Header from '../components/landingComponents/Header';
import Hero from '../components/landingComponents/Hero';
import NFT from '../components/landingComponents/NFT';

import { runKeygenRequest } from '@choko-wallet/app-utils/mpc';
import { loadUserAccount, noteMpcUserAccount, selectLoading, selectUserAccount, startLoading, useDispatch, useSelector } from '@choko-wallet/app-redux';
import { useRouter } from 'next/router';
import Loading from '../components/Loading';

interface Props {
  token: string
}

const generateAccount = async() => {
  // 1. submit token for validation on auth service

  // 2. get an auth header and proceed with sending requests
  let key
  try {
    key = await runKeygenRequest(true)
  } catch(e) {
    console.log(e)
  }

  return key;
}

const Home: NextPage<Props> = ({ token }: Props) => {
  const { data: session } = useSession();

  const dispatch = useDispatch();
  const router = useRouter();

  const loadingText = useSelector(selectLoading);
  const accounts = useSelector(selectUserAccount)

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      // we have accounts locally
      // router.push("/home");
    } else if( session ) {
      // we don't have any account but the user is signed in with session
      // gotta generate an mpc account for user
      if (!localStorage.getItem("mpcKey"))  {
        (async () => {
          dispatch(startLoading("Generating an MPC Account ... "));
  
          const key = await generateAccount();
          dispatch(noteMpcUserAccount(key))
  
          router.push("/home")
        })()
      }
    } else {
      // there is non session nor user - NOP
    }
  }, [accounts, session])

  useEffect(() => {
    dispatch(loadUserAccount())
  }, [])

  if (loadingText) return <Loading />;

  return (
    <div className='bg-[#242424] text-white h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll z-0 '>
      <Head>
        <title>CHOKO WALLET</title>
      </Head>

      <Header />
      <Hero />
      <NFT />
      <ContactMe />
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const userCookie = context.req.headers.cookie;
  const sessionToken = userCookie
    .split(';')
    .filter(c => c.indexOf("next-auth.session-token") !== -1);

  if (sessionToken.length > 0) {
    // expect the token to have content!
    const token = sessionToken[0].split("=")[1];

    return {
      props: { token }
    }
  } else {
    return { props: {token: null} }
  }


}
export default Home;

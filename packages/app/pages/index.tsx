// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NextPage, NextPageContext } from 'next';
import { signOut, useSession } from 'next-auth/react';

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
import { validateOAuthProofOfOwnership, linkUsage } from '@choko-wallet/auth-client';
import { secureGenerateRandomKey } from '@skyekiwi/crypto';

interface Props {
  token: string
}

const generateAccount = async(provider: string, email: string, token: string) => {
  // 1. submit token for validation on auth service
  const ownershipProof = await validateOAuthProofOfOwnership(provider, email, token);
  const keygenId = secureGenerateRandomKey();
  const usageCertificate = await linkUsage(keygenId, ownershipProof);

  // 2. get an auth header and proceed with sending requests
  const key = await runKeygenRequest(keygenId, usageCertificate)

  if (key.indexOf("Node Returns Error") !== -1) {
    throw new Error(key)
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
      router.push("/home");
    } else if( session ) {

      console.log("gen account", localStorage.getItem("mpcKey"))
      // we don't have any account but the user is signed in with session
      // gotta generate an mpc account for user
      if (!localStorage.getItem("mpcKey"))  {
        (async () => {
          dispatch(startLoading("Generating an MPC Account ... "));
  
          try {
            const key = await generateAccount(
              session.user.provider,
              session.user.email,
              token
            );
            dispatch(noteMpcUserAccount(key))
            router.push("/home")
          } catch(e) {
            alert(e)
            signOut()
            console.error(e);
          }  
        })()
      }
    } else {
      // there is non session nor user - NOP
    }
  }, [accounts, session, generateAccount, router])

  useEffect(() => {
    try {
      dispatch(loadUserAccount())
    } catch(e) {
      // nop
    }
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

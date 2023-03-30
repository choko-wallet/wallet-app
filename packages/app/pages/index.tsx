// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NextPage, NextPageContext } from "next";

import { secureGenerateRandomKey } from "@skyekiwi/crypto";
import Head from "next/head";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import {
  loadUserAccount,
  noteMpcUserAccount,
  selectLoading,
  selectUserAccount,
  setOpen,
  startLoading,
  useDispatch,
  useSelector,
} from "@choko-wallet/app-redux";
import {
  certificateToAuthHeader,
  runKeygenRequest,
  runKeyRefreshRequest,
} from "@choko-wallet/app-utils/mpc";
import {
  preimageOAuthProofOfOwnership,
  validateOAuthProofOfOwnership,
} from "@choko-wallet/auth-client";

import ContactMe from "../components/landingComponents/ContactMe";
import Header from "../components/landingComponents/Header";
import Hero from "../components/landingComponents/Hero";
import NFT from "../components/landingComponents/NFT";
import Loading from "../components/Loading";
import { Session } from "next-auth";
import Curation from "../components/landingComponents/Curation";

interface Props {
  token: string;
}

const generateOrRefreshAccount = async (
  primaryProvider: string,
  primaryEmail: string,
  primaryToken: string,
  secondaryProvider: string,
  secondaryEmail: string,
  secondaryToken: string
): Promise<string> => {
  // 0. we always try to fetch both cert & other setups
  const primaryCert = await validateOAuthProofOfOwnership(
    primaryProvider,
    primaryEmail,
    primaryToken,
    "http://localhost:8080"
  );
  const secondaryCert = await validateOAuthProofOfOwnership(
    secondaryProvider,
    secondaryEmail,
    secondaryToken,
    "http://localhost:8080"
  );

  const authHeader = certificateToAuthHeader(primaryCert, secondaryCert);
  const jobId = secureGenerateRandomKey();

  // 1. try to see if we have an account or not
  if (
    await preimageOAuthProofOfOwnership(
      primaryProvider,
      primaryEmail,
      "http://localhost:8080"
    )
  ) {
    // the user already exists
    // we do a key refresh and disable the old key
    const key = await runKeyRefreshRequest(jobId, authHeader);
    if (key.indexOf("Node Returns Error") !== -1) {
      throw new Error(key);
    }

    return key;
  } else {
    // new account - we do a key generation
    const key = await runKeygenRequest(jobId, authHeader);
    if (key.indexOf("Node Returns Error") !== -1) {
      throw new Error(key);
    }

    return key;
  }
};

const primaryProviders = ["google"];
const secondaryProviders = [
  "github",
  "twitter",
  "facebook",
  "discord",
  "apple",
];

const Home: NextPage<Props> = ({ token }: Props) => {
  const { data: session } = useSession();

  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useDispatch();

  const router = useRouter();
  const loadingText = useSelector(selectLoading);
  const accounts = useSelector(selectUserAccount);

  useEffect(() => {
    if (
      session &&
      session.user &&
      primaryProviders.includes(session.user.provider)
    ) {
      // step 2
      // dump session into localStorage
      localStorage.setItem("primarySession", JSON.stringify(session));
      localStorage.setItem("primaryToken", token);

      // init secondary auth
      setCurrentStep(2);
      dispatch(setOpen("landingLogin2"));

      return;
    }

    if (
      localStorage.getItem("primarySession") &&
      localStorage.getItem("primaryToken") &&
      session &&
      session.user &&
      secondaryProviders.includes(session.user.provider)
    ) {
      // step 3
      setCurrentStep(3);
      dispatch(setOpen("landingLogin3"));

      return;
    }
  }, [session]);

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      // we have accounts locally
      // router.push('/home').catch(console.error);
    }
    // else if (session) {
    //   // we don't have any account but the user is signed in with session
    //   // gotta generate an mpc account for user
    //   if (!localStorage.getItem('mpcKey')) {
    //     (async () => {
    //       dispatch(startLoading('Generating an MPC Account ... '));

    //       try {
    //         const key = await generateAccount(
    //           session.user.provider,
    //           session.user.email,
    //           token
    //         );

    //         dispatch(noteMpcUserAccount(key));
    //         router.push('/home').catch(console.error);
    //       } catch (e) {
    //         signOut().catch(console.error);
    //         console.error(e);
    //       }
    //     })().catch(console.error);
    //   }
    // } else {
    //   // there is non session nor user - NOP
    // }
  }, [accounts, session, router, dispatch, token]);

  const enterChoko = async () => {
    dispatch(startLoading("Setting up an MPC Account ... "));

    const primarySession: Session = JSON.parse(
      localStorage.getItem("primarySession")
    );
    const primaryToken = localStorage.getItem("primaryToken");

    const secondarySession = session;
    const secondaryToken = token;

    try {
      const key = await generateOrRefreshAccount(
        primarySession.user.provider,
        primarySession.user.email,
        primaryToken,
        secondarySession.user.provider,
        secondarySession.user.email,
        secondaryToken
      );

      dispatch(noteMpcUserAccount([key, new Uint8Array(32)]));
      router.push("/home").catch(console.error);
    } catch (e) {
      // signOut().catch(console.error);
      console.error("HERE", e);
    }
  };
  useEffect(() => {
    try {
      dispatch(loadUserAccount());
    } catch (e) {
      // nop
    }
  }, [dispatch]);

  if (loadingText) return <Loading />;

  return (
    <div className='bg-[#050816] text-white h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll z-0 '>
      <Head>
        <title>CHOKO WALLET</title>
      </Head>

      <Header />

      <Hero currentStep={currentStep} enterChoko={enterChoko} />
      <NFT />
      <Curation />
      <ContactMe />
    </div>
  );
};

export function getServerSideProps(context: NextPageContext) {
  const userCookie = context.req.headers.cookie;

  try {
    const sessionToken = userCookie
      .split(";")
      .filter((c) => c.indexOf("next-auth.session-token") !== -1);

    if (sessionToken.length > 0) {
      // expect the token to have content!
      const token = sessionToken[0].split("=")[1];

      return {
        props: { token },
      };
    } else {
      return { props: { token: null } };
    }
  } catch (e) {
    return { props: { token: null } };
  }
}

export default Home;

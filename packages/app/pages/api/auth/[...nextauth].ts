// Copyright 2021-2022 @choko-wallet/app authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* tslint:disable */
/* eslint-disable */

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID!,
      clientSecret: process.env.TWITTER_SECRET!,
      // version: "2.0",
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID!,
      clientSecret: process.env.DISCORD_SECRET!,
      // version: "2.0",
    }),
  ],
  callbacks: {
    // @ts-ignore
    session({ session, token, user }) {
      session.user.provider = token.provider;
      return session;
    },

    // @ts-ignore
    jwt({ token, user, account }) {
      if (user && account && account.provider) {
        token = {
          ...token,
          provider: account.provider,
        };
      }
      return token;
    },
  },
};

// @ts-ignore
export default NextAuth(authOptions);

// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { RootState } from '../redux/store';

import { KnownNetworks, UserAccount } from '@choko-wallet/core';

/* eslint-disable */
// userAccount selectors
export const selectCurrentUserAccount = (state: RootState): UserAccount => state.user.currentUserAccount;
export const selectUserAccount = (state: RootState): UserAccount[] => state.user.userAccount;
export const selectCurrentUserAccountIndex = (state: RootState): number => state.user.currentUserAccountIndex;

export const selectCurrentNetwork = (state: RootState): string => state.network.currentNetwork;
export const selectKnownNetworks = (state: RootState): KnownNetworks => state.network.knownNetworks;

export const selectStatus = (state: RootState): Record<string, boolean> => state.status.status;
export const selectLoading = (state: RootState): string => state.status.loading;
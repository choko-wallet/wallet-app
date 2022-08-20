// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { RootState } from '../redux/store';

import { UserAccount } from '@choko-wallet/core';

/* eslint-disable */
// userAccount selectors
export const selectSeeds = (state: RootState): string => state.user.seeds;
export const selectUserAccount = (state: RootState): {[key: string]: UserAccount} => state.user.userAccount;
export const selectError = (state: RootState): boolean => state.user.error;
/* eslint-enable */

// Copyright 2021-2022 @choko-wallet/redux-module authors & contributors
// SPDX-License-Identifier: Apache-2.0


import { useAppDispatch, useAppSelector } from './redux/hooks';
import { rootReducer } from './redux/reducers';
import { selectCurrentUserAccount, selectUserAccount, selectCurrentUserAccountIndex, selectCurrentNetwork, selectKnownNetworks, selectStatus, selectLoading } from './redux/selectors';
import { store, useAppThunkDispatch } from './redux/store';
import { RootState, AppDispatch, AppState, ThunkAppDispatch } from './redux/store';
import { networkSlice, addNetworkAndSave, loadAllNetworks, removeNetworkAndSave, setCurrentNetwork } from './slices/network';
import { statusSlice, endLoading, setClose, setOpen, startLoading, toggle } from './slices/status';
import { addUserAccount, userSlice, decryptCurrentUserAccount, loadUserAccount, lockCurrentUserAccount, noteAAWalletAddress, removeAllAccounts, switchUserAccount } from './slices/user';



export type { RootState, AppDispatch, AppState, ThunkAppDispatch };

export { useAppDispatch, useAppSelector, rootReducer, selectCurrentUserAccount, selectUserAccount, selectCurrentUserAccountIndex, selectCurrentNetwork, selectKnownNetworks, selectStatus, selectLoading, store, useAppThunkDispatch, networkSlice, addNetworkAndSave, loadAllNetworks, removeNetworkAndSave, setCurrentNetwork, statusSlice, endLoading, setClose, setOpen, startLoading, toggle, addUserAccount, userSlice, decryptCurrentUserAccount, loadUserAccount, lockCurrentUserAccount, noteAAWalletAddress, removeAllAccounts, switchUserAccount };
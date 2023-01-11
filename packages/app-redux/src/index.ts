// Copyright 2021-2022 @choko-wallet/app-redux authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Provider, useDispatch, useSelector } from 'react-redux';

import { useAppDispatch, useAppSelector } from './redux/hooks';
import { rootReducer } from './redux/reducers';
import { selectCurrentNetwork, selectCurrentUserAccount, selectCurrentUserAccountIndex, selectKnownNetworks, selectLoading, selectStatus, selectUserAccount } from './redux/selectors';
import { AppDispatch, AppState, RootState, store, ThunkAppDispatch, useAppThunkDispatch } from './redux/store';
import { addNetworkAndSave, loadAllNetworks, networkSlice, removeNetworkAndSave, setCurrentNetwork } from './slices/network';
import { endLoading, setClose, setOpen, startLoading, statusSlice, toggle } from './slices/status';
import { addUserAccount, decryptCurrentUserAccount, loadUserAccount, lockCurrentUserAccount, noteAAWalletAddress, removeAllAccounts, switchUserAccount, userSlice } from './slices/user';

export type { RootState, AppDispatch, AppState, ThunkAppDispatch };

export { useAppDispatch, useAppSelector, rootReducer, selectCurrentUserAccount, selectUserAccount, selectCurrentUserAccountIndex, selectCurrentNetwork, selectKnownNetworks, selectStatus, selectLoading, store, useAppThunkDispatch, networkSlice, addNetworkAndSave, loadAllNetworks, removeNetworkAndSave, setCurrentNetwork, statusSlice, endLoading, setClose, setOpen, startLoading, toggle, addUserAccount, userSlice, decryptCurrentUserAccount, loadUserAccount, lockCurrentUserAccount, noteAAWalletAddress, removeAllAccounts, switchUserAccount, useDispatch, useSelector, Provider };

// Copyright 2021-2022 @choko-wallet/app-redux authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AppDispatch, AppState } from './store';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = () => useDispatch<AppDispatch>();// lint error
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

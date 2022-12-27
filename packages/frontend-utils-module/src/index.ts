// Copyright 2021-2022 @choko-wallet/frontend-utils-module authors & contributors
// SPDX-License-Identifier: Apache-2.0


import { fetchAAWalletAddress, encodeAddr } from './aaUtils';
import { getAlchemy, deploymentEnv, walletUrl } from './env';
import { fetchNativeAssetBalanceAndPrice, fetchTokenBalance, ethFetchBalance } from './ethFetchBalance';
import { encodeEthNativeTransaction, encodeEthERC20TokenTransaction, ethEncodeTxToUrl } from './ethSendTx';
import { getPolkadotTokenBalance, polkadotFetchBalance } from './polkadotFetchBalance';
import { polkadotEncodeTxToUrl } from './polkadotSendTx';
import { toastSuccess, toastFail } from './toast';
import { BalanceInfo, CryptoBalance, CoingeckoAPIResponse, FormAPIResponse } from './types';
import { staggerContainer, textContainer, textVariant, textVariant2, fadeIn, planetVariants } from './motion';




export type { BalanceInfo, CryptoBalance, CoingeckoAPIResponse, FormAPIResponse };

export { fetchAAWalletAddress, encodeAddr, getAlchemy, deploymentEnv, walletUrl, fetchNativeAssetBalanceAndPrice, fetchTokenBalance, ethFetchBalance, encodeEthNativeTransaction, encodeEthERC20TokenTransaction, ethEncodeTxToUrl, getPolkadotTokenBalance, polkadotFetchBalance, polkadotEncodeTxToUrl };

export { toastSuccess, toastFail };

export { staggerContainer, textContainer, textVariant, textVariant2, fadeIn, planetVariants };

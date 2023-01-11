// Copyright 2021-2022 @choko-wallet/app-utils authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { encodeAddr, fetchAAWalletAddress } from './aaUtils';
import { deploymentEnv, getAlchemy, walletUrl } from './env';
import { ethFetchBalance, fetchNativeAssetBalanceAndPrice, fetchTokenBalance } from './ethFetchBalance';
import { encodeEthERC20TokenTransaction, encodeEthNativeTransaction, ethEncodeTxToUrl } from './ethSendTx';
import { fadeIn, planetVariants, staggerContainer, textContainer, textVariant, textVariant2 } from './motion';
import { getPolkadotTokenBalance, polkadotFetchBalance } from './polkadotFetchBalance';
import { polkadotEncodeTxToUrl } from './polkadotSendTx';
import { toastFail, toastSuccess } from './toast';
import { BalanceInfo, CoingeckoAPIResponse, CryptoBalance, FormAPIResponse } from './types';

export type { BalanceInfo, CryptoBalance, CoingeckoAPIResponse, FormAPIResponse };

export { fetchAAWalletAddress, encodeAddr, getAlchemy, deploymentEnv, walletUrl, fetchNativeAssetBalanceAndPrice, fetchTokenBalance, ethFetchBalance, encodeEthNativeTransaction, encodeEthERC20TokenTransaction, ethEncodeTxToUrl, getPolkadotTokenBalance, polkadotFetchBalance, polkadotEncodeTxToUrl };

export { toastSuccess, toastFail };

export { staggerContainer, textContainer, textVariant, textVariant2, fadeIn, planetVariants };

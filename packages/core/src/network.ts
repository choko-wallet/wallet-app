// Copyright 2021-2022 @choko-wallet/core authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Color, Image } from './types';

// Network Types
class Network {
  providers: Record<string, string>;

  homepage?: string;
  isChild?: boolean;
  isDevelopment?: boolean;
  isDisabled?: boolean;
  isUnreachable?: boolean;
  info?: string;
  paraId?: number;
  summary?: string;
  text: string;
  color?: Color;
  logo?: Image;
}

export { Network };

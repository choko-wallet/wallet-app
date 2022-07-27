// Copyright 2021-2022 @choko-wallet/core authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { mnemonicToMiniSecret } from '@polkadot/util-crypto';
import { UserAccount } from '.';

const SEED = "leg satisfy enlist dizzy rib owner security live solution panther monitor replace";

describe('UserAccount - @choko-wallet/core/account', function () {

  const privateKey = mnemonicToMiniSecret(SEED);
  
  it('UserAccount - constructor, init, lock/unlock', async () => {
    const userAccount = new UserAccount({
      keyType: 'sr25519',// sr25519
      localKeyEncryptionStrategy: 0, // password-v0
      hasEncryptedPrivateKeyExported: false,
    });

    try {
      await userAccount.init()
    } catch(e) {
      expect(e).toEqual(new Error('account is locked - UserAccount.init'));
    }

    userAccount.unlock(privateKey);
    await userAccount.init();

    expect(userAccount.isLocked).toEqual(false);
    expect(userAccount.address).toEqual('5Deo86WWHTk26vXXywvocQXu3uE6dLcdj22ZF1jBNYhP2UJn');

    userAccount.lock();
    expect(userAccount.isLocked).toEqual(true);
    expect(userAccount.privateKey).toBeUndefined();
  });
  
  it('UserAccount - from seed', async () => {
    const userAccount = UserAccount.seedToUserAccount(SEED, {
      keyType: 'sr25519',// sr25519
      localKeyEncryptionStrategy: 0, // password-v0
      hasEncryptedPrivateKeyExported: false,
    });

    expect(userAccount.isLocked).toEqual(false);
    expect(userAccount.address).toBeUndefined();
    expect(userAccount.privateKey).toEqual(privateKey);

    await userAccount.init();

    expect(userAccount.address).toEqual('5Deo86WWHTk26vXXywvocQXu3uE6dLcdj22ZF1jBNYhP2UJn');
  });
});
  
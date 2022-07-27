// Copyright 2021-2022 @choko-wallet/core authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { mnemonicToMiniSecret } from '@polkadot/util-crypto';

import { u8aToHex } from '@skyekiwi/util';

import { LockedPrivateKey, UserAccount } from '.';

const SEED = 'leg satisfy enlist dizzy rib owner security live solution panther monitor replace';

describe('UserAccount - @choko-wallet/core/account', function () {
  const privateKey = mnemonicToMiniSecret(SEED);

  it('UserAccount - constructor, init, lock/unlock', async () => {
    const userAccount = new UserAccount({
      hasEncryptedPrivateKeyExported: false,
      keyType: 'sr25519', // sr25519
      localKeyEncryptionStrategy: 0 // password-v0
    });

    try {
      await userAccount.init();
    } catch (e) {
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
      hasEncryptedPrivateKeyExported: false,
      keyType: 'sr25519', // sr25519
      localKeyEncryptionStrategy: 0 // password-v0
    });

    expect(userAccount.isLocked).toEqual(false);
    expect(userAccount.address).toBeUndefined();
    expect(userAccount.privateKey).toEqual(privateKey);

    await userAccount.init();

    expect(userAccount.address).toEqual('5Deo86WWHTk26vXXywvocQXu3uE6dLcdj22ZF1jBNYhP2UJn');
  });

  it('UserAccount - serde', async () => {
    const userAccount = UserAccount.seedToUserAccount(SEED, {
      hasEncryptedPrivateKeyExported: false,
      keyType: 'sr25519', // sr25519
      localKeyEncryptionStrategy: 0 // password-v0
    });

    await userAccount.init();

    const data = userAccount.serialize();

    expect(u8aToHex(data)).toEqual('463c4dd84fdc93ee6f8fcaf479476246f8b8df4454b2827ae3d89f4eaf779a2b00000000');

    const userAccount2 = UserAccount.deserialize(data);

    expect(userAccount2.isLocked).toEqual(true);

    expect(userAccount2.hasEncryptedPrivateKeyExported).toEqual(false);
    expect(userAccount2.keyType).toEqual('sr25519');
    expect(userAccount2.localKeyEncryptionStrategy).toEqual(0);

    userAccount2.unlock(privateKey);
    await userAccount2.init();

    expect(userAccount2.isLocked).toEqual(false);
    expect(userAccount2.address).toEqual('5Deo86WWHTk26vXXywvocQXu3uE6dLcdj22ZF1jBNYhP2UJn');
    expect(userAccount2.publicKey).toEqual(userAccount.publicKey);
  });

  it('LockedPrivateKey - serde', () => {
    const userAccount = UserAccount.seedToUserAccount(SEED, {
      hasEncryptedPrivateKeyExported: false,
      keyType: 'sr25519', // sr25519
      localKeyEncryptionStrategy: 0 // password-v0
    });

    const lockedPrivateKey = userAccount.lockUserAccount(new Uint8Array(32));

    const data = lockedPrivateKey.serialize();

    const lockedPrivateKey2 = LockedPrivateKey.deserialize(data);

    expect(lockedPrivateKey2.encryptedPrivateKey).toEqual(lockedPrivateKey.encryptedPrivateKey);
    expect(lockedPrivateKey2.keyType).toEqual(lockedPrivateKey.keyType);
    expect(lockedPrivateKey2.localKeyEncryptionStrategy).toEqual(lockedPrivateKey.localKeyEncryptionStrategy);
    expect(lockedPrivateKey2.hasEncryptedPrivateKeyExported).toEqual(lockedPrivateKey.hasEncryptedPrivateKeyExported);
    expect(lockedPrivateKey2.version).toEqual(lockedPrivateKey.version);
  });
});

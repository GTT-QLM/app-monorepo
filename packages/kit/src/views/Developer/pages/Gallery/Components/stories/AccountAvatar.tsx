import { YStack } from '@onekeyhq/components';
import { AccountAvatar } from '@onekeyhq/kit/src/components/AccountAvatar';
import type {
  IDBAccount,
  IDBWallet,
} from '@onekeyhq/kit-bg/src/dbs/local/types';

import { Layout } from './utils/Layout';

const img = require('@onekeyhq/shared/src/assets/wallet/avatar/Pig.png');

const wallet: IDBWallet = {
  'id': 'hd-2',
  'name': 'wallet 124',
  'avatar': img,
  'type': 'hd',
  'backuped': false,
  'nextAccountIds': {},
  'accounts': [],
  'nextIndex': 54,
  'avatarInfo': {
    'img': 'pig',
  },
};

const account: IDBAccount = {
  type: undefined,
  path: '',
  coinType: '',
  impl: '',
  networks: [],
  template: '',
  id: '111111111',
  name: '1',
  pub: '',
  address: '',
  addresses: { 'aaaa': '1' },
};

const ToastGallery = () => (
  <Layout
    description=""
    suggestions={['']}
    boundaryConditions={['']}
    elements={[
      {
        title: 'Default',
        element: (
          <YStack space="$4" justifyContent="center">
            <AccountAvatar />
            <AccountAvatar account={account} />
            <AccountAvatar size="small" />
            <AccountAvatar size="small" account={account} />
            <AccountAvatar chain="btc" />
            <AccountAvatar account={account} chain="btc" />
            <AccountAvatar size="small" chain="btc" />
            <AccountAvatar size="small" account={account} chain="btc" />
          </YStack>
        ),
      },
    ]}
  />
);

export default ToastGallery;

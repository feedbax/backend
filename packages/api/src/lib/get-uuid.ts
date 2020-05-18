import md5 from 'md5';
import { nanoid } from 'nanoid';

import type { Packet as LoginUserPacket } from '@shared/packets/client/login/user';
import type { Packet as LoginAdminPacket } from '@shared/packets/client/login/admin';

type LoginProps = Partial<LoginUserPacket & LoginAdminPacket>;

const isNode = process?.versions != null && process?.versions?.node != null;

const getLoginMeta = (loginProps: LoginProps): string => {
  const packetData = loginProps.event?.slug || loginProps.user?.email;

  if (!packetData) {
    throw new Error('get-login-uuid.is-no-login-packet');
  }

  return packetData;
};

const get = async (key: string, ifNot: () => string): Promise<string> => {
  let value;

  if (isNode) {
    const fs = await import('fs');

    const filePath = `${__dirname}/.${key}`;
    const uuidExists = fs.existsSync(filePath);

    if (!uuidExists) {
      fs.writeFileSync(filePath, ifNot());
    }

    value = fs.readFileSync(filePath).toString();
  } else {
    const immortalModule = await import('./immortal');
    const immortal = immortalModule.default;

    value = await immortal.get(key, '') || ifNot();
    await immortal.set(key, value);
  }

  return value;
};

/**
 * Generates a random salt or gets the cached one.
 * Stores it in the browsers local storage / indexedDB,
 * if it doesn't exist.
 *
 * @returns salt
 */

const getSalt = async (): Promise<string> => {
  const saltKey = 'fbx-salt';
  const ifNot = (): string => md5(nanoid());

  return get(saltKey, ifNot);
};

/**
 * Generates an uuid or gets the cached for the given login.
 * Stores it in the browsers local storage / indexedDB,
 * with an salted identifier (if it doesn't exist).
 *
 * @param packet either an AdminLogin or an UserLogin packet
 * @returns uuid
 */

export default async function getLoginUUID(loginProps: LoginProps): Promise<string> {
  const loginMeta = getLoginMeta(loginProps);
  const salt = await getSalt();

  const sessionKey = `fbx-uuid-${md5(loginMeta + salt)}`;
  const ifNot = (): string => nanoid();

  return get(sessionKey, ifNot);
}

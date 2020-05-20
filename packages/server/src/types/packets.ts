import Packets from '@shared/packets/ids';
import createMapping from '~lib/create-object-map';

export const PacketsMap = createMapping(
  new Map<string, string>(),
  Packets,
  'Packet',
);

/**
 * Returns a boolean if the given packet is in the given scope.
 *
 * For example:
 *
 * contains(Packet.Incoming.User.Login, 'User') === true
 * contains(Packet.Incoming.Admin.Question.Reorder, 'Admin') === true
 *
 * @param {string} packet Id of the packet
 * @param {string} isInside Scope of the packet it should be in
 *
 * @returns {boolean}
 */

type Scope = 'User' | 'Admin';

export const contains = (packet: string, isInside: Scope): boolean => {
  const scope = PacketsMap.get(packet);

  if (typeof scope === 'undefined' || typeof scope === 'object') {
    return false;
  }

  return scope.indexOf(isInside) !== -1;
};

export interface IncomingPacket<T> extends Array<any> {
  /**
   * packetId
   */

  [0]: string;

  /**
   * packetData
   */

  [1]: T;

  /**
   * Ack function
   */

  [2]?: (...args: any[]) => void;
}

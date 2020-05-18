export interface Packet {
  answer: {
    keepId: string;
    mergeIds: string[];
  };
}

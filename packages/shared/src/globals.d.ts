export {};

declare global {
  type PickPartial<T, K extends keyof T> = Partial<T> & Pick<T, K>;

  type Omit2<T, K1 extends keyof T, K2 extends keyof T[K1]> = Omit<T, K1> &
    {
      [P1 in keyof T]: {
        [P2 in Exclude<keyof T[P1], K2>]: T[P1][P2];
      };
    };

  type Omit3<
    T,
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2]
  > = Omit<T, K1> &
    {
      [P1 in keyof T]: {
        [P2 in keyof T[P1]]: {
          [P3 in Exclude<keyof T[P1][P2], K3>]: T[P1][P2][P3];
        };
      };
    };
}

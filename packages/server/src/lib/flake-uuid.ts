import FlakeId from 'flake-idgen';
import baseX from 'base-x';

const flakeIdGen = new FlakeId();

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const bs62 = baseX(BASE62);

// const BASE10 = '0123456789';
// const bs10 = baseX(BASE10);

export default (): string => (
  bs62.encode(
    flakeIdGen.next(),
  )
);

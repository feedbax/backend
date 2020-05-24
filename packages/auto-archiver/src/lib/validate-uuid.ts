const nanoidRegExp = new RegExp(
  /^([a-z]|[0-9]|_|-){21}$/i,
);

type ValidateSync = (uuid: string | undefined) => boolean;
type ValidateAsync = (uuid: string | undefined) => Promise<boolean>;

export const validateUUIDSync: ValidateSync = (uuid = '') => nanoidRegExp.test(uuid);
export const validateUUIDAsync: ValidateAsync = async (uuid = '') => nanoidRegExp.test(uuid);

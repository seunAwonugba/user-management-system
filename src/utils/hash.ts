import * as bcrypt from 'bcryptjs';

export const hashData = async (password: string) => {
  const hash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
  return hash;
};

export const compareHash = async (payload: any) => {
  const value = payload.value;
  const hash = payload.hash;
  const isMatch = await bcrypt.compare(value, hash);

  return isMatch;
};

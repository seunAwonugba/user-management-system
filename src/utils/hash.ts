import * as bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
  return hash;
};

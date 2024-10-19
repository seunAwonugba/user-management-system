export default () => ({
  database: {
    databaseUrl: process.env.DATABASE_URL,
  },
  saltRound: process.env.SALT_ROUNDS,
  token: {
    accessTokenKey: process.env.ACCESS_TOKEN_KEY,
    refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
    accessTokenEx: process.env.ACCESS_TOKEN_KEY_EX,
    refreshTokenEx: process.env.REFRESH_TOKEN_KEY_EX,
  },
});

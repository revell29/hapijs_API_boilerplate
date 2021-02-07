import JWT from 'jsonwebtoken';

// 12 hours expiration token
const TOKEN_EXPIRED = 4320000000;
const EXPIRATION_RENEW = 6000000;

const checkJWT = async (decode, request) => {
  try {
    const now = new Date().getTime();
    // untuk cek expired token nya
    if (now > decode.exp) {
      return null;
    }

    if (decode.exp - now <= EXPIRATION_RENEW) {
      decode.exp = now + TOKEN_EXPIRED; // nambahin session 10 menit
    }

    try {
      return { isValid: true, credentials: { users: decode } };
    } catch (err) {
      console.log(err);
    }

    return { isValid: false };
  } catch (error) {
    console.log(error);
  }
};

export function initAuthentication(server) {
  server.auth.strategy('jwt', 'jwt', {
    key: process.env.SECRET_KEY,
    validate: checkJWT,
    verifyOptions: { algorithms: ['HS256'] },
  });
}

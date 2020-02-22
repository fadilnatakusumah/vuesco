import jwt from 'jsonwebtoken'

export const verifyToken = async (token) => {
  if (token) {
    const secret = process.env.SECRET;
    try {
      const checkToken = await jwt.verify(token, secret);
      return checkToken;
    } catch (error) {
      throw new Error("Your session has ended. Please sign in again");
    }
  }
}
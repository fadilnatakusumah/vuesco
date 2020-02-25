import jwt from 'jsonwebtoken'

export const verifyToken = async (token) => {
  // console.log("TCL: verifyToken -> token", token)
  if (token) {
    const secret = process.env.SECRET;
    try {
      const checkToken = await jwt.verify(token, secret);
      // console.log("TCL: verifyToken -> checkToken", checkToken)
      return checkToken;
    } catch (error) {
      // return error
      // console.log("TCL: verifyToken -> error", error)
      throw new Error(error.message);
    }
  }
}
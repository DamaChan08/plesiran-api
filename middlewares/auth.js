const jwt = require("jsonwebtoken");
const { secretKey, basicAuthUser, basicAuthPass } = require("#config/vars");

/**
 * Verify JWT token
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: "ERROR",
          statusCode: 401,
          message: "Authentication token is not valid.",
          errors: [err.message],
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      status: "ERROR",
      statusCode: 401,
      message: "Authentication token is not supplied.",
      errors: [],
    });
  }
};

/**
 * Verify basic auth
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const verifyBasicAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const isAuth =
    "Basic " +
    Buffer.from(`${basicAuthUser}:${basicAuthPass}`).toString("base64");

  if (authHeader === isAuth) {
    next();
  } else {
    return res.status(401).json({
      status: "ERROR",
      statusCode: 401,
      message: "Authentication token is not valid.",
      errors: [],
    });
  }
};

module.exports = {
  verifyToken: verifyToken,
  verifyBasicAuth: verifyBasicAuth,
};

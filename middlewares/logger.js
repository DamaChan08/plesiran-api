const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const { dateGMT7 } = require("#utils/date");

const logger = morgan(function (tokens, req, res) {
  const { headers: reqHeaders, query, body } = req;
  let username = "";
  let email = "";
  const headerToken =
    reqHeaders["x-access-token"] ||
    reqHeaders["authorization"] ||
    reqHeaders["x-api-key"];
  if (headerToken && headerToken.startsWith("Bearer ")) {
    const token = headerToken.slice(7, headerToken.length);
    const decoded = jwt.decode(token);
    username = decoded?.name || "";
    email = decoded?.upn || "";
  }

  const statusCode = tokens.status(req, res) || "";
  let level = "INFO";
  if (statusCode.startsWith("4") || statusCode.startsWith("5")) {
    level = "ERROR";
  }

  let headers = "";
  if (Object.keys(reqHeaders).length > 0) {
    delete reqHeaders?.authorization;
    delete reqHeaders?.cookie;
    delete reqHeaders["x-api-key"];
    delete reqHeaders["x-access-token"];
    headers = JSON.stringify(reqHeaders);
  }

  const responseBody =
    res.responseBody && res.responseBody.length < 10000 ? res.responseBody : "";

  const log = {
    level,
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    headers,
    query: Object.keys(query).length > 0 ? JSON.stringify(query) : "",
    body: Object.keys(body).length > 0 ? JSON.stringify(body) : "",
    username,
    email,
    statusCode,
    responseBody,
    responseTime: `${tokens["response-time"](req, res)} ms`,
    contentLength: `${tokens.res(req, res, "content-length")}`,
    datetime: dateGMT7(),
  };

  return JSON.stringify(log);
});

module.exports = {
  logger: logger,
};

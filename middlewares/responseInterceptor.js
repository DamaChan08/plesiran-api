/**
 * Response interceptor
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const responseInterceptor = (req, res, next) => {
  const oldJSON = res.json;
  res.json = (data) => {
    res.responseBody = JSON.stringify(data);
    return oldJSON.call(res, data);
  };
  next();
};

module.exports = {
  responseInterceptor: responseInterceptor,
};

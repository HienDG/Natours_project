/**
 *
 * @param {*} callback async callback function
 * @returns  func with three 3 argument req, res & next
 */

module.exports = (callback) => (req, res, next) =>
  callback(req, res, next).catch((err) => next(err));

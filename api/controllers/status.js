/*
 * GET /status, returns status of API
 */
function getStatus(req, res) {
  res.json({ status: 'Alive' });
}

//export all the functions
module.exports = { getStatus };

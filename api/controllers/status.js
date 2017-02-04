/*
 * GET /status, returns status of API
 */
function getStatus(req, res) {
  console.log('GET /status');
  res.json({ status: 'Alive' });
}

//export all the functions
module.exports = { getStatus };

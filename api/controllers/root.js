/*
 * GET /, returns usage of API
 */
function get(req, res) {
  console.log('GET /');
  res.json({
    result: 'Hello world! This is the API for the IoT Workshop.'
  });
}

//export all the functions
module.exports = { get };

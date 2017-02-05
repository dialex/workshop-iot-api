/*
 * GET /, returns usage of API
 */
function get(req, res) {
  res.json({
    result: 'Hello world! This is the API for the IoT Workshop.',
    endpoints: [
      {
        url: '/status',
        verb: 'GET',
        desc: 'returns status of API'
      },
      {
        url: '/message',
        verb: 'GET',
        desc: 'returns all messages'
      },
      {
        url: '/message/{author_name}',
        verb: 'GET',
        desc: 'returns messages filtered by author'
      },
      {
        url: '/message',
        verb: 'POST',
        desc: 'saves a new message'
      },
      {
        url: '/message',
        verb: 'DELETE',
        desc: 'deletes all messages'
      }
    ],
    authentication:
    {
      method: 'Authentication Token',
      url: '/auth',
      verb: 'POST',
      user: 'testbash',
      pass:'brighton17',
      header: 'x-access-token'
    }
  });
}

//export all the functions
module.exports = { get };

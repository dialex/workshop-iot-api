/*
 * POST /auth, validates credentials of user
 */
function authenticate(req, res) {
  console.log('POST /auth');
  var user = req.body.username;
  var pass = req.body.password;
  if ((user === 'testbash') && (pass === 'brighton17')) {
    res.json({ status: 'OK' });
    console.log('POST /auth');
  } else {
    res.json({ status: 'NOK' });
    console.log('\tInvalid login: ' + user + ' / ' + pass);
  }
}

//export all the functions
module.exports = { authenticate };

/*
 * POST /auth, validates credentials of user
 */
function authenticate(req, res) {
  var user = req.body.username;
  var pass = req.body.password;

  if ((user === 'testbash') && (pass === 'brighton17')) {
    var token = jwt.sign(user, app.get('superSecret'), {
      expiresInMinutes: 1440 // expires in 24 hours
    });
    res.json({
      success: true,
      message: 'Authentication succeded. Enjoy your token.',
      token: token
    });
  } else {
    res.json({
      success: false,
      message: 'Authentication failed. Check your credentials.'
    });
    console.log('\tInvalid login: ' + user + ' / ' + pass);
  }
}

//export all the functions
module.exports = {
  authenticate
};

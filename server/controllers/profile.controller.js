var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

  // If no user ID exists in the JWT return a 401
  if (!req.auth._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.auth._id)
      .exec(function(err, user) {
        //console.log(user)
        res.json(user)
        res.status(200);
      });
  }
};
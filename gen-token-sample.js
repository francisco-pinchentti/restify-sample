var jwt = require('jsonwebtoken');

const config = require("./config.json");
const tokenSample = jwt.sign(Object.assign({}, config.auth.options, {
  sub: 'john@doe.com'
}), config.auth.secret);

console.log(tokenSample);

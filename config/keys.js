//keys.js - figure out what type of cridentioals to return

if (process.env.NODE_ENV === 'production') {
  //we are in poduction - return the prod set of kys
 module.exports = require('./prod');
} else {
  //we are in developing -return the dev keys!!!
  //exporing and reaiuring -devFile- at thh same time
module.exports = require('./dev');


}

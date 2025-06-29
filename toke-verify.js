const jwt = require('jsonwebtoken');

const secret = 'soto';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc1MTE0NzI0NH0.rqALJk8vtrP6F8ARBu2Uwws-zhGtK2wZLnU-Xyd_eqk';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);

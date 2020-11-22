import jwt from 'jsonwebtoken';

function authMiddleware(request, response, next) {
  const jsonwebtoken = request.headers.authorization;

  if (!jsonwebtoken) {
    return response.status(401).json({ error: 'JWT invalid.' });
  }

  const [, token] = jsonwebtoken.split(' ');

  const verifyToken = jwt.verify(token, 'siuhaushajsnaisn');
  console.log(verifyToken);

  const { iat, exp } = verifyToken;

  const timeGeneratedIat = new Date(iat * 1000);
  const hoursGeneratedJWT = new Date(exp * 1000);

  console.log('foi gerado em:', timeGeneratedIat.toLocaleDateString());

  const getFullTimeExp = hoursGeneratedJWT.toLocaleDateString();
  console.log('exp, quando expira o token', getFullTimeExp);

  next();
}

export default authMiddleware;

import jwt from 'jsonwebtoken';

function authMiddleware(request, response, next) {
  const jsonwebtoken = request.headers.authorization;

  if (!jsonwebtoken) {
    return response.status(401).json({ error: 'JWT invalid.' });
  }

  const [, token] = jsonwebtoken.split(' ');

  try {
    const verifyToken = jwt.verify(token, 'siuhaushajsnaisn');
    console.log(verifyToken);

    const { iat, exp, user_id } = verifyToken;

    const timeGeneratedIat = new Date(iat * 1000);
    const hoursGeneratedJWT = new Date(exp * 1000);

    console.log('foi gerado em:', timeGeneratedIat.toLocaleDateString());

    const getFullTimeExp = hoursGeneratedJWT.toLocaleDateString();
    console.log('exp, quando expira o token', getFullTimeExp);

    request.user_id = user_id;

    return next();
  } catch (err) {
    return response.status(401).json({ error: 'Token invalid.' });
  }
}

export default authMiddleware;

const verifyApiHeaderToken = (req, res, next) => {
  const { apitoken } = req.headers; 
  if (apitoken) {
    if (apitoken === process.env.API_TOKEN) {
      return next(); //Decirle a express, aqui ya termino esto, pasemos a lo siguiente
    } else { //Si no es igual entonces a la token, se manda que no es autorizado para entrar 
      return sendUnauthorized(res);
    }
  } else {
    return sendUnauthorized(res)
  }
}

const sendUnauthorized = (res) => {
  res.status(401).json({"error":"recurso no autorizado!"})
}

module.exports = {
  verifyApiHeaderToken,
};
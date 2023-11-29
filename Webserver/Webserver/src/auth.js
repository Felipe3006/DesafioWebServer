// Importa o módulo jsonwebtoken para trabalhar com JSON Web Tokens (JWT).
const jsonwebtoken = require('jsonwebtoken');
 
// Exporta uma chave privada constante usada para assinar os tokens JWT.
const PRIVATE_KEY = '2023VBF';
 
// Exporta um objeto de usuário, representando um usuário padrão ou exemplo.
 
module.exports
const user = 1
module.exports = user
 
// Define e exporta a função tokenValited, que é um middleware para validar tokens JWT.
function tokenValited(
  request,
  response,
  next
) {
  // Extrai o token JWT do cabeçalho de autorização da requisição. Se não houver token, atribui um espaço em branco.
  const [, token] = request.headers.authorization?.split(' ') || [' ', ' '];
 
  // Se não houver token, retorna um erro 401 (Não Autorizado).
  if(!token) return response.status(401).send('Acesso negado.');
 
  try {
    // Tenta verificar o token usando a chave privada. Se o token for inválido, um erro será lançado.
    const payload = jsonwebtoken.verify(token, PRIVATE_KEY);
    // Extrai o ID do usuário do payload do token, se disponível.
    const userIdFromToken = typeof payload !== 'string' && payload.user;
 
    // Se não houver um usuário no payload, retorna um erro 401.
    if(!user && !userIdFromToken) {
      return response.send(401).json({ message: 'Acesso negado.' });
    }
 
    // Adiciona o usuário extraído do token aos cabeçalhos da requisição para uso posterior.
    request.headers['user'] = payload.user;
 
    // Chama a próxima função middleware na cadeia.
    return next();
  } catch(error) {
    // Em caso de erro na verificação do token, registra o erro e retorna um erro 401.
    console.log(error);
    return response.status(401).json({ message: 'Acesso negado.' });
  }
}
module.exports = {
  PRIVATE_KEY,
  user,
  tokenValited
};
 
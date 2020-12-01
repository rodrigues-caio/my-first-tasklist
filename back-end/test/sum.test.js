const verificarUsuario = require('./sum');

test('Transformar objeto para array', () => {
  const usuario = {
    nome: 'Caio',
    email: 'caio@hotmail.com',
  };

  expect(verificarUsuario(usuario)).toEqual(['Caio', 'caio@hotmail.com']);
});

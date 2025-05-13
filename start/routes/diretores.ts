import Route from "@ioc:Adonis/Core/Route";

Route.post('/diretores', 'Diretores/CadastrarDiretoresController')
Route.post('/diretores/login', 'Diretores/LoginDiretoresController')

Route.group(() => {
    Route.post('/diretores/token/validar', 'Diretores/ValidarTokenDiretoresController')
    Route.post('/diretores/token/remover', 'Diretores/RemoverTokenDiretoresController')
}).middleware('auth:diretor')
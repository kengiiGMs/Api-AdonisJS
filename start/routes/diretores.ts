import Route from "@ioc:Adonis/Core/Route";

Route.post('/diretores', 'Diretores/CadastrarDiretoresController')
Route.post('/diretores/login', 'Diretores/LoginDiretoresController')
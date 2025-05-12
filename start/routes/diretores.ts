import Route from "@ioc:Adonis/Core/Route";

Route.post('/diretores', 'Diretores/CadastrarController')
Route.post('/diretores/login', 'Diretores/LoginController')
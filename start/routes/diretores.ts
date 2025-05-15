import Route from "@ioc:Adonis/Core/Route";

Route.post('/diretores', 'Diretores/CadastrarDiretoresControllers')
Route.get('/diretores', 'Diretores/ListarDiretoresControllers')

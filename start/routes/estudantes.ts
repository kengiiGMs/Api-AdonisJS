import Route from "@ioc:Adonis/Core/Route";

Route.post('/estudantes', 'Estudantes/CadastrarEstudantesController')
Route.post('/estudantes/login', 'Estudantes/LoginEstudantesController')
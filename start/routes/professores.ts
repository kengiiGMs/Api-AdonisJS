import Route from "@ioc:Adonis/Core/Route";

Route.post('/professores', 'Professores/CadastrarProfessoresController')
Route.post('/professores/login', 'Professores/LoginProfessoresController')

Route.group(() => {
    Route.post('/professores/token/validar', 'Professores/ValidarTokenProfessoresController')
    Route.post('/professores/token/remover', 'Professores/RemoverTokenProfessoresController')
}).middleware('auth:professor')
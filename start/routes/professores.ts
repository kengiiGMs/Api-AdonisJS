import Route from "@ioc:Adonis/Core/Route";

Route.post('/professores/login', 'Professores/LoginProfessoresController')

Route.group(() => {
    Route.post('/professores', 'Professores/CadastrarProfessoresController')
}).middleware('auth:diretor')

Route.group(() => {
    Route.post('/professores/token/validar', 'Professores/ValidarTokenProfessoresController')
    Route.post('/professores/token/remover', 'Professores/RemoverTokenProfessoresController')
}).middleware('auth:professor')
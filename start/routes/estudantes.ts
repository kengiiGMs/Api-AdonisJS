import Route from "@ioc:Adonis/Core/Route";

Route.post('/estudantes', 'Estudantes/CadastrarEstudantesController')
Route.post('/estudantes/login', 'Estudantes/LoginEstudantesController')

Route.group(() => {
    Route.get('/estudantes', 'Estudantes/ListarEstudantesController')
    Route.delete('/estudantes/:estudante_id', 'Estudantes/DeletarEstudantesController')
}).middleware('auth:diretor')
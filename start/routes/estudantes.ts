import Route from "@ioc:Adonis/Core/Route";

Route.post('/estudantes', 'Estudantes/CadastrarEstudantesController')
Route.post('/estudantes/login', 'Estudantes/LoginEstudantesController')

Route.group(() => {
    Route.get('/estudantes', 'Estudantes/ListarEstudantesController')
    Route.delete('/estudantes/:estudante_id', 'Estudantes/DeletarEstudantesController')
}).middleware('multiAuthProfessorDiretor')

Route.group(() => {
    Route.post('/estudantes/token/validar', 'Estudantes/ValidarTokenEstudantesController')
    Route.post('/estudantes/token/remover', 'Estudantes/RemoverTokenEstudantesController')
    Route.put('/estudantes/:estudante_id', 'Estudantes/EditarEstudantesController')
}).middleware('auth:estudante')
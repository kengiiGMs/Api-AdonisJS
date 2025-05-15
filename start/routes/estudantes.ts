import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
    Route.get('/estudantes', 'Estudantes/ListarEstudantesControllers')
    Route.post('/estudantes', 'Estudantes/CadastrarEstudantesControllers')
}).middleware(['auth:usuario', 'diretor'])

Route.group(() => {
    Route.get('/estudantes/:estudante_id', 'Estudantes/BuscarEstudantesControllers')
}).middleware(['auth:usuario', 'estudante'])



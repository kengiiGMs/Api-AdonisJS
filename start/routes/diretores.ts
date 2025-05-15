import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
    Route.post('/diretores/:usuario_id', 'Diretores/CadastrarDiretoresControllers')
    Route.get('/diretores', 'Diretores/ListarDiretoresControllers')
}).middleware('auth:usuario')
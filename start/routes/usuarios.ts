import Route from "@ioc:Adonis/Core/Route";

Route.post('/usuarios', 'Usuarios/CadastrarUsuariosController')
Route.post('/usuarios/login', 'Usuarios/LoginUsuariosController')

Route.group(() => {
    Route.post('/usuarios/token/validar', 'Usuarios/ValidarTokenUsuariosController')
    Route.post('/usuarios/token/remover', 'Usuarios/RemoverTokenUsuariosController')
}).middleware('auth:usuario')

Route.group(() => {
    Route.get('/usuarios', 'Usuarios/ListarUsuariosController')
    Route.delete('/usuarios/:usuario_id', 'Usuarios/DeletarUsuariosController')
    Route.put('/usuarios/:usuario_id', 'Usuarios/EditarUsuariosController')
}).middleware(['auth:usuario', 'diretor'])
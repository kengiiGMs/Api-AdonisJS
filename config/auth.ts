import type { AuthConfig } from '@ioc:Adonis/Addons/Auth'

const authConfig: AuthConfig = {
  guard: 'estudante',

  guards: {
    estudante: {
      driver: 'oat',

      tokenProvider: {
        type: 'api',
        driver: 'database',
        table: 'api_token_estudantes',
        foreignKey: 'user_id',
      },

      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],
        model: () => import('App/Models/Estudante'),
      },
    },
    diretor: {
      driver: 'oat',

      tokenProvider: {
        type: 'api',
        driver: 'database',
        table: 'api_token_diretores',
        foreignKey: 'user_id',
      },

      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],
        model: () => import('App/Models/Diretor'),
      },
    },
  },
}

export default authConfig

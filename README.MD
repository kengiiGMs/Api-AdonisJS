# Api-AdonisJS
Construindo uma API utilizando o framework `AdonisJS 5`
- Foi desenvolvida uma API RESTful utilizando `AdonisJS 5`, com foco na gestão de alunos e diretores. A aplicação oferece operações completas de CRUD (criação, leitura, atualização e exclusão) para ambas as entidades.
- Foram implementadas validações estruturadas do corpo das requisições, garantindo a integridade dos dados recebidos.
- Para segurança, algumas rotas foram protegidas utilizando autenticação por token (API Token), restringindo o acesso a operações sensíveis apenas a usuários autorizados.

## Objetivos 
Projeto com o objetivo de compreender a estrutura do `AdonisJS 5`

### Conceitos aprendidos 
-

### Rodar o projeto 
1. **Node.JS:**
   - Certifique-se de ter o node instalado e configurado corretamente em seu ambiente de desenvolvimento.
2. **Mysql:**
    - Certifique-se de ter o banco de dados mysql instalado e configurado corretamente em seu ambiente de desenvolvimento.
3. **.env:**
    - Certifique-se de ter criado o seu arquivo `.env` e configurado de acordo com o `.env_example`
   <br>

<b>Comandos:</b>

Instalar dependências do projeto:

``` 

npm install

``` 

Rodar a api:

``` 

node ace migration:run

```

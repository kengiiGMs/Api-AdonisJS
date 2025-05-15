import type { CustomMessages } from "@ioc:Adonis/Core/Validator";

export const usuarioMensagensValidacao: CustomMessages = {
    "email.required": "Email é obrigatório",
    "password.required": "Senha é obrigatória",
    "email.email": "Email inválido",
    "password.confirmed": "As senhas não coincidem",
    "password_confirmation.confirmed": "As senhas não coincidem",
    "password.minLength": `A senha deve ter pelo menos 5 caracteres`,
    exists: "{{ field }} inválido",
}

export const diretorMensagensValidacao: CustomMessages = {
    "nome.required": "Nome é obrigatório",
    "email.required": "Email é obrigatório",
    "password.required": "Senha é obrigatória",
    "tipo.required": "Tipo é obrigatório",
    "email.email": "Email inválido",
    "tipo.enum": "Tipo inválido",
    "password.confirmed": "As senhas não coincidem",
    "password_confirmation.confirmed": "As senhas não coincidem",
    "password.minLength": `A senha deve ter pelo menos 5 caracteres`,
    exists: "{{ field }} inválido",
}

export const estudanteMensagensValidacao: CustomMessages = {
    "nome.required": "Nome é obrigatório",
    "email.required": "Email é obrigatório",
    "password.required": "Senha é obrigatória",
    "tipo.required": "Tipo é obrigatório",
    "telefone.required": "Telefone é obrigatório",
    "endereco.required": "Endereco é obrigatório",
    "ra.required": "RA é obrigatório",
    "email.email": "Email inválido",
    "tipo.enum": "Tipo inválido",
    "password.confirmed": "As senhas não coincidem",
    "password_confirmation.confirmed": "As senhas não coincidem",
    "password.minLength": `A senha deve ter pelo menos 5 caracteres`,
    "ra.maxLength": `O RA deve ter pelo máximo 13 caracteres`,
    "telefone.maxLength": `O Telefone deve ter pelo máximo 11 caracteres`,
    exists: "{{ field }} inválido",
}


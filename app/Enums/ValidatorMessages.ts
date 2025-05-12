import type { CustomMessages } from "@ioc:Adonis/Core/Validator";

export const diretorMensagensValidacao: CustomMessages = {
    "nome.required": "Nome é obrigatório",
    "email.required": "Email é obrigatório",
    "password.required": "Senha é obrigatória",
    "email.email": "Email inválido",
    "password.confirmed": "As senhas não coincidem",
    "password_confirmation.confirmed": "As senhas não coincidem",
    "password.minLength": `A senha deve ter pelo menos 5 caracteres`,
    exists: "{{ field }} inválido",
}
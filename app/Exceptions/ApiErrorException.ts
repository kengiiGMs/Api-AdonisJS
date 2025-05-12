import { Exception } from '@adonisjs/core/build/standalone'

export default class ApiErrorException extends Exception {
    constructor(message: string, status: number = 400, code: string = 'API_ERROR') {
        super(message, status, code)
    }
}
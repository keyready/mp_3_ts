// тут описываются используемые в фиче/сущности типы

export interface LoginSchema {
    username: string;
    password: string;
    repeatedPassword: string;
    isLoading: boolean;
    error?: string;
}

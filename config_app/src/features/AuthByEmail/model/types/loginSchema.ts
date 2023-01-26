// тут описываются используемые в фиче/сущности типы

export interface LoginSchema {
    middlename?: string;
    firstname?: string;
    lastname?: string;
    username: string;
    password: string;
    repeatedPassword: string;
    isLoading: boolean;
    error?: string;
}

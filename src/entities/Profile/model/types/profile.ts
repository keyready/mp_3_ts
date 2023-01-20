export interface Profile {
    id?: string;
    first?: string,
    lastname?: string,
    age?: number,
    city?: string,
    username?: string,
    avatar?: string
}

export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'incorrect_user_data',
    INCORRECT_USER_AGE = 'incorrect_user_age',
    INCORRECT_USER_COUNTRY = 'incorrect_user_country',
    SERVER_ERROR = 'server_error',
    NO_DATA = 'no_data',
}

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean
    validationError?: ValidateProfileError[];
}

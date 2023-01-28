export interface User {
    banReason?: string;
    email?: string;
    firstname?: string;
    id?: number;
    isBanned?: boolean;
    lastname?: string;
    middlename?: string;
    photo?: string;
    role?: string;
}

export interface UserSchema {
    authData?: User;
    error?: string;
    isLoading?: boolean;
    token?: string;
    _inited?: boolean;
    _activate_link?: string;

    // редактирование профиля
    form?: User;
    readonly?: boolean;
}

export interface User {
    firstname?: string;
    middlename?: string;
    lastname?: string;
    photo?: string;
    id: number;
    email: string;
    avatar?: string;
    role?: string;
    isBanned?: boolean;
}

export interface UserSchema {
    authData?: User;
    error?: string;
    isLoading?: boolean;
    token?: string;
    _inited?: boolean;
    _activate_link?: string;
}

export interface ChangePass {
    oldPassword?: string;
    newPassword?: string;
    repeatedNewPassword?: string;
}

export interface ChangePassSchema {
    data: ChangePass;
    error?: string;
    isLoading?: boolean;
}

import { EntityState } from '@reduxjs/toolkit';
import { User } from 'entities/User';

export interface UsersManagerSchema extends EntityState<User>{
    data?: User[];
    isLoading?: boolean;
    error?: string;
}

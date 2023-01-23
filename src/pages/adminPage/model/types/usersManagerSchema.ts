import { Profile } from 'entities/Profile';
import { EntityState } from '@reduxjs/toolkit';

export interface UsersManagerSchema extends EntityState<Profile>{
    data?: Profile[];
    isLoading?: boolean;
    error?: string;
}

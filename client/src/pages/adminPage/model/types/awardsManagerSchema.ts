import { EntityState } from '@reduxjs/toolkit';
import { Award } from 'entities/Award/model/types/Award';

export interface AwardsManagerSchema extends EntityState<Award>{
    data?: Award[];
    isLoading?: boolean;
    error?: string;
}

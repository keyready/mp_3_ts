import { EntityState } from '@reduxjs/toolkit';
import { Hero } from 'entities/Hero';

export interface HeroesManagerSchema extends EntityState<Hero>{
    data?: Hero[];
    isLoading?: boolean;
    error?: string;
}

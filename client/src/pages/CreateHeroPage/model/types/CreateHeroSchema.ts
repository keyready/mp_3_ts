import { EntityState } from '@reduxjs/toolkit';
import { Hero } from 'entities/Hero';

export interface CreateHeroSchema extends EntityState<Hero> {
    isLoading?: boolean;
    error?: string;
    _inited?: boolean;
}

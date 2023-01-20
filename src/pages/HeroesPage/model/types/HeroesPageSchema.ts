import { Hero } from 'entities/Hero/model/types/Hero';
import { EntityState } from '@reduxjs/toolkit';

export interface HeroesPageSchema extends EntityState<Hero> {
    isLoading?: boolean;
    error?: string;
    _inited?: boolean;
}

import { Hero } from './Hero';

export interface HeroSchema {
    data?: Hero[];
    isLoading?: boolean;
    error?: string;
}

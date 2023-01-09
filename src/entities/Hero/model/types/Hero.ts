import { Award } from 'entities/Award';

export interface Rank {
    id: number;
    name: string;
    category: string;
}

export interface Hero {
    id?: number;
    name?: string;
    surname?: string;
    lastname?: string;
    photo?: string;
    userId?: number;
    story?: string;
    awards?: number[];
    rank?: number;
}

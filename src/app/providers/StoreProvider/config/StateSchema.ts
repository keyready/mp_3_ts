import { CounterSchema } from 'entities/Counter';
import { HeroSchema, HeroesSchema } from 'entities/Hero';

export interface StateSchema {
    counter: CounterSchema;
    hero: HeroSchema
    heroes: HeroesSchema
}

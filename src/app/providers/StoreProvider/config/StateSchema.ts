import { CounterSchema } from 'entities/Counter';
import { HeroSchema } from 'entities/Hero/model/types/HeroSchema';
import { AwardSchema } from 'entities/Award/model/types/AwardSchema';

export interface StateSchema {
    counter: CounterSchema;
    hero: HeroSchema
    award: AwardSchema
}

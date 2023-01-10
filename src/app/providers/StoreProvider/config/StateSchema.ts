import { CounterSchema } from 'entities/Counter';
import { HeroesSchema, HeroSchema } from 'entities/Hero';
import { UserSchema } from 'entities/User';
import { To } from '@remix-run/router';
import { NavigateOptions } from 'react-router/dist/lib/context';

export interface StateSchema {
    counter: CounterSchema;
    hero: HeroSchema
    heroes: HeroesSchema
    user: UserSchema
}

export interface ThunkExtraArg {
    navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}

import { configureStore } from '@reduxjs/toolkit';
import { CounterReducer } from 'entities/Counter';
import { HeroesReducer, HeroReducer } from 'entities/Hero';
import { UserReducer } from 'entities/User';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: {
            counter: CounterReducer,
            hero: HeroReducer,
            heroes: HeroesReducer,
            user: UserReducer,
        },
        devTools: IS_DEV,
        preloadedState: initialState,
    });
}

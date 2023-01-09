import { configureStore } from '@reduxjs/toolkit';
import { CounterReducer } from 'entities/Counter';
import { HeroReducer } from 'entities/Hero/model/slices/HeroSlice';
import { AwardReducer } from 'entities/Award/model/slices/AwardSlice';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: {
            counter: CounterReducer,
            hero: HeroReducer,
            award: AwardReducer,
        },
        devTools: IS_DEV,
        preloadedState: initialState,
    });
}

import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByEmail';
import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { ProfileSchema } from 'entities/Profile';
import { AxiosInstance } from 'axios';
import { UISchema } from 'features/UI';
import { HeroSchema } from 'entities/Hero/model/types/HeroSchema';
import { HeroesPageSchema } from 'pages/HeroesPage';
import { CreateHeroSchema } from 'pages/CreateHeroPage';
import { UsersManagerSchema } from 'pages/adminPage';
import { HeroesManagerSchema } from 'pages/adminPage/model/types/heroesManagerSchema';
import { AwardSchema } from 'entities/Award/model/types/AwardSchema';

export interface StateSchema {
    user: UserSchema;
    ui: UISchema

    // asynchronous reducers
    profile?: ProfileSchema;
    loginForm?: LoginSchema;
    hero?: HeroSchema;
    heroesPage?: HeroesPageSchema;
    createHeroPage?: CreateHeroSchema;
    usersManagerPage?: UsersManagerSchema;
    heroesManagerPage?: HeroesManagerSchema;
    award?: AwardSchema
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>
export interface reducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: reducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}

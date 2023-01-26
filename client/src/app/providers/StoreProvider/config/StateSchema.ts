import { LoginSchema } from 'features/AuthByEmail';
import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { UISchema } from 'features/UI';
import { UserSchema } from 'entities/User';
import { ProfileSchema } from 'entities/Profile';
import { HeroSchema } from 'entities/Hero';
import { AwardSchema } from 'entities/Award';
import { HeroesPageSchema } from 'pages/HeroesPage';
import { CreateHeroSchema } from 'pages/CreateHeroPage';
import {
    AwardsManagerSchema,
    UsersManagerSchema,
    HeroesManagerSchema,
} from 'pages/adminPage';
import { ChangePassSchema } from 'pages/ProfilePage';

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
    awardsManagerPage?: AwardsManagerSchema;
    award?: AwardSchema
    changePassword?: ChangePassSchema;
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

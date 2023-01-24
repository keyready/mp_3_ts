import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Hero } from 'entities/Hero';
import { fetchHeroes } from 'pages/adminPage/model/services/fetchHeroes';
import { HeroesManagerSchema } from '../types/heroesManagerSchema';

const heroesManagerAdapter = createEntityAdapter<Hero>({
    selectId: (hero) => hero.id,
});

export const getHeroes = heroesManagerAdapter.getSelectors<StateSchema>(
    (state) => state.heroesManagerPage || heroesManagerAdapter.getInitialState(),
);

const heroesManagerSlice = createSlice({
    name: 'heroesManagerSlice',
    initialState: heroesManagerAdapter.getInitialState<HeroesManagerSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: ((builder) => {
        builder
            .addCase(fetchHeroes.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchHeroes.fulfilled, (
                state,
                action: PayloadAction<Hero[]>,
            ) => {
                state.isLoading = false;
                heroesManagerAdapter.setAll(state, action.payload);
            })
            .addCase(fetchHeroes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const {
    reducer: heroesManagerReducers,
    actions: heroesManagerActions,
} = heroesManagerSlice;

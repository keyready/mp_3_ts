import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Hero } from 'entities/Hero/model/types/Hero';
import { HeroesPageSchema } from 'pages/HeroesPage';
import { fetchHeroes } from '../services/fetchHeroes';

const heroAdapter = createEntityAdapter<Hero>({
    selectId: (hero) => hero.id,
});

export const getHeroes = heroAdapter.getSelectors<StateSchema>(
    (state) => state.heroesPage || heroAdapter.getInitialState(),
);

const heroesPageSlice = createSlice({
    name: 'articlePageSlice',
    initialState: heroAdapter.getInitialState<HeroesPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {
        init: (state) => {
            state._inited = true;
            state.modified = false;
        },
        modify: (state) => {
            state.modified = true;
        },
    },
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
                heroAdapter.addMany(state, action.payload);
            })
            .addCase(fetchHeroes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const {
    reducer: heroesPageReducers,
    actions: heroesPageActions,
} = heroesPageSlice;

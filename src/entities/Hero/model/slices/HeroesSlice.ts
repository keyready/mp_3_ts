import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllHeroes, Hero, HeroesSchema } from 'entities/Hero';

const initialState: HeroesSchema = {
    data: [],
    error: undefined,
    isLoading: false,
};

export const HeroesSlice = createSlice({
    name: 'HeroesSlice',
    initialState,
    reducers: {
        setHeroData: (state, action: PayloadAction<Hero[]>) => {
            state.data = action.payload;
        },
    },
    extraReducers: ((builder) => {
        builder
            .addCase(fetchAllHeroes.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchAllHeroes.fulfilled, (
                state,
                action: PayloadAction<any>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchAllHeroes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const { actions: HeroesActions } = HeroesSlice;
export const { reducer: HeroesReducer } = HeroesSlice;

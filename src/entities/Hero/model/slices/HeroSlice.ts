import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hero } from 'entities/Hero/model/types/Hero';
import { getAllHeroes } from '../services/getAllHeroes';
import { HeroSchema } from '../types/HeroSchema';

const initialState: HeroSchema = {
    data: [],
    error: undefined,
    isLoading: false,
};

export const HeroSlice = createSlice({
    name: 'HeroSlice',
    initialState,
    reducers: {
        setHeroes: (state, action: PayloadAction<Hero[]>) => {
            state.data = action.payload;
        },
    },
    extraReducers: ((builder) => {
        builder
            .addCase(getAllHeroes.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(getAllHeroes.fulfilled, (
                state,
                action: PayloadAction<any>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getAllHeroes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const { actions: HeroActions } = HeroSlice;
export const { reducer: HeroReducer } = HeroSlice;

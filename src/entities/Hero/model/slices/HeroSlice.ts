import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllHeroes, Hero } from 'entities/Hero';
import { fetchHeroById } from '../services/fetchHeroById';
import { HeroSchema } from '../types/HeroSchema';

const initialState: HeroSchema = {
    data: {
        firstname: '',
        id: 0,
        lastname: '',
        middlename: '',
        photo: '',
        rank: '',
        story: '',
    },
    error: undefined,
    isLoading: false,
};

export const HeroSlice = createSlice({
    name: 'HeroSlice',
    initialState,
    reducers: {
        setHeroData: (state, action: PayloadAction<Hero>) => {
            state.data = action.payload;
        },
    },
    extraReducers: ((builder) => {
        builder
            .addCase(fetchHeroById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchHeroById.fulfilled, (
                state,
                action: PayloadAction<any>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchHeroById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const { actions: HeroActions } = HeroSlice;
export const { reducer: HeroReducer } = HeroSlice;

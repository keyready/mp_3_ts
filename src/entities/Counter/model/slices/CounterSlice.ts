import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CounterSchema } from '../types/CounterSchema';

const initialState: CounterSchema = {
    counter: 0,
};

export const CounterSlice = createSlice({
    name: 'CounterSlice',
    initialState,
    reducers: {
        increment: (state) => {
            state.counter += 1;
        },
        decrement: (state) => {
            state.counter -= 1;
        },
    },
});

export const { actions: CounterActions } = CounterSlice;
export const { reducer: CounterReducer } = CounterSlice;

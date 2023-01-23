import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchHeroes } from 'pages/HeroesPage/model/services/fetchHeroes';
import {
    getHeroesPageInited,
    getHeroesPageModified,
} from 'pages/HeroesPage/model/selectors/HeroesPageSelector';
import { heroesPageActions } from 'pages/HeroesPage';

export const initHeroesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'heroes/initHeroesPage',
    async (_, thunkApi) => {
        const { dispatch, getState } = thunkApi;

        const inited = getHeroesPageInited(getState());
        const modified = getHeroesPageModified(getState());

        if (!inited && !modified) {
            dispatch(heroesPageActions.init());
            dispatch(fetchHeroes({}));
        }
    },
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchHeroes } from 'pages/HeroesPage/model/services/fetchHeroes';
import { getHeroesPageInited } from 'pages/HeroesPage/model/selectors/HeroesPageSelector';
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

        if (!inited) {
            dispatch(heroesPageActions.init());
            dispatch(fetchHeroes({}));
        }
    },
);

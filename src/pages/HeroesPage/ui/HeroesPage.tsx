import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page/Page';
import { useSelector } from 'react-redux';
import { HeroesList } from 'entities/Hero/ui/HeroesList/HeroesList';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { getHeroes, heroesPageReducers } from '../model/slice/HeroesPageSlice';
import { getHeroesError, getHeroesIsLoading } from '../model/selectors/HeroesPageSelector';
import { initHeroesPage } from '../model/services/initHeroesPage';
import classes from './HeroesPage.module.scss';

interface HeroesPageProps {
    className?: string;
}

const reducer: ReducersList = {
    heroesPage: heroesPageReducers,
};

const HeroesPage = memo((props: HeroesPageProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const getAllHeroes = useSelector(getHeroes.selectAll);
    const isLoading = useSelector(getHeroesIsLoading);
    const error = useSelector(getHeroesError);

    useEffect(() => {
        dispatch(initHeroesPage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducer} removeAfterUnmount={false}>
            <Page className={classNames(classes.HeroesPage, {}, [className])}>
                <HeroesList
                    isLoading={isLoading}
                    heroes={getAllHeroes}
                />
            </Page>
        </DynamicModuleLoader>
    );
});

export default HeroesPage;

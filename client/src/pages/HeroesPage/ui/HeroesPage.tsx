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
import { AppLink } from 'shared/UI/AppLink';
import { Text, TextTheme } from 'shared/UI/Text/Text';
import { AppLinkTheme } from 'shared/UI/AppLink/ui/AppLink';
import { getHeroes, heroesPageReducers } from '../model/slice/HeroesPageSlice';
import { getHeroesError, getHeroesIsLoading } from '../model/selectors/HeroesPageSelector';
import { initHeroesPage } from '../model/services/initHeroesPage';

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
        document.title = 'Наш полк';
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducer}>
            <Page className={classNames('', {}, [className])}>
                {error && (
                    <Text
                        theme={TextTheme.ERROR}
                        title="Произошла ошибка"
                        text="при загрузке героев"
                    />
                )}
                {!error && (
                    <AppLink
                        style={{ marginBottom: 20 }}
                        to="/createHero"
                        theme={AppLinkTheme.OUTLINED_INVERTED}
                    >
                        Добавить героя
                    </AppLink>
                )}
                <HeroesList
                    isLoading={isLoading}
                    heroes={getAllHeroes}
                />
            </Page>
        </DynamicModuleLoader>
    );
});

export default HeroesPage;

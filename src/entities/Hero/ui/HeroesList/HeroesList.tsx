import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllHeroesData,
    getAllHeroesError,
    getAllHeroesIsLoading,
} from '../../model/selectors/HeroSelector';
import classes from './HeroesList.module.scss';
import { fetchAllHeroes } from '../../model/services/fetchAllHeroes';
import { HeroCard } from '../HeroCard/HeroCard';

interface HeroesListProps {
    className?: string;
}

export const HeroesList = memo((props: HeroesListProps) => {
    const {
        className,
    } = props;
    const dispatch = useDispatch();
    const heroesData = useSelector(getAllHeroesData);
    const heroesError = useSelector(getAllHeroesError);
    const heroesIsLoading = useSelector(getAllHeroesIsLoading);

    useEffect(() => {
        dispatch(fetchAllHeroes());
    }, [dispatch]);

    if (heroesIsLoading) {
        return (
            <div className={classNames(classes.HeroesList, {}, [className])}>
                <h2>Загрузка данных...</h2>
            </div>
        );
    }

    if (heroesError) {
        return (
            <div className={classNames(classes.HeroesList, {}, [className])}>
                <h2 style={{ color: 'red' }}>
                    Упс... Произошла ошибка:
                    <br />
                    {`${heroesError}`}
                </h2>
            </div>
        );
    }

    return (
        <div className={classNames(classes.HeroesList, {}, [className])}>
            {heroesData?.length
                ? heroesData?.map((hero) => (
                    <HeroCard
                        key={hero.id}
                        hero={hero}
                    />
                ))
                : <h2>Тут пока пусто...</h2>}
        </div>
    );
});

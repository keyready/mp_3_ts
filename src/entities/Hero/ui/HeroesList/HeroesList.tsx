import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeroesListSkeleton } from 'entities/Hero/ui/HeroesListSkeleton/HeroesListSkeleton';
import { getUserData } from 'entities/User';
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
    const logonUserData = useSelector(getUserData);

    useEffect(() => {
        dispatch(fetchAllHeroes());
    }, [dispatch]);

    if (heroesIsLoading) {
        return (
            <div className={classNames(classes.HeroesList, {}, [className])}>
                {
                    new Array(5)
                        .fill(0)
                        .map((item, index) => (
                            <HeroesListSkeleton
                                key={index}
                                className={classes.card}
                            />
                        ))
                }
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
                        user={logonUserData}
                        key={hero.id}
                        hero={hero}
                        isLoading={heroesIsLoading}
                    />
                ))
                : <h2>Тут пока пусто...</h2>}
        </div>
    );
});

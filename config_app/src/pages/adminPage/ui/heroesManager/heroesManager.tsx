import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchHeroes } from 'pages/adminPage/model/services/fetchHeroes';
import { useSelector } from 'react-redux';
import { getHeroes, heroesManagerReducers } from 'pages/adminPage/model/slice/heroesManagerSlice';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { Button } from 'shared/UI/Button';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';
import { deleteHero } from 'pages/adminPage/model/services/deleteHero';
import { Loader } from 'shared/UI/Loader';
import { getAdminPageHeroesIsLoading } from 'pages/adminPage/model/selectors/usersManagerSelector';
import classes from './heroesManager.module.scss';

interface heroesManagerProps {
    className?: string;
}

const reducers: ReducersList = {
    heroesManagerPage: heroesManagerReducers,
};

export const HeroesManager = memo((props: heroesManagerProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const heroes = useSelector(getHeroes.selectAll);
    const isLoading = useSelector(getAdminPageHeroesIsLoading);

    useEffect(() => {
        dispatch(fetchHeroes());
        // dispatch(fetchUserData())
    }, [dispatch]);

    const onDeleteHeroClick = useCallback((heroId) => {
        dispatch(deleteHero(heroId));
        location.reload();
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(classes.HeroesManager, {}, [className])}>
                <h2 className={classes.header}>СПИСОК ГЕРОЕВ</h2>
                {isLoading && (
                    <Loader />
                )}
                {heroes.map((hero) => (
                    <div
                        className={classes.heroCard}
                        key={hero.id}
                    >
                        <img
                            src={`/images/heroes/${hero?.photo}`}
                            alt={hero?.middlename}
                            className={classes.photo}
                        />
                        <div className={classes.names}>
                            <div className={classes.lastname}>{hero?.middlename}</div>
                            <span className={classes.name}>
                                {hero?.firstname}
                                {' '}
                                {hero?.lastname}
                            </span>
                        </div>
                        <h3
                            className={classNames(
                                classes.heroHost,
                                {
                                    [classes.banned]: hero.userId.isBanned,
                                    [classes.admin]: hero.userId.role === 'admin',
                                },
                            )}
                        >
                            {hero.userId?.email}
                        </h3>
                        <Button
                            theme={ButtonTheme.ERROR}
                            onClick={() => onDeleteHeroClick(hero.id)}
                        >
                            Удалить
                        </Button>
                    </div>
                ))}
            </div>
        </DynamicModuleLoader>
    );
});

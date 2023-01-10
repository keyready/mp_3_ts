import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
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

    return (
        <div className={classNames(classes.HeroesList, {}, [className])}>
            {heroesData?.map((hero) => (
                <HeroCard
                    key={hero.id}
                    hero={hero}
                />
            ))}
        </div>
    );
});

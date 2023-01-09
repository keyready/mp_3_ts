import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHeroes, getIsLoading } from '../../model/selectors/HeroSelector';
import { getAllHeroes } from '../../model/services/getAllHeroes';
import { HeroCard } from '../HeroCard/HeroCard';
import classes from './HeroList.module.scss';

interface HeroListProps {
    className?: string;
}

export const HeroList = memo((props: HeroListProps) => {
    const {
        className,
    } = props;
    const dispatch = useDispatch();
    const heroes = useSelector(getHeroes);
    const isLoading = useSelector(getIsLoading);

    useEffect(() => {
        dispatch(getAllHeroes());
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className={classNames(classes.HeroList, {}, [className])}>
                <h1>Загрузка данных...</h1>
            </div>
        );
    }

    return (
        <div className={classNames(classes.HeroList, {}, [className])}>
            {heroes && heroes.map((hero) => (
                <HeroCard
                    key={hero.id}
                    hero={hero}
                />
            ))}
        </div>
    );
});

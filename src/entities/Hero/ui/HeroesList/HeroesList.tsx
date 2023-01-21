import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Hero } from 'entities/Hero/model/types/Hero';
import { HeroCard, HeroCardSkeleton } from 'entities/Hero';
import classes from './HeroesList.module.scss';

interface HeroesListProps {
    className?: string;
    heroes?: Hero[];
    isLoading?: boolean;
}

export const HeroesList = memo((props: HeroesListProps) => {
    const {
        className,
        heroes,
        isLoading,
    } = props;

    function renderHero(hero: Hero) {
        return (
            <HeroCard
                key={hero.id}
                hero={hero}
            />
        );
    }

    const getSkeletons = () => new Array(5)
        .fill(0)
        .map((index) => (
            <HeroCardSkeleton key={index} />
        ));

    return (
        <div className={classNames(classes.HeroesList, {}, [className])}>
            {heroes?.length
                ? heroes.map(renderHero)
                : null}
            {isLoading && getSkeletons()}
        </div>
    );
});

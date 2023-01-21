import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Hero } from 'entities/Hero/model/types/Hero';
import { HeroCard } from 'entities/Hero';
import { AppLink } from 'shared/UI/AppLink';
import { AppLinkTheme } from 'shared/UI/AppLink/ui/AppLink';
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

    if (isLoading) {
        return (
            <h2>Загрузка</h2>
        );
    }

    return (
        <div className={classNames(
            classes.HeroesList,
            { [classes.emptyHeroes]: !heroes?.length },
            [className],
        )}
        >
            {heroes?.length
                ? heroes.map(renderHero)
                : (
                    <div>
                        <h2>Тут пока пусто ;( </h2>
                        <AppLink
                            style={{ marginTop: 20 }}
                            theme={AppLinkTheme.INVERTED}
                            to="/createHero"
                        >
                            Начнем писать историю?
                        </AppLink>
                    </div>
                )}
        </div>
    );
});

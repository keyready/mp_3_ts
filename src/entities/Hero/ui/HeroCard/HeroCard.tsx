import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Hero } from '../../model/types/Hero';
import classes from './HeroCard.module.scss';

interface HeroProps {
    className?: string;
    hero: Hero;
}

export const HeroCard = memo((props: HeroProps) => {
    const {
        className,
        hero,
    } = props;

    return (
        <div className={classNames(classes.Hero, {}, [className])}>
            <div className={classes.info}>
                <img
                    className={classes.heroPhoto}
                    src={`/images/heroes/${hero?.photo}`}
                    alt=""
                />
                <div className={classes.heroMainInfo}>
                    <p>{hero?.rank}</p>
                    <div className={classes.names}>
                        <h2>{hero?.middlename}</h2>
                        <h2>{hero?.firstname}</h2>
                        <h2>{hero?.lastname}</h2>
                    </div>
                </div>
            </div>
            <p className={classes.storyPart}>{hero?.story}</p>
        </div>
    );
});

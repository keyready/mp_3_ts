import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Hero } from '../../model/types/Hero';
import classes from './HeroCard.module.scss';

interface HeroCardProps {
    className?: string;
    hero?: Hero
}

export const HeroCard = memo((props: HeroCardProps) => {
    const { t } = useTranslation();
    const {
        className,
        hero,
    } = props;

    return (
        <div className={classNames(classes.HeroCard, {}, [className])}>
            <div className={classes.heroInfo}>
                <img
                    width={100}
                    src={`/static/images/heroes/${hero?.photo}`}
                    alt={`${hero?.firstname} ${hero?.lastname}`}
                />

                <div className={classes.heroMainInfo}>
                    <h3 className={classes.heroRank}>{hero?.rank}</h3>
                    <h1 className={classes.heroSurname}>{hero?.middlename}</h1>
                    <h3 className={classes.heroNames}>
                        {hero?.firstname}
                        {' '}
                        {hero?.lastname}
                    </h3>
                </div>
            </div>
            <p className={classes.heroStory}>
                {hero?.story}
            </p>
        </div>
    );
});

import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAwards, fetchAwardById, getAwards } from 'entities/Award';
import { Hero } from '../../model/types/Hero';
import classes from './HeroCard.module.scss';

interface HeroProps {
    className?: string;
    hero?: Hero;
}

export const HeroCard = memo((props: HeroProps) => {
    const {
        className,
        hero,
    } = props;
    const dispatch = useDispatch();
    const awards = useSelector(getAwards);

    useEffect(() => {
        dispatch(fetchAllAwards());
        console.log(hero);
    }, [dispatch]);

    return (
        <div className={classNames(classes.HeroCard, {}, [className])}>
            <div className={classes.heroMainInfoBlock}>
                <img
                    className={classes.hero_photo}
                    src={`/static/images/heroes/${hero?.photo}`}
                    alt={`${hero?.surname} ${hero?.name}`}
                />
                <div className={classes.heroInfo}>
                    <h4 className={classes.heroNames}>{hero?.rank}</h4>
                    <h2 className={classes.heroName}>{hero?.surname}</h2>
                    <h3 className={classes.heroNames}>
                        {hero?.name}
                        {' '}
                        {hero?.lastname}
                    </h3>
                    <div className={classes.heroNames}>{hero?.userId}</div>
                    <div className={classes.awards}>
                        {
                            hero?.awards?.forEach((award) => (
                                <img
                                    className={classes.medal}
                                    src={`/static/images/awards/${awards?.[award]?.image}`}
                                    alt=""
                                />
                            ))

                        }
                    </div>
                </div>
            </div>
            <div className={classes.HeroStory}>
                {hero?.story}
            </div>
        </div>
    );
});

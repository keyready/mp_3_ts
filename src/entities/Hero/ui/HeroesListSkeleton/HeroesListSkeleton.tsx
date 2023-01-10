import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import classes from './HeroesListSkeleton.module.scss';

interface HeroesListSkeletonProps {
    className?: string;
}

export const HeroesListSkeleton = memo((props: HeroesListSkeletonProps) => {
    const { t } = useTranslation();
    const {
        className,
    } = props;

    return (
        <div className={classNames(classes.HeroCard, {}, [className])}>
            <div className={classes.heroInfo}>
                <Skeleton width={100} height={125} rounded="20px" />

                <div className={classes.heroMainInfo}>
                    <Skeleton
                        className={classes.heroRank}
                        width={100}
                        height={20}
                        rounded="10px"
                    />
                    <Skeleton
                        className={classes.heroSurname}
                        width={100}
                        height={30}
                        rounded="10px"
                    />
                    <h3 className={classes.heroNames}>
                        <Skeleton width="50%" height={20} rounded="10px" />
                        <Skeleton width="50%" height={20} rounded="10px" />
                    </h3>
                </div>
            </div>
            <p className={classes.heroStory}>
                <Skeleton className={classes.heroRank} width="100%" height={300} rounded="10px" />
            </p>
        </div>
    );
});

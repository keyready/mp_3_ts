import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import classes from './HeroCardSkeleton.module.scss';

interface HeroCardSkeletonProps {
    className?: string;
}

export const HeroCardSkeleton = memo((props: HeroCardSkeletonProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(classes.HeroCardSkeleton, {}, [className])}>
            <div className={classes.info}>
                <Skeleton
                    width={100}
                    height={150}
                    border="20px"
                />
                <div className={classes.heroMainInfo}>
                    <Skeleton width="100%" height={20} border="7px" />
                    <div className={classes.names}>
                        <Skeleton width="100%" height={35} border="7px" />
                        <Skeleton width="100%" height={35} border="7px" />
                        <Skeleton width="100%" height={35} border="7px" />
                    </div>
                </div>
            </div>
            <Skeleton width="100%" height={50} border="7px" />
        </div>
    );
});

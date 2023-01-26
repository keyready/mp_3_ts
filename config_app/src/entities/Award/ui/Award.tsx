import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './Award.module.scss';

interface AwardProps {
    className?: string;
}

export const Award = memo((props: AwardProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(classes.Award, {}, [className])} />
    );
});

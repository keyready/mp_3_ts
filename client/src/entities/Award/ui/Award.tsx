import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';

interface AwardProps {
    className?: string;
}

export const Award = memo((props: AwardProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames('', {}, [className])} />
    );
});

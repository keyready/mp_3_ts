import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, memo, ReactNode } from 'react';
import classes from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string
    width: number | string;
    height: string | number;
    rounded?: string
    children?: ReactNode
}

export const Skeleton = memo((props: SkeletonProps) => {
    const {
        className,
        width,
        height,
        rounded,
        children,
    } = props;

    const styles: CSSProperties = {
        width,
        height,
        borderRadius: rounded,
    };

    return (
        <div
            className={classNames(classes.Skeleton, {}, [className])}
            style={styles}
        >
            {children}
        </div>
    );
});

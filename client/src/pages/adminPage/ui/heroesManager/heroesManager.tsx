import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo } from 'react';
import classes from './heroesManager.module.scss';

interface heroesManagerProps {
    className?: string;
}

export const heroesManager = memo((props: heroesManagerProps) => {
    const {
        className,
    } = props;

    return (
        <Page className={classNames(classes.heroesManager, {}, [className])}>
            <div />
        </Page>
    );
});

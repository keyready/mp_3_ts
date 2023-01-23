import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo } from 'react';
import classes from './heroesManager.module.scss';

interface awardsManagerProps {
    className?: string;
}

export const awardsManager = memo((props: awardsManagerProps) => {
    const {
        className,
    } = props;

    return (
        <Page className={classNames(classes.awardsManager, {}, [className])}>
            <div />
        </Page>
    );
});

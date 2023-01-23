import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo } from 'react';
import classes from './usersManager.module.scss';

interface usersManagerProps {
    className?: string;
}

const usersManager = memo((props: usersManagerProps) => {
    const {
        className,
    } = props;

    return (
        <Page className={classNames(classes.usersManager, {}, [className])}>
            <div />
        </Page>
    );
});

export default usersManager;

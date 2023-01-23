import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo } from 'react';
import classes from './ConfirmEmailPage.module.scss';

interface ConfirmEmailPageProps {
    className?: string;
}

const ConfirmEmailPage = memo((props: ConfirmEmailPageProps) => {
    const {
        className,
    } = props;

    return (
        <Page className={classNames(classes.ConfirmEmailPage, {}, [className])}>
            <div />
        </Page>
    );
});

export default ConfirmEmailPage;

import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo } from 'react';
import { Text, TextTheme } from 'shared/UI/Text/Text';
import classes from './ForbiddenPage.module.scss';

interface ForbiddenPageProps {
    className?: string;
}

const ForbiddenPage = memo((props: ForbiddenPageProps) => {
    const {
        className,
    } = props;

    return (
        <Page className={classNames(classes.ForbiddenPage, {}, [className])}>
            <Text title="403 Forbidden" theme={TextTheme.ERROR} />
        </Page>
    );
});

export default ForbiddenPage;

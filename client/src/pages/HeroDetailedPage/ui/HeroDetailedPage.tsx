import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import classes from './HeroDetailedPage.module.scss';

interface HeroDetailedPageProps {
    className?: string;
}

const HeroDetailedPage = memo((props: HeroDetailedPageProps) => {
    const {
        className,
    } = props;
    const { heroId } = useParams();

    return (
        <Page className={classNames(classes.HeroDetailedPage, {}, [className])} />
    );
});

export default HeroDetailedPage;

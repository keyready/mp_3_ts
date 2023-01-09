import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './AboutPage.module.scss';

interface AboutPageProps {
    className?: string;
}

const AboutPage = memo((props: AboutPageProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(classes.AboutPage, {}, [className])}>
            <h1>About Page</h1>
        </div>
    );
});

export default AboutPage;

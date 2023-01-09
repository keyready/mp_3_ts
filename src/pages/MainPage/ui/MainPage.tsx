import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import { HeroList } from 'entities/Hero';
import classes from './MainPage.module.scss';

interface MainPageProps {
    className?: string;
}

const MainPage = memo((props: MainPageProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(classes.MainPage, {}, [className])}>
            <HeroList />
        </div>
    );
});

export default MainPage;

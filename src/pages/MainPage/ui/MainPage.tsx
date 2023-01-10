import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import { HeroesList } from 'entities/Hero';

interface MainPageProps {
    className?: string;
}

const MainPage = memo((props: MainPageProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames('', {}, [className])}>
            <HeroesList />
        </div>
    );
});

export default MainPage;

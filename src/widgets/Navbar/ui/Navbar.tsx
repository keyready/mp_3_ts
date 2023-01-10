import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(classes.Navbar, {}, [className])}>
            <Link
                to="/"
            >
                На главную
            </Link>
            <Link
                to="/addHero"
            >
                Добавить героя
            </Link>
        </div>
    );
});

import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIsUserInited } from 'entities/User/model/selector/UserSelector';
import { Button } from 'shared/UI/Button/Button';
import { UserActions } from 'entities/User';
import classes from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const {
        className,
    } = props;
    const dispatch = useDispatch();
    const inited = useSelector(getIsUserInited);

    const onExitClick = useCallback(() => {
        dispatch(UserActions.logout());
    }, [dispatch]);

    return (
        <div className={classNames(classes.Navbar, {}, [className])}>
            <Link
                to="/"
            >
                На главную
            </Link>
            {inited
                ? (
                    <div>
                        <Button
                            onClick={onExitClick}
                            style={{ marginRight: 10 }}
                        >
                            Выйти
                        </Button>
                        <Link
                            style={{ marginRight: 10 }}
                            to="/addHero"
                        >
                            Добавить героя
                        </Link>
                        <Link
                            style={{ marginRight: 10 }}
                            to="/admin"
                        >
                            Админ панель
                        </Link>
                        <Link
                            to="/profile"
                        >
                            Мой профиль
                        </Link>
                    </div>
                )
                : (
                    <Link
                        to="/login"
                    >
                        Войти
                    </Link>
                )}
        </div>
    );
});

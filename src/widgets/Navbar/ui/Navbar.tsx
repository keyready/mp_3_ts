import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/UI/Button';
import { memo, useCallback, useState } from 'react';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';
import { LoginModal } from 'features/AuthByEmail';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const userData = useSelector(getUserAuthData);
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsModalVisible(false);
    }, []);
    const onLogin = useCallback(() => {
        setIsModalVisible(true);
    }, []);
    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (userData?.id) {
        return (
            <div className={classNames(classes.Navbar, {}, [className])}>
                <Button
                    onClick={onLogout}
                    theme={ButtonTheme.PRIMARY}
                >
                    Выйти
                </Button>
            </div>
        );
    }

    return (
        <div className={classNames(classes.Navbar, {}, [className])}>

            <Button
                onClick={onLogin}
                theme={ButtonTheme.PRIMARY}
            >
                Войти
            </Button>
            {isModalVisible && <LoginModal isOpen={isModalVisible} onClose={onCloseModal} />}
        </div>
    );
});

import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/UI/Button';
import { memo, useCallback, useState } from 'react';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';
import { LoginModal } from 'features/AuthByEmail';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { getUserToken } from 'entities/User/model/selectors/getUserAuthData/getUserAuthData';
import { useNavigate } from 'react-router-dom';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const userData = useSelector(getUserAuthData);
    const token = useSelector(getUserToken);
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    const onCloseModal = useCallback(() => {
        setIsModalVisible(false);
    }, []);
    const onLogin = useCallback(() => {
        setIsModalVisible(true);
    }, []);
    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
        navigate('/');
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }, [dispatch, navigate]);
    const onAdminPageLinkClick = useCallback(() => {
        navigate('/admin/page');
    }, [navigate]);

    if (token) {
        return (
            <div className={classNames(classes.Navbar, {}, [className])}>
                <Button
                    onClick={onAdminPageLinkClick}
                    theme={ButtonTheme.OUTLINED}
                >
                    Петух-панель
                </Button>
                <Button
                    onClick={onLogout}
                    theme={ButtonTheme.ERROR}
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

import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { LoginForm } from 'entities/User/ui/LoginForm/LoginForm';
import { Link } from 'react-router-dom';
import classes from './LoginPage.module.scss';

interface LoginPageProps {
    className?: string;
}

const LoginPage = memo((props: LoginPageProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(classes.LoginPage, {}, [className])}>
            <h2>Авторизация</h2>
            <LoginForm />
            <Link to="/register">Нет аккаунта?</Link>
        </div>
    );
});

export default LoginPage;

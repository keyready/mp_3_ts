import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { RegisterForm } from 'entities/User/ui/RegisterForm/RegisterForm';
import { Link } from 'react-router-dom';
import classes from './RegisterPage.module.scss';

interface RegisterPageProps {
    className?: string;
}

const RegisterPage = memo((props: RegisterPageProps) => {
    const { t } = useTranslation();
    const {
        className,
    } = props;

    return (
        <div className={classNames(classes.RegisterPage, {}, [className])}>
            <h2>Регистрация</h2>
            <RegisterForm />
            <Link to="/login">Уже зарегистрированы?</Link>
        </div>
    );
});

export default RegisterPage;

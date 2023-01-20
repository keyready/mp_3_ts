import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { Input } from 'shared/UI/Input';
import { Button } from 'shared/UI/Button';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import {
    getLoginPassword,
    getLoginRepeatedPassword,
} from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { loginActions } from '../../model/slices/loginSlice';
import { registerByEmail } from '../../model/services/registerByEmail/registerByEmail';
import classes from './RegisterForm.module.scss';

export interface RegisterFormProps {
    className?: string;
    onSuccess?: () => void;
}

const RegisterForm = memo((props: RegisterFormProps) => {
    const {
        className,
        onSuccess,
    } = props;
    const [successMessage, setSuccessMessage] = useState<string>('');
    const dispatch = useAppDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const repeatedPassword = useSelector(getLoginRepeatedPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);

    const onUsernameChange = useCallback((value: string) => {
        dispatch(loginActions.setError(''));
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);
    const onPasswordChange = useCallback((value: string) => {
        dispatch(loginActions.setError(''));
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);
    const onRepPasswordChange = useCallback((value: string) => {
        dispatch(loginActions.setError(''));
        dispatch(loginActions.setRepPassword(value));
    }, [dispatch]);
    const onRegisterClick = useCallback(async (e) => {
        e.preventDefault();

        if (!password || !username || !repeatedPassword) {
            dispatch(loginActions.setError('Все поля обязательны для заполнения'));
            return;
        }

        if (password !== repeatedPassword) {
            dispatch(loginActions.setError('Введенные пароли не совпадают'));
            return;
        }

        if (!username.match('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')) {
            dispatch(loginActions.setError('Вы ввели неверный email'));
            return;
        }

        const result = await dispatch(registerByEmail({ email: username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            setSuccessMessage('Регистрация прошла успешно!');
        }
    }, [dispatch, password, repeatedPassword, username]);

    return (
        <form className={classNames(classes.RegisterForm, {}, [className])}>
            {error && <p className={classes.loginError}>{error}</p>}
            {successMessage && <p className={classes.registerSuccess}>{successMessage}</p>}
            <Input
                autoFocus
                placeholder="Введите email"
                value={username}
                onChange={onUsernameChange}
                type="text"
                required
            />
            <Input
                placeholder="Введите пароль"
                value={password}
                onChange={onPasswordChange}
                type="password"
                required
            />
            <Input
                placeholder="Подтвердите пароль"
                value={repeatedPassword}
                onChange={onRepPasswordChange}
                type="password"
                required
            />
            <Button
                theme={ButtonTheme.OUTLINED}
                className={classes.loginBtn}
                onClick={onRegisterClick}
                disabled={isLoading}
                type="submit"
            >
                Войти
            </Button>
        </form>
    );
});

export default RegisterForm;

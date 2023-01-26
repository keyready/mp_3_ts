import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Input } from 'shared/UI/Input';
import { Button } from 'shared/UI/Button';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
    getLoginUsername,
} from '../../model/selectors/selectors/getLoginUsername';
import {
    getLoginPassword,
} from '../../model/selectors/selectors/getLoginPassword';
import {
    getLoginIsLoading,
} from '../../model/selectors/selectors/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/selectors/getLoginError';
import { loginActions } from '../../model/slices/loginSlice';
import { loginByEmail } from '../../model/services/loginByEmail/loginByEmail';
import classes from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
    onSuccess?: () => void
}

const LoginForm = memo((props: LoginFormProps) => {
    const {
        className,
        onSuccess,
    } = props;
    const dispatch = useAppDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const onUsernameChange = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);
    const onPasswordChange = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(async (e) => {
        e.preventDefault();

        if (!password || !username) {
            dispatch(loginActions.setError('Все поля обязательны для заполнения'));
            return;
        }

        if (!username.match('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')) {
            dispatch(loginActions.setError('Вы ввели неверный email'));
            return;
        }

        const result = await dispatch(loginByEmail({ email: username, password }));
        console.log(result);
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess?.();
        }
    }, [dispatch, onSuccess, password, username]);

    return (
        <form
            className={classNames(classes.LoginForm, {}, [className])}
        >
            {error && <p className={classes.loginError}>{error}</p>}
            <Input
                autoFocus
                placeholder="Введите email"
                value={username}
                onChange={onUsernameChange}
                type="text"
            />
            <Input
                placeholder="Введите пароль"
                value={password}
                onChange={onPasswordChange}
                type="password"
            />
            <Button
                theme={ButtonTheme.OUTLINED}
                className={classes.loginBtn}
                onClick={onLoginClick}
                disabled={isLoading}
                type="submit"
            >
                Войти
            </Button>
        </form>
    );
});

export default LoginForm;

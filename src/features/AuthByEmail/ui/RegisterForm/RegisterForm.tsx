import { classNames } from 'shared/lib/classNames/classNames';
import {
    ChangeEvent,
    FormEvent, memo, useCallback, useState,
} from 'react';
import { Input } from 'shared/UI/Input';
import { Button } from 'shared/UI/Button';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { InputFile } from 'shared/UI/InputFile/InputFile';
import { profileSlice } from 'entities/Profile/model/slice/profileSlice';
import axios from 'axios';
import {
    getLoginPassword,
    getLoginRepeatedPassword,
    getLoginError,
    getLoginIsLoading,
    getLoginUsername,
    getRegisterFirstname,
    getRegisterMiddlename,
    getRegisterLastname,
} from '../../model/selectors';
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
    const firstname = useSelector(getRegisterFirstname);
    const lastname = useSelector(getRegisterLastname);
    const middlename = useSelector(getRegisterMiddlename);
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const repeatedPassword = useSelector(getLoginRepeatedPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);
    const [file, setFile] = useState<FileList>();

    const onLastnameChange = useCallback((value: string) => {
        dispatch(loginActions.setError(''));
        dispatch(loginActions.setLastname(value));
    }, [dispatch]);
    const onMiddlenameChange = useCallback((value: string) => {
        dispatch(loginActions.setError(''));
        dispatch(loginActions.setMiddlename(value));
    }, [dispatch]);
    const onFirstnameChange = useCallback((value: string) => {
        dispatch(loginActions.setError(''));
        dispatch(loginActions.setFirstname(value));
    }, [dispatch]);
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

    const onRegisterClick = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!password
            || !username
            || !repeatedPassword
            || !firstname
            || !lastname
            || !middlename
        ) {
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

        // @ts-ignore
        const formData = new FormData(e.target.form);
        // formData.append('photo', file);

        const result = await dispatch(registerByEmail(formData));

        if (result.meta.requestStatus === 'fulfilled') {
            setSuccessMessage('Регистрация прошла успешно!');
        }
    }, [dispatch, firstname, lastname, middlename, password, repeatedPassword, username]);

    const onFileUpload = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        axios
            .post('http://localhost:9999/create', formData, {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            })
            .then((res) => {
                console.log(`Success${res.data}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <form
            onSubmit={(e) => onFileUpload(e)}
            encType="multipart/form-data"
            className={classNames(classes.RegisterForm, {}, [className])}
        >
            {error && <p className={classes.loginError}>{error}</p>}
            {successMessage && <p className={classes.registerSuccess}>{successMessage}</p>}
            <Input
                autoFocus
                placeholder="Введите Вашу фамилию"
                value={middlename}
                onChange={onMiddlenameChange}
                type="text"
                name="middlename"
                required
            />
            <Input
                placeholder="Введите Ваше имя"
                value={firstname}
                onChange={onFirstnameChange}
                type="text"
                name="firstname"
                required
            />
            <Input
                placeholder="Введите Ваше отчество"
                value={lastname}
                onChange={onLastnameChange}
                type="text"
                name="lastname"
                required
            />
            <Input
                placeholder="Введите email"
                value={username}
                onChange={onUsernameChange}
                type="text"
                name="email"
                required
            />
            <Input
                placeholder="Введите пароль"
                value={password}
                onChange={onPasswordChange}
                type="password"
                name="password"
                required
            />
            <Input
                placeholder="Подтвердите пароль"
                value={repeatedPassword}
                onChange={onRepPasswordChange}
                type="password"
                required
            />
            <InputFile
                type="file"
                name="photo"
                message="Ваша фотография"
                // onChange={onFileUpload}
            />
            <Button
                theme={ButtonTheme.OUTLINED}
                className={classes.loginBtn}
                disabled={isLoading}
                type="submit"
            >
                Войти
            </Button>
        </form>
    );
});

export default RegisterForm;

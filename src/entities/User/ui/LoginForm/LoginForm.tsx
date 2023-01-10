import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, memo, useState } from 'react';
import { Input } from 'shared/UI/Input/Input';
import { Button } from 'shared/UI/Button/Button';
import { useDispatch } from 'react-redux';
import { loginByEmail } from 'entities/User';
import classes from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo((props: LoginFormProps) => {
    const {
        className,
    } = props;
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({ email: '', password: '' });

    function submitLoginHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        console.log(userData);
        dispatch(loginByEmail(userData));
    }

    return (
        <form
            onSubmit={(e) => submitLoginHandler(e)}
            className={classNames(classes.LoginForm, {}, [className])}
        >
            <Input
                placeholder="email"
                name="email"
                onChange={(e) => setUserData({ ...userData, email: e as string })}
            />
            <Input
                placeholder="password"
                name="password"
                type="password"
                onChange={(e) => setUserData({ ...userData, password: e as string })}
            />
            <Button type="submit">Войти</Button>
        </form>
    );
});

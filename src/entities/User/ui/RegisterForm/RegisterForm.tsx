import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, memo } from 'react';
import { Input } from 'shared/UI/Input/Input';
import { InputFile } from 'shared/UI/InputFile/InputFile';
import { Button } from 'shared/UI/Button/Button';
import { useDispatch } from 'react-redux';
import { registerUserByEmail } from 'entities/User';
import classes from './RegisterForm.module.scss';

interface RegisterFormProps {
    className?: string;
}

export const RegisterForm = memo((props: RegisterFormProps) => {
    const {
        className,
    } = props;
    const dispatch = useDispatch();

    function submitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        // @ts-ignore
        dispatch(registerUserByEmail(formData));
    }

    return (
        <form
            className={classNames(classes.RegisterForm, {}, [className])}
            encType="multipart/formdata"
            onSubmit={(e) => submitHandler(e)}
        >
            <Input
                name="firstname"
                placeholder="Имя"
                required
            />
            <Input
                name="middlename"
                placeholder="Фамилия"
                required
            />
            <Input
                name="lastname"
                placeholder="Отчество"
                required
            />
            <Input
                name="email"
                placeholder="EMAIL"
                required
                pattern="^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$"
            />
            <Input
                name="password"
                placeholder="Пароль"
                type="password"
                required
            />
            <InputFile
                name="photo"
                message="Ваше фото"
                required
            />
            <Button
                type="submit"
            >
                Зарегистрироваться
            </Button>
        </form>
    );
});

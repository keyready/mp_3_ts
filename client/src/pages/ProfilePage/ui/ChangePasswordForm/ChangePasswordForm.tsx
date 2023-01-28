import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, MouseEvent, useCallback, useState,
} from 'react';
import { Input } from 'shared/UI/Input';
import { Button } from 'shared/UI/Button';
import { Text, TextTheme } from 'shared/UI/Text/Text';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { changePassword } from 'pages/ProfilePage/model/service/changePassword';
import classes from './ChangePasswordForm.module.scss';

interface ChangePasswordFormProps {
    className?: string;
}

export const ChangePasswordForm = memo((props: ChangePasswordFormProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [repeatNewPassword, setRepeatNewPassword] = useState<string>('');
    const [resultMessage, setResultMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);

    const onNewPassChangeHandler = useCallback((value: string) => {
        setIsError(false);
        setResultMessage('');
        setNewPassword(value);
    }, []);

    const onOldPassChangeHandler = useCallback((value: string) => {
        setIsError(false);
        setResultMessage('');
        setOldPassword(value);
    }, []);

    const onRepNewPassChangeHandler = useCallback((value: string) => {
        setIsError(false);
        setResultMessage('');
        setRepeatNewPassword(value);
    }, []);

    const onClickPassSubmit = useCallback(async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (newPassword !== repeatNewPassword) {
            setResultMessage('Введенные пароли не совпадают');
            setIsError(true);
            return;
        }

        const result = await dispatch(changePassword({
            oldPassword,
            newPassword,
        }));

        if (result.meta.requestStatus === 'fulfilled') {
            setResultMessage('Пароль успешно изменен');
            setIsError(false);
        } else {
            setResultMessage('Неверный старый пароль');
            setIsError(true);
        }
    }, [dispatch, newPassword, oldPassword, repeatNewPassword]);

    return (
        <form
            className={classNames(classes.ChangePasswordForm, {}, [className])}
        >
            <Text
                text={resultMessage}
                theme={isError ? TextTheme.ERROR : TextTheme.PRIMARY}
            />
            <Input
                autoFocus
                placeholder="Введите старый пароль"
                onChange={onOldPassChangeHandler}
                value={oldPassword}
            />
            <Input
                autoFocus
                placeholder="Введите новый пароль"
                value={newPassword}
                onChange={onNewPassChangeHandler}
            />
            <Input
                autoFocus
                placeholder="Подтвердите новый пароль"
                value={repeatNewPassword}
                onChange={onRepNewPassChangeHandler}
            />
            <Button
                className={classes.button}
                onClick={onClickPassSubmit}
                theme={isError ? ButtonTheme.ERROR : ButtonTheme.SUCCESS}
            >
                Сменить пароль
            </Button>
        </form>
    );
});

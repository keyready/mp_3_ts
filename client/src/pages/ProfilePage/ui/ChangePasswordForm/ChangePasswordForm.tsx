import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, MouseEvent, useCallback, useState,
} from 'react';
import { Input } from 'shared/UI/Input';
import { Button } from 'shared/UI/Button';
import { Text, TextTheme } from 'shared/UI/Text/Text';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';
import classes from './ChangePasswordForm.module.scss';

interface ChangePasswordFormProps {
    className?: string;
}

export const ChangePasswordForm = memo((props: ChangePasswordFormProps) => {
    const {
        className,
    } = props;
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [repeatNewPassword, setRepeatNewPassword] = useState<string>('');
    const [resultMessage, setResultMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);

    const onClickPassSubmit = useCallback((event: MouseEvent<HTMLButtonElement>) => {

    }, []);

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
                value={oldPassword}
                onChange={setOldPassword}
            />
            <Input
                autoFocus
                placeholder="Введите новый пароль"
                value={newPassword}
                onChange={setNewPassword}
            />
            <Input
                autoFocus
                placeholder="Подтвердите новый пароль"
                value={repeatNewPassword}
                onChange={setRepeatNewPassword}
            />
            <Button
                onClick={onClickPassSubmit}
                theme={isError ? ButtonTheme.ERROR : ButtonTheme.SUCCESS}
            >
                Сменить пароль
            </Button>
        </form>
    );
});

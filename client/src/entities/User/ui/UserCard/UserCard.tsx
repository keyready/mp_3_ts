import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, MouseEvent, useCallback, useMemo, useState,
} from 'react';
import { Select } from 'shared/UI/Select/Select';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { banUserById, changeUserRole, unBanUserById } from 'entities/User';
import { Button } from 'shared/UI/Button';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';
import { TextArea } from 'shared/UI/TextArea/TextArea';
import { Text, TextAlign, TextTheme } from 'shared/UI/Text/Text';
import { User } from '../../model/types/User';
import classes from './UserCard.module.scss';

interface UserCardProps {
    className?: string;
    user: User
}

export const UserCard = memo((props: UserCardProps) => {
    const {
        className,
        user,
    } = props;
    const dispatch = useAppDispatch();
    const [isBanReasonTextVisible, setIsBanReasonTextVisible] = useState<boolean>(false);
    const [banReasonText, setBanReasonText] = useState<string>('');
    const roles = useMemo(() => [
        { value: 'user', content: 'Юзер' },
        { value: 'admin', content: 'Петух' },
    ], []);

    const changeRoleHandler = useCallback((newRole: string, userId?: number) => {
        const newRoleSender = { newRole, id: userId };
        dispatch(changeUserRole(newRoleSender));
    }, [dispatch]);

    const onUserBanHandler = useCallback((userId?: number) => {
        setIsBanReasonTextVisible(true);
        if (isBanReasonTextVisible) {
            dispatch(banUserById({ userId, banReason: banReasonText }));
        }
    }, [banReasonText, dispatch, isBanReasonTextVisible]);

    const onUserUnBanHandler = useCallback((
        event: MouseEvent<HTMLButtonElement>,
        userId?: number,
    ) => {
        dispatch(unBanUserById({ id: userId }));
    }, [dispatch]);

    const onBanReasonChangeHandler = useCallback((banReason) => {
        setBanReasonText(banReason);
    }, []);

    return (
        <div className={classNames(classes.UserCard, {
            [classes.isBanned]: user?.isBanned,
        }, [className])}
        >
            <img
                src={`/images/users/${user?.photo}`}
                alt={user?.middlename}
                className={classes.photo}
            />
            <div className={classes.names}>
                <div className={classes.lastname}>{user?.middlename}</div>
                <span className={classes.name}>
                    {user?.firstname}
                    {' '}
                    {user?.lastname}
                </span>
            </div>
            <Select
                value={user?.role}
                onChange={(newRole) => changeRoleHandler(newRole, user.id)}
                option={roles}
                label="Роль"
            />
            {user?.isBanned && (
                <Text
                    text={user.banReason}
                    theme={TextTheme.ERROR}
                    align={TextAlign.CENTER}
                />
            )}
            {user?.isBanned
                ? (
                    <Button
                        theme={ButtonTheme.SUCCESS}
                        onClick={(e) => onUserUnBanHandler(e, user!.id)}
                    >
                        Разбанить
                    </Button>
                )
                : (
                    <div>
                        <Button
                            theme={ButtonTheme.ERROR}
                            onClick={() => onUserBanHandler(user?.id)}
                        >
                            Забанить
                        </Button>
                        {isBanReasonTextVisible && (
                            <TextArea
                                placeholder="Причина бана"
                                onChange={(value) => onBanReasonChangeHandler(value)}
                            />
                        )}
                    </div>
                )}
        </div>
    );
});

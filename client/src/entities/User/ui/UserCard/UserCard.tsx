import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, MouseEvent, useCallback, useMemo,
} from 'react';
import { Select } from 'shared/UI/Select/Select';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { banUserById, changeUserRole, unBanUserById } from 'entities/User';
import { Button } from 'shared/UI/Button';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';
import { fetchUsers } from 'pages/adminPage/model/services/fetchUsers';
import { User } from '../../model/types/User';
import classes from './UserCard.module.scss';

interface UserCardProps {
    className?: string;
    user?: User
}

export const UserCard = memo((props: UserCardProps) => {
    const {
        className,
        user,
    } = props;
    const dispatch = useAppDispatch();
    const roles = useMemo(() => [
        { value: 'user', content: 'Юзер' },
        { value: 'admin', content: 'Петух' },
    ], []);

    const changeRoleHandler = useCallback((newRole: string, userId: number) => {
        const newRoleSender = { newRole, id: userId };
        dispatch(changeUserRole(newRoleSender));
    }, [dispatch]);

    const onUserBanHandler = useCallback((event: MouseEvent<HTMLButtonElement>, userId: number) => {
        dispatch(banUserById(userId));
        dispatch(fetchUsers());
    }, [dispatch]);
    const onUserUnBanHandler = useCallback((
        event: MouseEvent<HTMLButtonElement>,
        userId: number,
    ) => {
        dispatch(unBanUserById(userId));
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div className={classNames(classes.UserCard, {}, [className])}>
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
                onChange={(newRole) => changeRoleHandler(newRole, user!.id)}
                option={roles}
                label="Роль"
            />
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
                    <Button
                        theme={ButtonTheme.ERROR}
                        onClick={(e) => onUserBanHandler(e, user!.id)}
                    >
                        Забанить
                    </Button>
                )}
        </div>
    );
});

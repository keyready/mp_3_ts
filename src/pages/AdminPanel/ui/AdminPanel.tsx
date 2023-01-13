import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllUsers, getAllUsersError, getAllUsersIsLoading, User,
} from 'entities/User';
import { getAllUsers } from 'entities/User/model/selector/UserSelector';
import { Button } from 'shared/UI/Button/Button';
import classes from './AdminPanel.module.scss';

interface AdminPanelProps {
    className?: string;
}

const AdminPanel = memo((props: AdminPanelProps) => {
    const {
        className,
    } = props;
    const dispatch = useDispatch();
    const allUsersData = useSelector(getAllUsers);
    const allUsersIsLoading = useSelector(getAllUsersIsLoading);
    const allUsersError = useSelector(getAllUsersError);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    if (allUsersIsLoading) {
        return (
            <div className={classNames('', {}, [className])}>
                <h2>Loading users...</h2>
            </div>
        );
    }

    function userBan(user: User) {
        const newUserData: User = {
            ...user,
            banned: !user.banned,
        };
        fetch(`http://localhost:8000/users/${user.id}`, {
            body: JSON.stringify(newUserData),
            method: 'put',
            headers: {
                authorization: 'super-secret-token',
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then(() => {
                document.location.reload();
            });
    }

    const onSelectChange = (user: User, newRole: string) => {
        const newUserData: User = {
            ...user,
            role: newRole,
        };
        console.log('sent data', newUserData);
        fetch(`http://localhost:8000/users/${user.id}`, {
            body: JSON.stringify(newUserData),
            method: 'put',
            headers: {
                authorization: 'super-secret-token',
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then(() => {
                document.location.reload();
            });
    };

    return (
        <div className={classNames('', {}, [className])}>
            <div className={classes.usersList}>
                {allUsersData?.length
                    ? allUsersData?.map((user) => (
                        <div
                            className={classes.userRow}
                            key={user.id}
                        >
                            <h3 className={classes.userId}>{user.id}</h3>
                            <img
                                className={classes.userPhoto}
                                // src={`/images/users/${user.photo}`}
                                src="https://via.placeholder.com/50"
                                alt={user.middlename}
                            />
                            <div className={classes.names}>
                                <h3>{user.middlename}</h3>
                                <p>
                                    {user.firstname}
                                    {' '}
                                    {user.lastname}
                                </p>
                            </div>
                            <p className={classes.email}>{user.email}</p>
                            <select
                                name="userRole"
                                value={user.role}
                                onChange={(e) => onSelectChange(user, e.target.value)}
                            >
                                <option value="admin">Админ</option>
                                <option value="user">Юзер</option>
                            </select>
                            <Button
                                onClick={() => userBan(user)}
                                style={{ justifySelf: 'center', fontSize: '14px' }}
                            >
                                {user.banned ? 'Разбанить' : 'Забанить'}
                            </Button>
                        </div>
                    ))
                    : <h2>Пользователей нет... ;(</h2>}
            </div>
        </div>
    );
});

export default AdminPanel;

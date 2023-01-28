import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { getUsers, usersManagerReducers } from 'pages/adminPage/model/slice/usersManagerSlice';
import { UserCard } from 'entities/User/ui/UserCard/UserCard';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { fetchUsers } from 'pages/adminPage/model/services/fetchUsers';
import { Loader } from 'shared/UI/Loader';
import {
    getUsersAdminPageError,
    getUsersAdminPageIsLoading,
} from '../../model/selectors/usersManagerSelector';
import classes from './usersManager.module.scss';

interface usersManagerProps {
    className?: string;
}

const reducers: ReducersList = {
    usersManagerPage: usersManagerReducers,
};

export const UsersManager = memo((props: usersManagerProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const users = useSelector(getUsers.selectAll);
    const usersError = useSelector(getUsersAdminPageError);
    const usersIsLoading = useSelector(getUsersAdminPageIsLoading);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(classes.UsersManager, {}, [className])}>
                <h2 className={classes.header}>СПИСОК ПОЛЬЗОВАТЕЛЕЙ</h2>
                {usersIsLoading && (
                    <Loader />
                )}
                {users.map((user) => (
                    <UserCard user={user} />
                ))}
            </div>
        </DynamicModuleLoader>
    );
});

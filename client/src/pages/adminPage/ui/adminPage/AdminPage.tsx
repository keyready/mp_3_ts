import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUsers, usersManagerReducers } from 'pages/adminPage/model/slice/usersManagerSlice';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { fetchUsers } from 'pages/adminPage/model/services/fetchUsers';
import { UserCard } from 'entities/User/ui/UserCard/UserCard';
import classes from './AdminPage.module.scss';
import {
    getUsersAdminPageError,
    getUsersAdminPageIsLoading,
} from '../../model/selectors/usersManagerSelector';

interface AdminPageProps {
    className?: string;
}

const reducers: ReducersList = {
    usersManagerPage: usersManagerReducers,
};

const AdminPage = memo((props: AdminPageProps) => {
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
            <Page className={classNames(classes.AdminPage, {}, [className])}>
                {users.map((user) => (
                    <UserCard user={user} />
                ))}
            </Page>
        </DynamicModuleLoader>
    );
});

export default AdminPage;

import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import classes from './AdminPage.module.scss';
import {
    getUsersAdminPageError,
    getUsersAdminPageIsLoading,
    getUsersAdminPageUsers,
} from '../../model/selectors/usersManagerSelector';

interface AdminPageProps {
    className?: string;
}

const AdminPage = memo((props: AdminPageProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const users = useSelector(getUsersAdminPageUsers);
    const usersError = useSelector(getUsersAdminPageError);
    const usersIsLoading = useSelector(getUsersAdminPageIsLoading);

    return (
        <Page className={classNames(classes.AdminPage, {}, [className])}>
            {users?.map((user) => (
                <div
                    key={user.id}
                    style={{
                        display: 'flex',
                        gap: '10px',
                        flexDirection: 'column',
                    }}
                >
                    <h2>{user.email}</h2>
                    <h2>{user.middlename}</h2>
                    <h2>{user.firstname}</h2>
                </div>
            ))}
        </Page>
    );
});

export default AdminPage;

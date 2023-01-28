import { Page } from 'widgets/Page/Page';
import { memo, useEffect } from 'react';
import { UsersManager } from 'pages/adminPage/ui/usersManager/UsersManager';
import { HeroesManager } from 'pages/adminPage/ui/HeroesManager/HeroesManager';
import { AwardsManager } from 'pages/adminPage/ui/awardsManager/AwardsManager/AwardsManager';
import { HDisclosure } from 'shared/UI/HDisclosure/HDisclosure';
import classes from './AdminPage.module.scss';

interface AdminPageProps {
    className?: string;
}

const AdminPage = memo((props: AdminPageProps) => {
    const {
        className,
    } = props;

    useEffect(() => {
        document.title = 'Петух-панель';
    }, []);

    return (
        <Page className={classes.AdminPage}>
            <h2 className={classes.header}>ПЕТУХ-ПАНЕЛЬ</h2>
            <HDisclosure
                content={[
                    {
                        title: 'ИГРОКИ',
                        content: <UsersManager />,
                    },
                    {
                        title: 'ГЕРОИ',
                        content: <HeroesManager />,
                    },
                    {
                        title: 'АЧИВКИ',
                        content: <AwardsManager />,
                    },
                ]}
            />
        </Page>
    );
});

export default AdminPage;

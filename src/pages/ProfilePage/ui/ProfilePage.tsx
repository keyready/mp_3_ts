import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Profile } from 'entities/User';
import classes from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo((props: ProfilePageProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(classes.ProfilePage, {}, [className])}>
            <Profile />
        </div>
    );
});

export default ProfilePage;

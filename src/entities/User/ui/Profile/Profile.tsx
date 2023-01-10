import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from 'entities/User/model/selector/UserSelector';
import classes from './Profile.module.scss';

interface ProfileProps {
    className?: string;
}

export const Profile = memo((props: ProfileProps) => {
    const {
        className,
    } = props;
    const userData = useSelector(getUserData);

    return (
        <div className={classNames(classes.Profile, {}, [className])}>
            <h2>Ваш профиль</h2>
            {userData && (
                <div className={classes.profileInfo}>
                    <img
                        className={classes.profilePhoto}
                        src={`/images/users/${userData.photo}`}
                        alt={`${userData.middlename} ${userData.firstname} ${userData.lastname}`}
                    />
                    <div className={classes.usersNames}>
                        <h2 className={classes.middleName}>{userData.middlename}</h2>
                        <h2 className={classes.names}>
                            {userData.firstname}
                            {' '}
                            {userData.lastname}
                        </h2>
                        <a href={`mailto:${userData.email}`}>email</a>
                    </div>
                </div>
            )}
        </div>
    );
});

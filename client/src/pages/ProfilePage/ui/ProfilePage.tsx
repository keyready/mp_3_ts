import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useCallback, useEffect } from 'react';
import {
    fetchProfileData,
    getProfileData,
    getProfileError,
    getProfileIsLoading,
    getProfileReadonly,
    profileActions,
    ProfileCard,
    profileReducer,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { Button } from 'shared/UI/Button';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';

interface ProfilePageProps {
    className?: string;
}

const reducers: ReducersList = {
    profile: profileReducer,
};

const ProfilePage = memo((props: ProfilePageProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const profileData = useSelector(getProfileData);
    const profileIsLoading = useSelector(getProfileIsLoading);
    const profileError = useSelector(getProfileError);
    const profileReadonly = useSelector(getProfileReadonly);

    useEffect(() => {
        document.title = 'Профиль';
        dispatch(fetchProfileData());
    }, [dispatch]);

    const onChangeFirstname = useCallback((value: string) => {
        dispatch(profileActions.changeFirstname(value));
    }, [dispatch]);
    const onChangeLastname = useCallback((value: string) => {
        dispatch(profileActions.changeLastname(value));
    }, [dispatch]);
    const onChangeMiddlename = useCallback((value: string) => {
        dispatch(profileActions.changeMiddlename(value));
    }, [dispatch]);

    const onEditButtonClick = () => {
        dispatch(profileActions.setReadonly(!profileReadonly));
    };

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames('', {}, [className])}>
                <Button
                    theme={profileReadonly ? ButtonTheme.SUCCESS : ButtonTheme.ERROR}
                    onClick={onEditButtonClick}
                >
                    {profileReadonly ? 'Изменить' : 'Отменить'}
                </Button>
                <ProfileCard
                    data={profileData}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeMiddlename={onChangeMiddlename}
                    readonly={profileReadonly}
                    isLoading={profileIsLoading}
                    error={profileError}
                />
            </Page>
        </DynamicModuleLoader>
    );
});

export default ProfilePage;

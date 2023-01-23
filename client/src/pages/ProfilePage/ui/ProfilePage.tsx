import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useCallback, useEffect } from 'react';
import {
    fetchProfileData,
    getProfileData,
    profileActions,
    ProfileCard,
    profileReducer,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';

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
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        document.title = 'Профиль';
        if (id) dispatch(fetchProfileData(id));
    }, [dispatch, id]);
    const profileData = useSelector(getProfileData);

    const onChangeFirstname = useCallback((value: string) => {
        dispatch(profileActions.changeData({ id: id!, firstname: value || '' }));
    }, [dispatch, id]);
    const onChangeLastname = useCallback((value: string) => {
        dispatch(profileActions.changeData({ id: id!, lastname: value || '' }));
    }, [dispatch, id]);
    const onChangeAge = useCallback((value: string) => {
        dispatch(profileActions.changeData({ id: id!, age: value || '' }));
    }, [dispatch, id]);
    const onChangeCity = useCallback((value: string) => {
        dispatch(profileActions.changeData({ id: id!, city: value || '' }));
    }, [dispatch, id]);
    const onChangeEmail = useCallback((value: string) => {
        dispatch(profileActions.changeData({ id: id!, email: value || '' }));
    }, [dispatch, id]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames('', {}, [className])}>
                <ProfileCard
                    data={profileData}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeEmail={onChangeEmail}
                />
            </Page>
        </DynamicModuleLoader>
    );
});

export default ProfilePage;

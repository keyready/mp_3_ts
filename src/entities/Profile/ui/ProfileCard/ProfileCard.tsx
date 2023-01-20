import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from 'shared/UI/Text/Text';
import { Input } from 'shared/UI/Input';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { Profile } from '../../model/types/profile';
import classes from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
    onChangeFirstname: (value?: string) => void;
    onChangeLastname: (value?: string) => void;
    onChangeAge: (value?: string) => void;
    onChangeCity: (value?: string) => void;
    onChangeUsername: (value?: string) => void;
    onChangeAvatar: (value?: string) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
    } = props;

    if (isLoading) {
        return (
            <div className={classNames(classes.ProfileCard, {}, [className, classes.loader])}>
                <div className={classes.skeletons}>
                    <Skeleton
                        className={classes.avatarSkeleton}
                        width={150}
                        height={150}
                        border="20%"
                    />
                    <Skeleton width="100%" height={30} border="10px" />
                    <Skeleton width="100%" height={30} border="10px" />
                    <Skeleton width="100%" height={30} border="10px" />
                    <Skeleton width="100%" height={30} border="10px" />
                    <Skeleton width="100%" height={30} border="10px" />
                    <Skeleton width="100%" height={30} border="10px" />
                    <Skeleton width={220} height={30} border="10px" />
                    <Skeleton width={220} height={30} border="10px" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(classes.ProfileCard, {}, [className, classes.error])}>
                <Text
                    theme={TextTheme.ERROR}
                    title="Произошла ошибка при загрузке профиля"
                    text="Попробуйте перезагрузить страницу"
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    const mods: Mods = {
        [classes.editing]: !readonly,
    };

    return (
        <div className={classNames(classes.ProfileCard, mods, [className])}>
            <div className={classes.data}>
                {data?.avatar && (
                    <div className={classes.avatarWrapper}>
                        <Avatar
                            src={data.avatar}
                            alt="Фото профиля"
                            size={150}
                            rounded={20}
                        />
                    </div>
                )}
                <Input
                    value={data?.first}
                    placeholder="Ваше имя"
                    className={classes.input}
                    onChange={onChangeFirstname}
                    readonly={readonly}
                />
                <Input
                    value={data?.lastname}
                    placeholder="Ваша фамилия"
                    className={classes.input}
                    onChange={onChangeLastname}
                    readonly={readonly}
                />
                <Input
                    value={data?.age}
                    placeholder="Ваш возраст"
                    className={classes.input}
                    onChange={onChangeAge}
                    readonly={readonly}
                />
                <Input
                    value={data?.city}
                    placeholder="Город"
                    className={classes.input}
                    onChange={onChangeCity}
                    readonly={readonly}
                />
                <Input
                    value={data?.username}
                    placeholder="Имя пользователя"
                    className={classes.input}
                    onChange={onChangeUsername}
                    readonly={readonly}
                />
                <Input
                    value={data?.avatar}
                    placeholder="Ссылка на аватарку"
                    className={classes.input}
                    onChange={onChangeAvatar}
                    readonly={readonly}
                />
            </div>
        </div>
    );
};

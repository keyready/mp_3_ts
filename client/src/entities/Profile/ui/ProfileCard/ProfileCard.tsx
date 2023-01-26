import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from 'shared/UI/Text/Text';
import { Input } from 'shared/UI/Input';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { Profile } from '../../model/types/profile';
import classes from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
    onChangeFirstname: (value: string) => void;
    onChangeLastname: (value: string) => void;
    onChangeAge: (value: string) => void;
    onChangeCity: (value: string) => void;
    onChangeEmail: (value: string) => void;
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
        onChangeEmail,
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
                <Input
                    value={data?.middlename}
                    placeholder="Ваша фамилия"
                    className={classes.input}
                    onChange={onChangeLastname}
                    readonly={readonly}
                />
                <Input
                    value={data?.firstname}
                    placeholder="Ваше имя"
                    className={classes.input}
                    onChange={onChangeFirstname}
                    readonly={readonly}
                />
                <Input
                    value={data?.lastname}
                    placeholder="Ваше отчество"
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
                    value={data?.email}
                    placeholder="Имя пользователя"
                    className={classes.input}
                    onChange={onChangeEmail}
                    readonly={readonly}
                />
            </div>
        </div>
    );
};

import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from 'shared/UI/Text/Text';
import { Input } from 'shared/UI/Input';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { User } from 'entities/User';
import classes from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data?: User;
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
    onChangeFirstname: (value: string) => void;
    onChangeLastname: (value: string) => void;
    onChangeMiddlename: (value: string) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        readonly,
        onChangeFirstname,
        onChangeMiddlename,
        onChangeLastname,
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
            <img
                className={classes.avatarSkeleton}
                src={`/images/users/${data?.photo}`}
                alt={data?.lastname}
            />
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
                value={data?.middlename}
                placeholder="Ваше отчество"
                className={classes.input}
                onChange={onChangeMiddlename}
                readonly={readonly}
            />
        </div>
    );
};

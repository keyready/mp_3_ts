import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Button } from 'shared/UI/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteAward } from 'pages/adminPage/model/services/deleteAward';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';
import classes from './AwardCard.module.scss';

interface AwardCardProps {
    className?: string;
    id: number;
    title: string;
    photo: string;
    description: string;
}

export const AwardCard = memo((props: AwardCardProps) => {
    const {
        className,
        id,
        description,
        title,
        photo,
    } = props;
    const dispatch = useAppDispatch();

    const onDeleteAwardClick = useCallback((awardId: number) => {
        dispatch(deleteAward(awardId));
    }, [dispatch]);

    return (
        <div className={classNames(classes.AwardCard, {}, [className])}>
            <img
                className={classes.photo}
                src={`/images/awards/${photo}`}
                alt={title}
            />
            <h2 className={classes.title}>{title}</h2>
            <p className={classes.description}>{description}</p>
            <Button
                onClick={() => onDeleteAwardClick(id)}
                theme={ButtonTheme.ERROR}
            >
                Удалить
            </Button>
        </div>
    );
});

import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { User } from 'entities/User';
import { Button } from 'shared/UI/Button/Button';
import { Hero } from '../../model/types/Hero';
import classes from './HeroCard.module.scss';

interface HeroCardProps {
    className?: string;
    hero?: Hero;
    isLoading?: boolean;
    user?: User;
}

export const HeroCard = memo((props: HeroCardProps) => {
    const {
        className,
        hero,
        isLoading,
        user,
    } = props;

    useEffect(() => {
        console.log(user);
    }, [user]);

    function deleteHero(id: number | undefined) {
        fetch(`http://localhost:8000/heroes/${id}`, {
            method: 'delete',
            headers: {
                authorization: 'super-secret-token',
            },
        })
            .then((res) => res.json())
            .then(() => {
                document.location.reload();
            });
    }

    return (
        <div className={classNames(classes.HeroCard, {}, [className])}>
            {user?.role === 'admin'
                ? (
                    <Button
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            fontSize: 14,
                            background: 'crimson',
                            border: '2px solid red',
                            color: 'white',
                        }}
                        type="button"
                        onClick={() => deleteHero(hero?.id)}
                    >
                        Удалить
                    </Button>
                )
                : ''}

            <div className={classes.heroInfo}>
                <img
                    width={100}
                    src={`/static/images/heroes/${hero?.photo}`}
                    alt={`${hero?.firstname} ${hero?.lastname}`}
                />

                <div className={classes.heroMainInfo}>
                    <h3 className={classes.heroRank}>{hero?.rank}</h3>
                    <h1 className={classes.heroSurname}>{hero?.middlename}</h1>
                    <h3 className={classes.heroNames}>
                        {hero?.firstname}
                        {' '}
                        {hero?.lastname}
                    </h3>
                </div>
            </div>
            <p className={classes.heroStory}>
                {hero?.story}
            </p>
        </div>
    );
});

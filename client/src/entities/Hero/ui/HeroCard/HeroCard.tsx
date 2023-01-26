import { classNames } from 'shared/lib/classNames/classNames';
import { memo, MouseEvent, useCallback } from 'react';
import { Button } from 'shared/UI/Button';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Text } from 'shared/UI/Text/Text';
import { Hero } from '../../model/types/Hero';
import classes from './HeroCard.module.scss';

interface HeroProps {
    className?: string;
    hero: Hero;
}

export const HeroCard = memo((props: HeroProps) => {
    const {
        className,
        hero,
    } = props;
    const navigate = useNavigate();

    const onReadmoreClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        navigate(`/hero/${hero.id}`);
    }, [hero.id, navigate]);

    return (
        <div className={classNames(classes.Hero, {}, [className])}>
            <div className={classes.info}>
                <img
                    className={classes.heroPhoto}
                    src={`/images/heroes/${hero?.photo}`}
                    alt={`${hero.rank} ${hero.middlename}`}
                    title={`${hero.rank} ${hero.middlename}`}
                />
                <div className={classes.heroMainInfo}>
                    <p>{hero?.rank}</p>
                    <div className={classes.names}>
                        <h2>{hero?.middlename}</h2>
                        <h2>{hero?.firstname}</h2>
                        <h2>{hero?.lastname}</h2>
                    </div>
                </div>
            </div>
            <div className={classes.storyPart}>
                {hero.story?.split('\n').map((paragraph) => (
                    <Text
                        text={paragraph}
                        indent={20}
                    />
                ))}
            </div>
            {hero.awards?.length && (
                <div className={classes.awardsSectionWrapper}>
                    <h2 className={classes.awardsWrapperTitle}>Награды</h2>
                    <div className={classes.awardsWrapper} />
                    {hero.awards.map((award) => (
                        <img
                            className={classes.awardPhoto}
                            src={`/images/awards/${award.photo}`}
                            alt={award.title}
                            title={award.title}
                        />
                    ))}
                </div>
            )}
            <Button
                className={classes.readmoreBtn}
                theme={ButtonTheme.OUTLINED}
                onClick={onReadmoreClick}
            >
                Читать далее...
            </Button>
        </div>
    );
});

import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { getHeroData, getHeroDataIsLoading, HeroReducer } from 'entities/Hero';
import { fetchHeroData } from 'entities/Hero/model/services/fetchHeroData';
import { Text, TextAlign } from 'shared/UI/Text/Text';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { AppLink } from 'shared/UI/AppLink';
import { AppLinkTheme } from 'shared/UI/AppLink/ui/AppLink';
import classes from './HeroDetailedPage.module.scss';

interface HeroDetailedPageProps {
    className?: string;
}

const reducer: ReducersList = {
    hero: HeroReducer,
};

const HeroDetailedPage = memo((props: HeroDetailedPageProps) => {
    const {
        className,
    } = props;
    const { heroId } = useParams();
    const dispatch = useAppDispatch();
    const hero = useSelector(getHeroData);
    const isLoading = useSelector(getHeroDataIsLoading);

    useEffect(() => {
        if (heroId) dispatch(fetchHeroData(heroId));
    }, [dispatch, heroId]);

    if (isLoading) {
        return (
            <Page>
                <Skeleton width="100%" height="100%" border="20px" />
            </Page>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducer}>
            <Page className={classNames(classes.HeroDetailedPage, {}, [className])}>
                <AppLink
                    className={classes.pageHeader}
                    to="/heroes"
                    theme={AppLinkTheme.OUTLINED_INVERTED}
                >
                    Назад к списку
                </AppLink>

                <div className={classes.HeroWrapper}>
                    <div className={classes.heroHeader}>
                        <img
                            className={classes.heroPhoto}
                            src={`/images/heroes/${hero?.photo}`}
                            alt={hero?.lastname}
                            title={hero?.lastname}
                        />
                        <div className={classes.heroText}>
                            <Text
                                className={classes.textWrapper}
                                align={TextAlign.CENTER}
                                title={`${hero?.rank} ${hero?.lastname}`}
                                text={`${hero?.firstname} ${hero?.middlename}`}
                            />
                            <Text
                                className={classes.textWrapper}
                                align={TextAlign.CENTER}
                                title="Героя добавил"
                                text={`${hero?.userId.lastname} ${
                                    hero?.userId.firstname} ${
                                    hero?.userId.middlename}`}
                            />
                        </div>
                    </div>
                    <Text
                        className={classNames(classes.textWrapper, {}, [classes.story])}
                        title="История героя"
                        text={hero?.story}
                    />

                    <div className={classes.awardsWrapper}>
                        <Text
                            className={classes.textWrapper}
                            title="Награды героя"
                            align={TextAlign.CENTER}
                        />
                        <div className={classes.awardsDetailedWrapper}>
                            {hero?.awards?.map((award) => (
                                <div
                                    key={award.id}
                                    className={classes.awardWrapper}
                                >
                                    <img
                                        className={classes.awardImage}
                                        src={`/images/awards/${award.photo}`}
                                        alt={award.title}
                                        title={award.title}
                                    />
                                    <h3 className={classes.awardTitle}>
                                        {award.title}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Page>
        </DynamicModuleLoader>
    );
});

export default HeroDetailedPage;

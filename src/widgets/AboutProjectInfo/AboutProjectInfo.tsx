import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import classes from './AboutProjectInfo.module.scss';

interface AboutProjectInfoProps {
    className?: string;
}

export const AboutProjectInfo = memo((props: AboutProjectInfoProps) => {
    const { t } = useTranslation();

    const {
        className,
    } = props;

    return (
        <div className={classNames(classes.AboutProjectInfo, {}, [className])}>
            {t('AboutProjectInfo')}
        </div>
    );
});

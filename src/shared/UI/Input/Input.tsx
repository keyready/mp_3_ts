import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import classes from './Input.module.scss';

interface InputProps {
    className?: string;
}

export const Input = memo((props: InputProps) => {
    const { t } = useTranslation();

    const {
        className,
    } = props;

    return (
        <div className={classNames(classes.Input, {}, [className])}>
            {t('Input')}
        </div>
    );
});

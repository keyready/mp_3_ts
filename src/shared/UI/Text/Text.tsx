import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './Text.module.scss';

export enum TextType {
    PRIMARY = 'primary',
    WARNING = 'warning',
    ERROR = 'error',
}

export enum TextAlign {
    CENTER = 'center',
    LEFT = 'left',
    RIGHT = 'right',
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    type?: TextType;
    align?: TextAlign;
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        align = TextAlign.LEFT,
        type = TextType.PRIMARY,
    } = props;

    return (
        <div className={classNames(classes.Text, {}, [className, classes[type], classes[align]])}>
            {title && <h1 className={classes.title}>{title}</h1>}
            {text && <pre className={classes.text}>{text}</pre>}
        </div>
    );
});

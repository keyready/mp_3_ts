import { ChangeEvent, memo, TextareaHTMLAttributes } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Textarea.module.scss';

type HTMLTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>

interface TextareaProps extends HTMLTextareaProps {
    className?: string;
    value?: string;
    onChange?: (str: string) => string;
}

export const Textarea = memo((props: TextareaProps) => {
    const {
        className,
        value,
        onChange,
        ...otherProps
    } = props;

    function onChangeHandler(e: ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault();
        e.stopPropagation();

        onChange?.(e.target.value);
    }

    return (
        <textarea
            className={classNames(classes.Textarea, {}, [className])}
            onChange={(e) => onChangeHandler(e)}
            {...otherProps}
        >
            {value}
        </textarea>
    );
});

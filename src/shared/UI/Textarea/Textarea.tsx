import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, memo, useCallback } from 'react';
import classes from './TextArea.module.scss';

interface TextAreaProps {
    className?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    name?: string;
}

export const TextArea = memo((props: TextAreaProps) => {
    const {
        className,
        placeholder,
        value,
        onChange,
        name,
    } = props;

    const onTextareaChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(event.target.value);
    }, [onChange]);

    return (
        <textarea
            className={classNames(classes.TextArea, {}, [className])}
            value={value}
            onChange={onTextareaChange}
            placeholder={placeholder}
            rows={5}
            name={name}
        >
            {value}
        </textarea>
    );
});

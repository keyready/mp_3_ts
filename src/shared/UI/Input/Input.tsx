import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, InputHTMLAttributes, memo } from 'react';
import classes from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
    className?: string;
    placeholder?: string;
    onChange?: (str: string | number) => void;
    value?: string | number;
    autoFocus?: boolean
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        onChange,
        value,
        placeholder,
        name,
        type = 'text',
        autoFocus,
        ...otherProps
    } = props;

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        e.stopPropagation();

        onChange?.(e.target.value);
    }

    return (
        <input
            className={classNames(classes.Input, {}, [className])}
            autoFocus={autoFocus}
            placeholder={placeholder}
            value={value}
            name={name}
            type={type}
            onChange={(e) => onChangeHandler(e)}
            {...otherProps}
        />
    );
});

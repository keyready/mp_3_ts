import { classNames } from 'shared/lib/classNames/classNames';
import { InputHTMLAttributes, memo } from 'react';
import classes from './InputFile.module.scss';
import Upload from './upload.svg';

interface InputFileProps extends InputHTMLAttributes<HTMLInputElement>{
    className?: string;
    message?: string;
}

export const InputFile = memo((props: InputFileProps) => {
    const {
        className,
        message,
        ...otherProps
    } = props;

    return (
        <div className={classes.inputWrapper}>
            <input
                className={classNames(classes.InputFile)}
                id="file_input"
                type="file"
                {...otherProps}
            />
            <label
                className={classes.fileButton}
                htmlFor="file_input"
            >
                <span className={classes.fileInputWrapper}>
                    <Upload
                        width={50}
                        height={50}
                    />
                </span>
                <span className={classes.fileInputName}>{message}</span>
            </label>
        </div>
    );
});

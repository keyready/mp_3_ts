import { Listbox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Select.module.scss';

export interface IOption {
    id: number;
    name: string;
    unavailable: boolean
}
export interface SelectProps {
    options: IOption[]
    onChange?: () => void;
    selectedValue?: IOption;
}
export function Select(props: SelectProps) {
    const {
        options,
        selectedValue,
        onChange,
    } = props;

    return (
        <Listbox
            as="div"
            value={selectedValue}
            onChange={onChange}
            className={classes.Listbox}
        >
            <Listbox.Button
                className={classes.Button}
            >
                {selectedValue?.name}
            </Listbox.Button>
            <Listbox.Options
                className={classes.Options}
            >
                {options.map((option) => (
                    <Listbox.Option
                        className={classes.Option}
                        key={option.id}
                        value={option}
                    >
                        {({ active }) => (
                            <li
                                className={classNames(classes.item, { [classes.active]: active })}
                            >
                                {option.name}
                            </li>
                        )}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    );
}

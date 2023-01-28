import { ReactNode, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './HCombobox2.module.scss';
import Arrow from './assets/arrow.svg';
import Selected from './assets/selected.svg';

export interface HComboType {
    value: string;
    content: ReactNode;
}

interface HComboProps {
    classname?: string;
    placeholder?: string;
    items: HComboType[];
    selected: HComboType[];
    setSelected: (value: HComboType[]) => void;
}

export const HCombo = (props: HComboProps) => {
    const {
        classname, placeholder,
        items,
        selected,
        setSelected,
    } = props;

    const [query, setQuery] = useState('');

    const filteredItems = query === ''
        ? items
        : items.filter((item) => item.value
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')));

    return (
        <div className={classes.comboboxWrapper}>
            <Combobox
                value={selected}
                onChange={(value) => setSelected(value)}
                multiple
            >
                <div className={classes.HCombobox}>
                    <div className={classes.inputWrapper}>
                        <Combobox.Input
                            className={classes.input}
                            displayValue={() => (selected
                                ? selected.map((item) => item.value).join(', ')
                                : '')}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder={placeholder || 'Поиск...'}
                        />
                        <Combobox.Button
                            className={classes.button}
                        >
                            <Arrow className={classes.svg} />
                        </Combobox.Button>
                    </div>
                    <Combobox.Options
                        className={classes.options}
                    >
                        {filteredItems.length === 0 && query !== '' ? (
                            <div className={classes.notFound}>
                                Найдено ничего.
                            </div>
                        )
                            : (filteredItems.map((item) => (
                                <Combobox.Option
                                    className={({ active, selected }) => classNames(
                                        classes.option,
                                        {
                                            [classes.active]: active,
                                            [classes.selected]: selected,
                                        },
                                    )}
                                    key={item.value}
                                    value={item}
                                >
                                    {({ selected }) => (
                                        <>
                                            <>
                                                {item.content}
                                            </>

                                            {selected && (
                                                <Selected className={classes.selectedIcon} />
                                            )}
                                        </>
                                    )}
                                </Combobox.Option>
                            )))}
                    </Combobox.Options>
                </div>
            </Combobox>
        </div>
    );
};

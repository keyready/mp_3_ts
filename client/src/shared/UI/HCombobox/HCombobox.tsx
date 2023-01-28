import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/UI/Button';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';
import classes from './HCombobox.module.scss';

interface People {
    id: number;
    name: string
}

const people: People[] = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
];

export const HCombobox = () => {
    const [selected, setSelected] = useState([people[0], people[1]]);
    const [query, setQuery] = useState('');

    const filteredPeople = query === ''
        ? people
        : people.filter((person) => person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')));

    return (
        <div
            className={classes.comboboxWrapper}
        >
            <Combobox
                value={selected}
                onChange={(people) => setSelected(people)}
                multiple
            >
                <div className={classes.HCombobox}>
                    <div className={classes.inputWrapper}>
                        <Combobox.Input
                            className={classes.input}
                            displayValue={(persons: People[]) => persons.join(', ')}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Button
                            className={classes.button}
                            theme={ButtonTheme.CLEAR}
                        />
                    </div>

                    <Combobox.Options className={classes.options}>
                        {filteredPeople.length === 0 && query !== '' ? (
                            <div className={classes.notFound}>
                                Nothing found.
                            </div>
                        ) : (
                            filteredPeople.map((person) => (
                                <Combobox.Option
                                    key={person.id}
                                    className={({ active }) => classNames(
                                        classes.option,
                                        { [classes.activeOption]: active },
                                    )}
                                    value={person}
                                >
                                    {({ active }) => (
                                        <>
                                            <span
                                                className={classNames(
                                                    '',
                                                    { [classes.activeOption]: active },
                                                )}
                                            >
                                                {person.name}
                                            </span>
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </div>
            </Combobox>
        </div>
    );
};

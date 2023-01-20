import { classNames } from 'shared/lib/classNames/classNames';
import {
    Dispatch,
    memo, ReactNode, SetStateAction, useState,
} from 'react';
import { Tab } from '@headlessui/react';
import classes from './Tabs.module.scss';

interface TabsProps {
    content?: Record<string, ReactNode>[];
    value?: number;
    onChange?: Dispatch<SetStateAction<number>>;
}

export const Tabs = memo((props: TabsProps) => {
    const {
        content,
        onChange,
        value,
    } = props;

    const [categories] = useState<Record<string, ReactNode>[]>([
        { Авторизация: <h1>Привет митр</h1> },
        { Popular: <h1>пока мир</h1> },
    ]);

    return (
        <div className={classes.Tabs}>
            <Tab.Group>
                <Tab.List className={classes.tabsList}>
                    {Object.keys(categories).map((category) => (
                        <Tab
                            className={({ selected }) => classNames(
                                classes.tab,
                                { [classes.selectedTab]: selected },
                            )}
                        >
                            {category}
                        </Tab>
                        //
                    ))}
                </Tab.List>
                <Tab.Panels className={classes.tabPanels}>
                    {Object.values(categories).map((post, idx) => (
                        <Tab.Panel
                            key={idx}
                            className={classes.tab}
                        >
                            {post}
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
});

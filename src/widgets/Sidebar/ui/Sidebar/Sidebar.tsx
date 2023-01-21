import { memo, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/UI/ThemeSwitcher';
import { Button } from 'shared/UI/Button';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';
import { useSelector } from 'react-redux';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import classes from './Sidebar.module.scss';

export interface SidebarProps {
    classname?: string
}

export const Sidebar = memo(({ classname }: SidebarProps) => {
    const SidebarItemsList = useSelector(getSidebarItems);
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const listItem = useMemo(
        () => SidebarItemsList.map((item) => (
            <SidebarItem
                key={item.path}
                collapsed={collapsed}
                item={item}
            />
        )),
        [SidebarItemsList, collapsed],
    );

    return (
        <div
            data-testid="sidebar"
            className={classNames(
                classes.Sidebar,
                { [classes.collapsed]: collapsed },
                [classname],
            )}
        >
            <div className={classes.items}>
                {listItem}
            </div>

            <div className={classes.switchers}>
                <ThemeSwitcher />
                <Button
                    data-testid="sidebar-button"
                    theme={ButtonTheme.PRIMARY}
                    onClick={toggleSidebar}
                >
                    <h3>{collapsed ? '➥' : '⇐'}</h3>
                </Button>
            </div>
        </div>
    );
});

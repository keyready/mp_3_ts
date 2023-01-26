import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Loader } from 'shared/UI/Loader';
import { Button } from 'shared/UI/Button';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';
import { Modal } from 'shared/UI/Modal';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { AwardCard } from '../AwardCard/AwardCard';
import {
    getAdminPageAwardsError,
    getAdminPageAwardsIsLoading,
} from '../../../model/selectors/usersManagerSelector';
import {
    awardsManagerReducers,
    getAwards,
} from '../../../model/slice/awardsManager';
import { AddAwardForm } from '../AddAwardForm/AddAwardForm';
import { fetchAwards } from '../../../model/services/fetchAwards';
import classes from './AwardsManager.module.scss';

interface awardsManagerProps {
    className?: string;
}

const reducers: ReducersList = {
    awardsManagerPage: awardsManagerReducers,
};

export const AwardsManager = memo((props: awardsManagerProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const awards = useSelector(getAwards.selectAll);
    const isLoading = useSelector(getAdminPageAwardsIsLoading);
    const error = useSelector(getAdminPageAwardsError);
    const [isAddAwardFormOpened, setIsAddAwardFormOpened] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchAwards());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(classes.AwardsManager, {}, [className])}>
                <h2 className={classes.header}>Медальки</h2>
                <Modal
                    isOpen={isAddAwardFormOpened}
                    onClose={() => setIsAddAwardFormOpened(false)}
                >
                    <AddAwardForm />
                </Modal>

                <Button
                    theme={ButtonTheme.SUCCESS}
                    onClick={() => setIsAddAwardFormOpened(true)}
                >
                    Добавить медальку
                </Button>

                {isLoading && (<Loader />)}
                {awards.length && !error
                    ? awards.map((award) => (
                        <AwardCard
                            key={award.id}
                            id={award.id}
                            photo={award.photo}
                            title={award.title}
                            description={award.description}
                        />
                    ))
                    : <h3>Медалек нет ;(</h3>}
            </div>
        </DynamicModuleLoader>
    );
});

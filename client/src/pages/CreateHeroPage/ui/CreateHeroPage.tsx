import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import {
    FormEvent, memo, useCallback, useEffect, useState,
} from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Input } from 'shared/UI/Input';
import { TextArea } from 'shared/UI/TextArea/TextArea';
import { Button } from 'shared/UI/Button';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';
import { Hero } from 'entities/Hero';
import { InputFile } from 'shared/UI/InputFile/InputFile';
import { Text, TextTheme } from 'shared/UI/Text/Text';
import { HSelect } from 'shared/UI/HSelect/HSelect';
import { useSelector } from 'react-redux';
import { awardsManagerReducers, getAwards } from 'pages/adminPage/model/slice/awardsManager';
import { createHero } from '../model/services/createHero';
import { fetchAwards } from '../../adminPage/model/services/fetchAwards';
import classes from './CreateHeroPage.module.scss';
import { createHeroPageReducers } from '../model/slice/CreateHeroPageSlice';

interface CreateHeroPageProps {
    className?: string;
}

const reducers: ReducersList = {
    createHeroPage: createHeroPageReducers,
    awardsManagerPage: awardsManagerReducers,
};

const CreateHeroPage = memo((props: CreateHeroPageProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<DeepPartial<Hero>>({
        firstname: '',
        middlename: '',
        lastname: '',
        story: undefined,
        rank: '',
    });
    const [resultMessage, setResultMessage] = useState<string>('');
    const [creatingError, setCreatingError] = useState<boolean>(false);

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [filteredIds, setFilteredIds] = useState<number[]>([]);
    const awards = useSelector(getAwards.selectAll);

    useEffect(() => {
        document.title = 'Добавление героя';
        dispatch(fetchAwards());
    }, [dispatch]);

    const onFormSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        formData.append('awards', filteredIds.join(','));

        const result = await dispatch(createHero(formData));
        if (result.meta.requestStatus === 'fulfilled') {
            setResultMessage('Герой успешно добавлен!');
            setCreatingError(false);
        } else {
            setResultMessage('Произошла непредвиденная ошибка... ;(');
            setCreatingError(true);
        }
    }, [dispatch, filteredIds]);

    const content = awards.map((award) => (
        <div
            className={classes.awardRow}
            key={award.id}
        >
            <img
                className={classes.photo}
                src={`/images/awards/${award.photo}`}
                alt={award.title}
            />
            <h2 className={classes.awardTitle}>{award.title}</h2>
        </div>
    ));
    function returnAwards() {
        const awardsForSelector: any[] = [];

        awards.forEach((value, index) => {
            awardsForSelector.push(
                {
                    value: value.title,
                    content: content[index],
                },
            );
        });

        return awardsForSelector;
    }

    const filterAwardsNames = (selectedAwardsNames: string[]) => {
        setSelectedItems(selectedAwardsNames);
        const intersection = awards.filter((award) => selectedAwardsNames.includes(award.title));

        const arr: number[] = [];
        intersection.map((obj) => arr.push(obj.id));

        setFilteredIds(arr);
    };

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames('', {}, [className])}>
                {resultMessage && (
                    <Text
                        title={resultMessage}
                        theme={creatingError ? TextTheme.ERROR : TextTheme.PRIMARY}
                    />
                )}
                <form
                    className={classes.createHeroForm}
                    encType="multipart/form-data"
                    onSubmit={onFormSubmit}
                >
                    <Input
                        autoFocus
                        name="middlename"
                        placeholder="Фамилия героя"
                        type="text"
                        value={formData.middlename}
                        onChange={(value) => setFormData({ ...formData, middlename: value })}
                        required
                    />
                    <Input
                        name="firstname"
                        placeholder="Имя героя"
                        type="text"
                        value={formData.firstname}
                        onChange={(value) => setFormData({ ...formData, firstname: value })}
                        required
                    />
                    <Input
                        name="lastname"
                        placeholder="Отчество героя"
                        type="text"
                        value={formData.lastname}
                        onChange={(value) => setFormData({ ...formData, lastname: value })}
                        required
                    />
                    <Input
                        name="rank"
                        placeholder="Воинское звание"
                        type="text"
                        value={formData.rank}
                        onChange={(value) => setFormData({ ...formData, rank: value })}
                        required
                    />
                    <TextArea
                        name="story"
                        placeholder="Ваша история..."
                        value={formData.story}
                    />

                    <HSelect
                        items={returnAwards()}
                        onChange={filterAwardsNames}
                        selectedItems={selectedItems}
                        optionsClassname={classes.optionsClassname}
                        placeholder="Выберите медали"
                    />

                    <InputFile
                        name="photo"
                        type="file"
                        message="Загрузите фото героя"
                    />

                    <Button
                        type="submit"
                        style={{ marginLeft: 'auto' }}
                        theme={ButtonTheme.PRIMARY}
                    >
                        Отправить
                    </Button>
                </form>
            </Page>
        </DynamicModuleLoader>
    );
});

export default CreateHeroPage;

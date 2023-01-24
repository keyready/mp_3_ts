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
import { createHero } from 'pages/CreateHeroPage/model/services/createHero';
import { createHeroPageReducers } from '../model/slice/CreateHeroPageSlice';
import classes from './CreateHeroPage.module.scss';

interface CreateHeroPageProps {
    className?: string;
}

const reducers: ReducersList = {
    createHeroPage: createHeroPageReducers,
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

    useEffect(() => {
        document.title = 'Добавление героя';
    }, []);

    const onFormSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const result = await dispatch(createHero(formData));
        if (result.meta.requestStatus === 'fulfilled') {
            setResultMessage('Герой успешно добавлен!');
            setCreatingError(false);
        } else {
            setResultMessage('Произошла непредвиденная ошибка... ;(');
            setCreatingError(true);
        }
    }, [dispatch]);

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

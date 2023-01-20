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
import { CreateHeroPageReducer } from '../model/slice/CreateHeroPageSlice';
import classes from './CreateHeroPage.module.scss';

interface CreateHeroPageProps {
    className?: string;
}

const reducers: ReducersList = {
    createHeroPage: CreateHeroPageReducer,
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

    useEffect(() => {

    }, []);

    const onFormSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);
        // @ts-ignore
        // const data = Object.fromEntries(formdata.entries());

        fetch('http://localhost:9999/create', {
            method: 'post',
            body: formdata,
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            });
    }, []);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames('', {}, [className])}>
                <form
                    className={classes.createHeroForm}
                    encType="multipart/form-data"
                    onSubmit={onFormSubmit}
                >
                    <Input
                        autoFocus
                        name="heroMiddlename"
                        placeholder="Фамилия героя"
                        type="text"
                        value={formData.middlename}
                        onChange={(value) => setFormData({ ...formData, middlename: value })}
                        required
                    />
                    <Input
                        name="heroFirstname"
                        placeholder="Имя героя"
                        type="text"
                        value={formData.firstname}
                        onChange={(value) => setFormData({ ...formData, firstname: value })}
                        required
                    />
                    <Input
                        name="heroLastname"
                        placeholder="Фамилия героя"
                        type="text"
                        value={formData.lastname}
                        onChange={(value) => setFormData({ ...formData, lastname: value })}
                        required
                    />
                    <Input
                        name="heroRank"
                        placeholder="Воинское звание"
                        type="text"
                        value={formData.rank}
                        onChange={(value) => setFormData({ ...formData, rank: value })}
                        required
                    />
                    <TextArea
                        name="story"
                        placeholder="Ваша история..."
                        value={formData.story?.join('\n')}
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

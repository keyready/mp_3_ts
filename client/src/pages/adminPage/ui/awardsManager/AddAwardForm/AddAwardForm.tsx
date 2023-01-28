import { classNames } from 'shared/lib/classNames/classNames';
import {
    FormEvent, memo, useCallback, useState,
} from 'react';
import { Text, TextTheme } from 'shared/UI/Text/Text';
import { Input } from 'shared/UI/Input';
import { TextArea } from 'shared/UI/TextArea/TextArea';
import { InputFile } from 'shared/UI/InputFile/InputFile';
import { Button } from 'shared/UI/Button';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { createAward } from '../../../model/services/createAward';
import classes from './AddAwardForm.module.scss';

interface AddAwardFormProps {
    className?: string;
}

export const AddAwardForm = memo((props: AddAwardFormProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const [resultMessage, setResultMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const onFormSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const result = await dispatch(createAward(formData));
        if (result.meta.requestStatus === 'fulfilled') {
            setResultMessage('Медаль успешно добавлена');
            setIsError(false);
        } else if (result.meta.requestStatus === 'rejected') {
            setResultMessage('Произошла какая-то ошибка...');
            setIsError(true);
        }
    }, [dispatch]);

    return (
        <div className={classNames(classes.AddAwardForm, {}, [className])}>
            {resultMessage && (
                <Text
                    title={resultMessage}
                    theme={isError ? TextTheme.ERROR : TextTheme.PRIMARY}
                />
            )}
            <form
                className={classes.createHeroForm}
                encType="multipart/form-data"
                onSubmit={onFormSubmit}
            >
                <Input
                    autoFocus
                    name="title"
                    placeholder="Название медали"
                    type="text"
                    value={formData.title}
                    onChange={(value) => setFormData({ ...formData, title: value })}
                    required
                />

                <TextArea
                    name="description"
                    placeholder="Описание медали"
                    value={formData.description}
                    onChange={(value: string) => setFormData({ ...formData, description: value })}
                />

                <InputFile
                    name="photo"
                    type="file"
                    message="Загрузите изображение медали"
                />

                <Button
                    type="submit"
                    style={{ marginLeft: 'auto' }}
                    theme={ButtonTheme.PRIMARY}
                >
                    Отправить
                </Button>
            </form>
        </div>
    );
});

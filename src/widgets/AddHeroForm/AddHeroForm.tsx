import { FormEvent, memo, useCallback } from 'react';
import { Input } from 'shared/UI/Input/Input';
import { Textarea } from 'shared/UI/Textarea/Textarea';
import { InputFile } from 'shared/UI/InputFile/InputFile';
import { Button } from 'shared/UI/Button/Button';
import { useDispatch } from 'react-redux';
import { addHero } from 'entities/Hero';
import classes from './AddHeroForm.module.scss';

export const AddHeroForm = memo(() => {
    const dispatch = useDispatch();
    const submitFormHandler = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        // @ts-ignore
        const data = Object.fromEntries(formData.entries());
        // @ts-ignore
        dispatch(addHero(data));
    }, [dispatch]);

    return (
        <form
            // encType="multipart/formdata"
            className={classes.AddHeroForm}
            onSubmit={(e) => submitFormHandler(e)}
        >
            <Input
                className={classes.input}
                autoFocus
                type="text"
                name="middlename"
                placeholder="Введите фамилию"
                required
            />
            <Input
                className={classes.input}
                type="text"
                name="firstname"
                placeholder="Введите имя"
                required
            />
            <Input
                className={classes.input}
                type="text"
                name="lastname"
                placeholder="Введите отчество"
                required
            />
            <Input
                className={classes.input}
                type="text"
                name="rank"
                placeholder="Введите звание"
                required
            />
            <Textarea
                className={classes.textarea}
                name="story"
                cols={30}
                rows={10}
                placeholder="Расскажите историю"
                required
            />
            <InputFile
                name="photo"
                accept=".jpg"
                message="Фото героя"
                required
            />
            <Button type="submit">Отправить</Button>
        </form>
    );
});

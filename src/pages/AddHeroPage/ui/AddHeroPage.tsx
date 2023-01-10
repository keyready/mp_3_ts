import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, memo } from 'react';
import axios from 'axios';
import classes from './AddHeroPage.module.scss';

interface AddHeroPageProps {
    className?: string;
}

const AddHeroPage = memo((props: AddHeroPageProps) => {
    const {
        className,
    } = props;

    function submitFormHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        // @ts-ignore
        const data = Object.fromEntries(formData.entries());

        axios.post('/heroes', data, {
            headers: {
                authorization: 'super-secret-token',
            },
        })
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <div className={classNames(classes.AddHeroPage, {}, [className])}>
            <form
                className={classes.form}
                onSubmit={(e) => submitFormHandler(e)}
            >
                <input
                    className={classes.input}
                    type="text"
                    name="middlename"
                    placeholder="Введите фамилию"
                    required
                />
                <input
                    className={classes.input}
                    type="text"
                    name="firstname"
                    placeholder="Введите имя"
                    required
                />
                <input
                    className={classes.input}
                    type="text"
                    name="lastname"
                    placeholder="Введите отчество"
                    required
                />
                <input
                    className={classes.input}
                    type="text"
                    name="rank"
                    placeholder="Введите звание"
                    required
                />
                <textarea
                    className={classes.textarea}
                    name="story"
                    cols={30}
                    rows={10}
                    placeholder="Расскажите историю"
                    required
                />
                <input
                    name="photo"
                    type="file"
                    accept=".jpg"
                    placeholder="Фото героя"
                    required
                />
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
});

export default AddHeroPage;

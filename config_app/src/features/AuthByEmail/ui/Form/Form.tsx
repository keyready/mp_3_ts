import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/UI/Button';
import { memo, useCallback, useState } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import classes from './Form.module.scss';
import { loginActions, loginReducer } from '../../model/slices/loginSlice';

export interface FormProps {
    onSuccess?: () => void
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const Form = memo((props: FormProps) => {
    const { onSuccess } = props;
    const [toggleLoginType, setToggleLoginType] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onToggleForms = useCallback(() => {
        dispatch(loginActions.setUsername(''));
        dispatch(loginActions.setPassword(''));
        dispatch(loginActions.setRepPassword(''));
        setToggleLoginType((prev) => !prev);
    }, [dispatch]);

    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={initialReducers}
        >
            <div className={classes.tabsWrapper}>
                <Button
                    className={classNames(
                        '',
                        { [classes.selectedTab]: !toggleLoginType },
                    )}
                    onClick={onToggleForms}
                >
                    Авторизация
                </Button>
                <Button
                    className={classNames(
                        '',
                        { [classes.selectedTab]: toggleLoginType },
                    )}
                    onClick={onToggleForms}
                >
                    Регистрация
                </Button>
            </div>
            {toggleLoginType
                ? <RegisterForm onSuccess={onSuccess} />
                : <LoginForm onSuccess={onSuccess} />}
        </DynamicModuleLoader>
    );
});

export default Form;

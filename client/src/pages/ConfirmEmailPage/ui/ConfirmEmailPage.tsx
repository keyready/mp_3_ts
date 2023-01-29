import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'shared/UI/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { confirmEmail } from 'features/AuthByEmail/model/services/confirmEmail/confirmEmail';

interface ConfirmEmailPageProps {
    className?: string;
}

const ConfirmEmailPage = memo((props: ConfirmEmailPageProps) => {
    const {
        className,
    } = props;
    const { link } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onActivateClick = useCallback(() => {
        if (link) {
            dispatch(confirmEmail(link));
            alert('Аккаунт успешно активирован! Можете авторизоваться через 3 секунды');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    }, [dispatch, link, navigate]);

    return (
        <Page className={classNames('', {}, [className])}>
            <Button
                onClick={onActivateClick}
            >
                Подтвердить Email
            </Button>
        </Page>
    );
});

export default ConfirmEmailPage;

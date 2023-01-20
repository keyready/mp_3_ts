import { Suspense } from 'react';
import { Modal } from 'shared/UI/Modal';
import { LoginFormLazy } from 'features/AuthByEmail/ui/LoginForm/LoginForm.lazy';
import { Loader } from 'shared/UI/Loader';

interface LoginModalProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
    const {
        onClose,
        isOpen,
    } = props;

    return (
        <Modal
            lazy
            onClose={onClose}
            isOpen={isOpen}
        >
            <Suspense fallback={<Loader />}>
                <LoginFormLazy onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
};

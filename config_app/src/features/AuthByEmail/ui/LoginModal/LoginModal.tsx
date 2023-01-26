import { Suspense } from 'react';
import { Modal } from 'shared/UI/Modal';
import { Loader } from 'shared/UI/Loader';
import { FormLazy } from '../Form/Form.lazy';

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
                <FormLazy onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
};

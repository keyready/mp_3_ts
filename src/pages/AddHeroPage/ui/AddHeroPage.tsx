import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { AddHeroForm } from 'widgets/AddHeroForm/AddHeroForm';

interface AddHeroPageProps {
    className?: string;
}

const AddHeroPage = memo((props: AddHeroPageProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames('', {}, [className])}>
            <AddHeroForm />
        </div>
    );
});

export default AddHeroPage;

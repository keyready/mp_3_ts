import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';

interface AboutPageProps {
    className?: string;
}

const AboutPage = memo((props: AboutPageProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames('', {}, [className])}>
            <h1>About Page</h1>
        </div>
    );
});

export default AboutPage;

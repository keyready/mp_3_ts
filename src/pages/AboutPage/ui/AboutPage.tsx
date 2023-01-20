import { Page } from 'widgets/Page/Page';
import { useEffect } from 'react';

const AboutPage = () => {
    useEffect(() => {
        document.title = 'Наш полк | О проекте';
    }, []);

    return (
        <Page>
            <h1>О ПРОЕКТЕ</h1>
        </Page>
    );
};

export default AboutPage;

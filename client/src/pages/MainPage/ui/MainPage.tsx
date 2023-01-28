import { Page } from 'widgets/Page/Page';
import { useEffect } from 'react';

const MainPage = () => {
    useEffect(() => {
        document.title = 'Наш полк | ВКА';
    }, []);

    return (
        <Page>
            <h1>Мейн пейдж</h1>
        </Page>
    );
};

export default MainPage;

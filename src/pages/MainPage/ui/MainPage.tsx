import { Page } from 'widgets/Page/Page';
import { Tabs } from 'shared/UI/Tabs/Tabs';
import { useState } from 'react';

const MainPage = () => {
    const [selectedCard, setSelectedCard] = useState(0);

    const categories = [
        { Авторизация: <h1>ривет мир</h1> },
        { Регистраций: <h1>Пока мир</h1> },
    ];

    return (
        <Page>
            <h1>Мейн пейдж</h1>
            <Tabs
                onChange={setSelectedCard}
                value={selectedCard}
                content={categories}
            />
        </Page>
    );
};

export default MainPage;

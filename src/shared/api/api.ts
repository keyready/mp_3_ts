/**
 Все, что связано с инстанс апи - урок 38.
 Там еще изменения в loginByUsername и многих других файлах.
 Посмотришь ес чо по коммиту
 */

import axios from 'axios';
import { USER_AUTHORIZATION_TOKEN } from 'shared/const';

const getToken = () => {
    const token = JSON.parse(localStorage.getItem(USER_AUTHORIZATION_TOKEN)!);
    return `Basic ${token}`;
};

export const $api = axios.create({
    baseURL: __API__,
    headers: {
        Authorization: getToken(),
    },
});

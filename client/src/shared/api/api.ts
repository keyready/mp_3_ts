/**
 Все, что связано с инстанс апи - урок 38.
 Там еще изменения в loginByUsername и многих других файлах.
 Посмотришь ес чо по коммиту
 */

import axios from 'axios';
import { USER_AUTHORIZATION_TOKEN } from 'shared/const';

const getToken = () => {
    const token = localStorage.getItem(USER_AUTHORIZATION_TOKEN);
    if (token) {
        return `Token ${JSON.parse(token)}`;
    }
    return 'He TTyckayte ego cuda';
};

export const $api = axios.create({
    baseURL: __API__,
    headers: {
        Authorization: getToken(),
    },
});

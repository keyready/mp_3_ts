# Бессмертный полк
___

#### Если что-то ломается:
- [ ] При авторизации (`/sign_in`) в ответ от сервера я жду либо `403 Forbidden`, либо объект формата: 
```json
{
    "profile": {
        "id": 1,
        "middlename": "Корчак",
        "firstname": "Родион",
        "lastname": "Дмитриевич",
        "age": 18,
        "city": "Хабаровск",
        "email": "dallss13@bk.ru"
    },
    "secretToken": "9d7bab6844a3f4ed06ca"
}
```
- [ ] При авторизации (`/sign_up`) в ответ от сервера я жду либо любую ошибку, либо `201 Created`
- [ ] Запрос на показ всех героев: `/heroes`, в заголовках

```json
{
  "Authorization": "Basic a1b2c3d4e5f6g7"
}
```
- [ ] Запрос на добавление героев: `/create`, в заголовках

```json
{
  "Authorization": "Basic a1b2c3d4e5f6g7"
}
```
в теле запроса: 
```json
{
  "middlename": "Хуев",
  "firstname": "Хуй",
  "lastname": "Хуевич",
  "rank": "генерал-хуй",
  "story": "Были с парнем в парке аттракционов, и...",
  "photo": (binary)
}
```
инфу о герое достаешь из `req.body`, картинку из `req.files.photo`


___
Пока вроде все.  
Пока писал readme, понял, что нчиего не отправляю тебе, когда делаю `logout`. Т.е. в данный момент выход происходит только у меня на фронте. Но вроде бы и похуй, у тебя же там нигде нет флажка, что я вышел?  
___
Если что-то вдруг сломается, можешь поковыряться в файлах:
- [ ] Регистрация - [registerByEmail.ts](./src/features/AuthByEmail/model/services/registerByEmail/registerByEmail.ts)
- [ ] Авторизация - [loginByEmail.ts](./src/features/AuthByEmail/model/services/loginByEmail/loginByEmail.ts)
- [ ] Добавление деда - [CreateHeroPage.tsx](./src/pages/CreateHeroPage/ui/CreateHeroPage.tsx)
- [ ] Показ всех дедов - [fetchHeroes.ts](./src/pages/HeroesPage/model/services/fetchHeroes.ts)

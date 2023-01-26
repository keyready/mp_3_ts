const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const crypto = require('crypto');

const server = jsonServer.create();
const PORT = 9999;
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800);
    });
    next();
});

server.post('/create', (req, res) => {
    console.warn(req.body);
    console.warn(req.file);
    res.json({ success: 'success' });
});

// Эндпоинт для логина
let secretToken;
server.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [], profiles = [] } = db;

        const userFromBd = users.find(
            (user) => user.email === email && user.password === password,
        );

        if (userFromBd) {
            const profile = profiles.find(
                (profile) => profile.id === userFromBd.id,
            );
            secretToken = crypto.randomBytes(10).toString('hex');
            return res.json({ profile, secretToken });
        }

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
    // if (req.headers.authorization !== `Basic ${secretToken}`) {
    //     return res.status(403).json({ message: 'AUTH ERROR' });
    // }
    next();
});

server.use(router);

// запуск сервера
server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${PORT}`);
});

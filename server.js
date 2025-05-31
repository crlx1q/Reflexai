const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8000;

// Секреты из переменных окружения Koyeb
const ADMIN_SECRET = process.env['admin-passkey'];
const ADMIN_JWT_SECRET = process.env['admin-jwt'] || 'fallback-admin-jwt-secret';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

// Авторизация администратора по токену
function adminAuth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Нет токена' });
    try {
        const decoded = jwt.verify(token, ADMIN_JWT_SECRET);
        if (decoded.role !== 'admin') return res.status(403).json({ error: 'Нет доступа' });
        next();
    } catch {
        res.status(401).json({ error: 'Неверный токен' });
    }
}

// Авторизация по паролю: вход администратора
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    if (password !== ADMIN_SECRET) return res.status(403).json({ error: 'Неверный пароль' });
    const token = jwt.sign({ role: 'admin' }, ADMIN_JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
});

// Пример защищённого эндпоинта
app.get('/api/admin/pending', adminAuth, (req, res) => {
    res.json([
        { username: 'demo', displayName: 'Demo User' }
    ]);
});

// Изменение monitorUrl
app.post('/api/monitor-url', adminAuth, (req, res) => {
    const { monitorUrl } = req.body;
    if (!monitorUrl || typeof monitorUrl !== 'string') return res.status(400).json({ error: 'Некорректная ссылка' });

    // Тут сохраняется URL в config.json или другой логике
    res.json({ ok: true, monitorUrl });
});

app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});

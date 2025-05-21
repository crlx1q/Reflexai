const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cors = require('cors');
const app = express();
const SECRET = 'supersecretkey';
const PORT = 3000;

// --- Простая база (JSON) ---
const DB_FILE = './db.json';
let db = { users: [], chats: [], pending: [] };
if (fs.existsSync(DB_FILE)) db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

function saveDb() { fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2)); }

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // для index.html и статики

// --- Middleware ---
function auth(req, res, next) {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return res.status(401).json({ error: 'Нет токена' });
    try {
        req.user = jwt.verify(token, SECRET);
        next();
    } catch {
        res.status(401).json({ error: 'Неверный токен' });
    }
}

// --- Регистрация с ручным подтверждением ---
app.post('/api/register', (req, res) => {
    const { username, password, displayName } = req.body;
    if (!username || !password || !displayName) return res.status(400).json({ error: 'Все поля обязательны' });
    if (db.users.find(u => u.username === username) || db.pending.find(u => u.username === username))
        return res.status(400).json({ error: 'Пользователь уже существует' });
    db.pending.push({ username, password, displayName });
    saveDb();
    console.log(`Запрос на регистрацию: ${username} (${displayName})`);
    res.json({ ok: true, message: 'Ожидайте подтверждения администратора' });
});

// --- Админ подтверждает регистрацию через консоль ---
setInterval(() => {
    if (db.pending.length > 0) {
        const p = db.pending[0];
        console.log(`\n[Регистрация] Новый пользователь: ${p.username} (${p.displayName})`);
        console.log('Подтвердить? (y/n):');
        process.stdin.once('data', (data) => {
            const answer = data.toString().trim().toLowerCase();
            if (answer === 'y') {
                db.users.push({ username: p.username, password: p.password, displayName: p.displayName, isPro: false });
                db.pending.shift();
                saveDb();
                console.log('Пользователь подтвержден!');
            } else {
                db.pending.shift();
                saveDb();
                console.log('Пользователь отклонен.');
            }
        });
    }
}, 5000);

// --- Вход ---
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = db.users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ error: 'Неверные данные' });
    const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '7d' });
    res.json({ token });
});

// --- Получить профиль ---
app.get('/api/me', auth, (req, res) => {
    const user = db.users.find(u => u.username === req.user.username);
    if (!user) return res.status(401).json({ error: 'Нет пользователя' });
    res.json({ username: user.username, displayName: user.displayName, isPro: !!user.isPro });
});

// --- CRUD чатов ---
app.get('/api/chats', auth, (req, res) => {
    const userChats = db.chats.filter(c => c.username === req.user.username);
    res.json(userChats.sort((a, b) => b.id - a.id));
});
app.post('/api/chats', auth, (req, res) => {
    const id = Date.now();
    const chat = { id, username: req.user.username, title: req.body.title || '', messages: [] };
    db.chats.push(chat);
    saveDb();
    res.json(chat);
});
app.put('/api/chats/:id', auth, (req, res) => {
    const chat = db.chats.find(c => c.id == req.params.id && c.username === req.user.username);
    if (!chat) return res.status(404).json({ error: 'Нет чата' });
    chat.title = req.body.title;
    chat.messages = req.body.messages;
    saveDb();
    res.json(chat);
});
app.delete('/api/chats/:id', auth, (req, res) => {
    db.chats = db.chats.filter(c => !(c.id == req.params.id && c.username === req.user.username));
    saveDb();
    res.json({ ok: true });
});

// --- Админ: выдать/снять Pro (через консоль) ---
app.post('/api/admin/setpro', (req, res) => {
    const { username, isPro } = req.body;
    const user = db.users.find(u => u.username === username);
    if (!user) return res.status(404).json({ error: 'Нет пользователя' });
    user.isPro = !!isPro;
    saveDb();
    res.json({ ok: true });
});

// --- API для админки: список ожидающих и подтверждение/отклонение ---
app.get('/api/admin/pending', (req, res) => {
    // (Можно добавить простую защиту по IP или секрету, если нужно)
    res.json(db.pending.map(u => ({
        username: u.username,
        displayName: u.displayName
    })));
});

app.post('/api/admin/approve', (req, res) => {
    const { username, accept } = req.body;
    const idx = db.pending.findIndex(u => u.username === username);
    if (idx === -1) return res.status(404).json({ error: 'Нет такого пользователя в ожидании' });
    const user = db.pending[idx];
    if (accept) {
        db.users.push({ username: user.username, password: user.password, displayName: user.displayName, isPro: false });
        db.pending.splice(idx, 1);
        saveDb();
        return res.json({ ok: true, message: 'Пользователь подтвержден' });
    } else {
        db.pending.splice(idx, 1);
        saveDb();
        return res.json({ ok: true, message: 'Пользователь отклонен' });
    }
});

// --- Запуск ---
app.listen(PORT, () => {
    console.log('ReflexAI сервер запущен на http://localhost:' + PORT);
});

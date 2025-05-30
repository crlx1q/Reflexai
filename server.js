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
// Создаем структуру по умолчанию
const defaultDb = {
    users: [],
    chats: [],
    pending: [],
    folders: [],
    messageUsage: {}
};

// Инициализируем базу данных
let db;
try {
    db = fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE, 'utf8')) : defaultDb;
    // Проверяем наличие всех необходимых массивов
    db.users = db.users || [];
    db.chats = db.chats || [];
    db.pending = db.pending || [];
    db.folders = db.folders || [];
    db.messageUsage = db.messageUsage || {};
} catch (error) {
    console.error('Ошибка при чтении базы данных:', error);
    db = defaultDb;
}

function saveDb() {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
    } catch (error) {
        console.error('Ошибка при сохранении базы данных:', error);
    }
}

// --- Лимиты сообщений ---
const MESSAGE_LIMITS = {
    FREE_MESSAGES: 5,
    PRO_MESSAGES: 150,
    RESET_HOURS: 6
};

// Функция проверки лимитов сообщений
function checkMessageLimits(username, isPro) {
    if (!db.messageUsage[username]) {
        db.messageUsage[username] = {
            count: 0,
            resetTime: Date.now() + (MESSAGE_LIMITS.RESET_HOURS * 3600000)
        };
    }

    const usage = db.messageUsage[username];
    const now = Date.now();

    // Сброс счетчика если время истекло
    if (now >= usage.resetTime) {
        usage.count = 0;
        usage.resetTime = now + (MESSAGE_LIMITS.RESET_HOURS * 3600000);
    }

    const limit = isPro ? MESSAGE_LIMITS.PRO_MESSAGES : MESSAGE_LIMITS.FREE_MESSAGES;

    return {
        remaining: Math.max(0, limit - usage.count),
        resetTime: usage.resetTime,
        canSend: usage.count < limit,
        limit: limit,
        isPro: isPro
    };
}

// Функция обновления счетчика сообщений
function incrementMessageCount(username) {
    const usage = db.messageUsage[username];
    if (usage) {
        usage.count++;
        saveDb();
    }
}

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
    const { query } = req.query;
    let userChats = db.chats.filter(c => c.username === req.user.username);
    
    if (query) {
        const searchQuery = query.toLowerCase();
        userChats = userChats.filter(chat => {
            // Поиск по заголовку
            if (chat.title.toLowerCase().includes(searchQuery)) return true;
            
            // Поиск по содержимому сообщений
            return chat.messages.some(msg => 
                msg.text.toLowerCase().includes(searchQuery)
            );
        });
    }
    
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

    const user = db.users.find(u => u.username === req.user.username);
    
    // Проверяем, добавляется ли новое сообщение от пользователя
    const oldMessages = chat.messages || [];
    const newMessages = req.body.messages || [];
    const oldUserMsgCount = oldMessages.filter(m => m.sender === 'user').length;
    const newUserMsgCount = newMessages.filter(m => m.sender === 'user').length;
    
    if (newUserMsgCount > oldUserMsgCount) {
        // Если добавляется новое сообщение пользователя
        const limits = checkMessageLimits(req.user.username, user.isPro);
        if (!limits.canSend) {
            return res.status(429).json({
                error: `Достигнут лимит сообщений (${limits.limit})`,
                resetTime: limits.resetTime,
                limit: limits.limit,
                remaining: limits.remaining
            });
        }
        incrementMessageCount(req.user.username);
    }

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

// --- CRUD для папок ---
app.get('/api/folders', auth, (req, res) => {
    const userFolders = db.folders.filter(f => f.username === req.user.username);
    res.json(userFolders);
});

app.post('/api/folders', auth, (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: 'Имя папки обязательно' });
        
        if (!Array.isArray(db.folders)) {
            db.folders = [];
        }
        
        const folder = {
            id: Date.now(),
            username: req.user.username,
            name,
            chatIds: []
        };
        
        db.folders.push(folder);
        saveDb();
        res.json(folder);
    } catch (error) {
        console.error('Ошибка при создании папки:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

app.put('/api/folders/:id', auth, (req, res) => {
    const folder = db.folders.find(f => f.id == req.params.id && f.username === req.user.username);
    if (!folder) return res.status(404).json({ error: 'Папка не найдена' });
    
    if (req.body.name) folder.name = req.body.name;
    if (req.body.chatIds) folder.chatIds = req.body.chatIds;
    
    saveDb();
    res.json(folder);
});

app.delete('/api/folders/:id', auth, (req, res) => {
    const folderIndex = db.folders.findIndex(f => f.id == req.params.id && f.username === req.user.username);
    if (folderIndex === -1) return res.status(404).json({ error: 'Папка не найдена' });
    
    db.folders.splice(folderIndex, 1);
    saveDb();
    res.json({ ok: true });
});

// Обновляем endpoint для перемещения чата в папку
app.post('/api/chats/:chatId/move', auth, async (req, res) => {
    try {
        const { folderId } = req.body;
        const chatId = parseInt(req.params.chatId);
        
        // Находим чат
        const chat = db.chats.find(c => c.id === chatId && c.username === req.user.username);
        if (!chat) return res.status(404).json({ error: 'Чат не найден' });
        
        // Проверяем существование массива папок
        if (!Array.isArray(db.folders)) {
            db.folders = [];
        }
        
        // Удаляем чат из всех папок пользователя
        db.folders
            .filter(f => f.username === req.user.username)
            .forEach(folder => {
                if (!Array.isArray(folder.chatIds)) {
                    folder.chatIds = [];
                }
                folder.chatIds = folder.chatIds.filter(id => id !== chatId);
            });
        
        // Если указан folderId, добавляем в новую папку
        if (folderId) {
            const folder = db.folders.find(f => f.id == folderId && f.username === req.user.username);
            if (!folder) return res.status(404).json({ error: 'Папка не найдена' });
            if (!Array.isArray(folder.chatIds)) {
                folder.chatIds = [];
            }
            if (!folder.chatIds.includes(chatId)) {
                folder.chatIds.push(chatId);
            }
        }
        
        saveDb();
        res.json({ 
            ok: true,
            folders: db.folders.filter(f => f.username === req.user.username)
        });
    } catch (error) {
        console.error('Ошибка при перемещении чата:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

// --- Лимиты сообщений ---
app.get('/api/message-limits', auth, (req, res) => {
    const user = db.users.find(u => u.username === req.user.username);
    const limits = checkMessageLimits(req.user.username, user.isPro);
    res.json(limits);
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

// Новый эндпоинт: список всех пользователей для выдачи Pro
app.get('/api/admin/users', (req, res) => {
    // (Можно добавить простую защиту по IP или секрету, если нужно)
    res.json(db.users.map(u => ({
        username: u.username,
        displayName: u.displayName,
        isPro: !!u.isPro
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

// Новый endpoint для потокового чата
app.post('/api/chat/stream', auth, async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
        const response = await fetch(`${serverUrl}/v1/chat/completions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...req.body,
                stream: true // Включаем поток
            })
        });

        // Создаем Reader для чтения потока
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            // Декодируем и отправляем каждый чанк
            const chunk = decoder.decode(value);
            res.write(`data: ${chunk}\n\n`);
        }

        res.write('event: done\ndata: [DONE]\n\n');
        res.end();
    } catch (error) {
        console.error('Stream error:', error);
        res.write(`event: error\ndata: ${error.message}\n\n`);
        res.end();
    }
});

// --- Конфиг для tunnelmole monitorUrl ---
const CONFIG_FILE = './config.json';
const defaultConfig = {
    monitorUrl: 'https://rp1wro-ip-95-56-104-203.tunnelmole.net/data'
};
let config;
try {
    config = fs.existsSync(CONFIG_FILE)
        ? JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'))
        : defaultConfig;
} catch {
    config = defaultConfig;
}
function saveConfig() {
    try {
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
    } catch (e) {
        console.error('Ошибка при сохранении config.json:', e);
    }
}

// --- API: получить ссылку monitorUrl ---
app.get('/api/monitor-url', (req, res) => {
    res.json({ monitorUrl: config.monitorUrl });
});

// --- API: изменить ссылку monitorUrl (требует простой секрет) ---
app.post('/api/monitor-url', (req, res) => {
    // Можно добавить простую защиту, например, секрет в теле запроса
    const { monitorUrl, adminSecret } = req.body;
    if (adminSecret !== '65195') return res.status(403).json({ error: 'Нет доступа' });
    if (!monitorUrl || typeof monitorUrl !== 'string') return res.status(400).json({ error: 'Некорректная ссылка' });
    config.monitorUrl = monitorUrl;
    saveConfig();
    res.json({ ok: true, monitorUrl });
});

// --- Новый endpoint для уменьшения лимита сообщений ---
app.post('/api/message-limits/decrement', auth, (req, res) => {
    const user = db.users.find(u => u.username === req.user.username);
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    const usage = db.messageUsage[req.user.username];
    if (!usage) return res.status(400).json({ error: 'Лимиты не инициализированы' });

    const limits = checkMessageLimits(req.user.username, user.isPro);
    if (!limits.canSend) {
        return res.status(429).json({
            error: `Достигнут лимит сообщений (${limits.limit})`,
            resetTime: limits.resetTime,
            limit: limits.limit,
            remaining: limits.remaining
        });
    }

    // Уменьшаем счетчик сообщений
    incrementMessageCount(req.user.username);
    res.json({ ok: true, remaining: limits.remaining - 1 });
});

// --- Запуск ---
app.listen(PORT, () => {
    console.log('ReflexAI сервер запущен на http://localhost:' + PORT);
});

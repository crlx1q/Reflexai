const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cors = require('cors');
// Динамический импорт node-fetch, как вы и сделали
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

const app = express();
const SECRET = 'supersecretkey';
const PORT = 8000;

const LLAMA_SERVER_URL = 'https://excited-lark-witty.ngrok-free.app';

const DB_FILE = './db.json';
const defaultDb = {
    users: [],
    chats: [],
    pending: [],
    folders: [],
    messageUsage: {}
};

let db;
try {
    db = fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE, 'utf8')) : defaultDb;
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
        // console.log('[DB Save] База данных успешно сохранена.'); // Лог для подтверждения сохранения
    } catch (error) {
        console.error('Ошибка при сохранении базы данных:', error);
    }
}

const MESSAGE_LIMITS = {
    FREE_MESSAGES: 5,
    PRO_MESSAGES: 150,
    RESET_HOURS: 6
};

function checkMessageLimits(username, isPro) {
    if (!db.messageUsage[username]) {
        db.messageUsage[username] = {
            count: 0,
            resetTime: Date.now() + (MESSAGE_LIMITS.RESET_HOURS * 3600000)
        };
    }
    const usage = db.messageUsage[username];
    const now = Date.now();
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

function incrementMessageCount(username) {
    const usage = db.messageUsage[username];
    if (usage) {
        const user = db.users.find(u => u.username === username);
        const limits = checkMessageLimits(username, user ? user.isPro : false);
        if (usage.count < limits.limit) {
            usage.count++;
            saveDb();
        }
    }
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

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

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = db.users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ error: 'Неверные данные' });
    const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '7d' });
    res.json({ token });
});

app.get('/api/me', auth, (req, res) => {
    const user = db.users.find(u => u.username === req.user.username);
    if (!user) return res.status(401).json({ error: 'Нет пользователя' });
    res.json({ username: user.username, displayName: user.displayName, isPro: !!user.isPro });
});

app.get('/api/chats', auth, (req, res) => {
    const { query } = req.query;
    let userChats = db.chats.filter(c => c.username === req.user.username);
    if (query) {
        const searchQuery = query.toLowerCase();
        userChats = userChats.filter(chat => {
            if (chat.title && chat.title.toLowerCase().includes(searchQuery)) return true;
            return chat.messages && chat.messages.some(msg => msg.text && msg.text.toLowerCase().includes(searchQuery));
        });
    }
    res.json(userChats.sort((a, b) => (b.lastUpdated || b.id) - (a.lastUpdated || a.id)));
});

app.post('/api/chats', auth, (req, res) => {
    const id = Date.now();
    const chat = { id, username: req.user.username, title: req.body.title || '', messages: req.body.messages || [], lastUpdated: Date.now() };
    db.chats.push(chat);
    saveDb();
    res.status(201).json(chat);
});

app.put('/api/chats/:id', auth, (req, res) => {
    const chatId = parseInt(req.params.id, 10);
    const chatIndex = db.chats.findIndex(c => c.id === chatId && c.username === req.user.username);
    if (chatIndex === -1) return res.status(404).json({ error: 'Нет чата' });

    const chat = db.chats[chatIndex];
    const user = db.users.find(u => u.username === req.user.username);
    const oldMessages = chat.messages || [];
    const newMessages = req.body.messages || [];
    // --- Лимит применяется только если добавлено новое сообщение от ИИ ---
    // Считаем количество сообщений от ИИ до и после
    const oldAiCount = oldMessages.filter(m => m.sender === 'ai').length;
    const newAiCount = newMessages.filter(m => m.sender === 'ai').length;
    const aiDelta = newAiCount - oldAiCount;

    // Найти новые AI сообщения
    let newAiMessages = [];
    if (aiDelta > 0) {
        // Получаем только новые AI сообщения
        newAiMessages = newMessages.slice(-aiDelta);
    }

    const limits = checkMessageLimits(req.user.username, user.isPro);
    // Проверяем, есть ли среди новых AI сообщений такие, которые НЕ являются спец-командой
    const shouldDecrement = newAiMessages.some(m => !isSpecialCommandReply(m.text));
    if (aiDelta > 0 && shouldDecrement && !limits.canSend) {
        return res.status(429).json({ error: `Достигнут лимит сообщений (${limits.limit})`, resetTime: limits.resetTime, limit: limits.limit, remaining: limits.remaining });
    }
    chat.title = req.body.title !== undefined ? req.body.title : chat.title;
    chat.messages = newMessages;
    chat.lastUpdated = Date.now();
    db.chats[chatIndex] = chat;
    // Уменьшаем лимит только если реально добавили новое AI сообщение, которое не является спец-командой
    if (aiDelta > 0 && shouldDecrement) {
        incrementMessageCount(req.user.username);
    }
    saveDb();
    res.json(chat);
});

app.delete('/api/chats/:id', auth, (req, res) => {
    const chatId = parseInt(req.params.id, 10);
    const initialLength = db.chats.length;
    db.chats = db.chats.filter(c => !(c.id === chatId && c.username === req.user.username));
    if (db.chats.length < initialLength) {
        db.folders.forEach(folder => {
            if (folder.username === req.user.username && folder.chatIds) {
                folder.chatIds = folder.chatIds.filter(id => id !== chatId);
            }
        });
        saveDb();
        res.json({ ok: true });
    } else {
        res.status(404).json({ error: 'Чат не найден или нет прав на удаление' });
    }
});

// --- SSE: подписчики для фоновых событий ---
const backgroundEventClients = [];

app.get('/api/background-events', auth, (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
    const client = { res, username: req.user.username };
    backgroundEventClients.push(client);

    req.on('close', () => {
        const idx = backgroundEventClients.indexOf(client);
        if (idx !== -1) backgroundEventClients.splice(idx, 1);
    });
});

// --- ЭНДПОИНТ для фоновой обработки запроса ИИ ---
app.post('/api/chat/background-request', auth, async (req, res) => {
    const { chatId: originalChatId, userMessage, chatHistory, temperature, topP, disableSystemReflex, systemMessageContent } = req.body;
    const { username } = req.user;

    // Преобразуем chatId в число сразу и проверяем
    const numericChatId = parseInt(originalChatId, 10);
    if (isNaN(numericChatId)) {
        console.error(`[Background AI] Invalid chatId received: ${originalChatId}. Must be a number or convertible to one. User: ${username}`);
        // Не отправляем 202, если chatId некорректен для фоновой задачи
        return res.status(400).json({ message: "Invalid chatId for background request." });
    }

    // 1. Немедленно отвечаем клиенту, что запрос принят
    console.log(`[Background AI] Received request for chat ${numericChatId}, user ${username}. Sending 202 Accepted.`);
    res.status(202).json({ message: "Запрос принят в обработку." });

    // 2. Выполняем остальную логику асинхронно
    (async () => {
        console.log(`[Background AI] Task started for user ${username}, chat ${numericChatId}. Message: "${userMessage.substring(0, 50)}..."`);
        try {
            const user = db.users.find(u => u.username === username);
            if (!user) {
                console.error(`[Background AI] User ${username} not found for chat ${numericChatId}.`);
                return;
            }

            const limits = checkMessageLimits(username, user.isPro);
            if (!limits.canSend) {
                console.warn(`[Background AI] User ${username} limit reached for chat ${numericChatId}. Aborting.`);
                const chatToUpdate = db.chats.find(c => c.id === numericChatId && c.username === username);
                if (chatToUpdate) {
                    chatToUpdate.messages.push({
                        text: `Фоновый запрос не выполнен: достигнут лимит сообщений (${limits.limit}).`,
                        sender: 'system'
                    });
                    chatToUpdate.lastUpdated = Date.now();
                    saveDb();
                     console.log(`[Background AI] System message about limit saved to chat ${numericChatId}.`);
                }
                return;
            }
            console.log(`[Background AI] Limits OK for user ${username}. Proceeding with LLaMA call for chat ${numericChatId}`);

            const messagesPayload = [];
            if (!disableSystemReflex && systemMessageContent) {
                messagesPayload.push({ role: 'system', content: systemMessageContent });
            }
            messagesPayload.push(...(chatHistory || []));
            messagesPayload.push({ role: 'user', content: userMessage });

            console.log(`[Background AI] Sending to LLaMA for chat ${numericChatId}. Payload messages count: ${messagesPayload.length}`);
            
            const llamaResponse = await fetch(`${LLAMA_SERVER_URL}/v1/chat/completions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: messagesPayload,
                    temperature: temperature,
                    top_p: topP
                }),
            });
            console.log(`[Background AI] LLaMA response status for chat ${numericChatId}: ${llamaResponse.status}`);

            if (!llamaResponse.ok) {
                const errorText = await llamaResponse.text();
                console.error(`[Background AI] LLaMA server error for chat ${numericChatId}. Status: ${llamaResponse.status}. Body: ${errorText.substring(0, 500)}...`);
                const chatToUpdateOnError = db.chats.find(c => c.id === numericChatId && c.username === username);
                if (chatToUpdateOnError) {
                    chatToUpdateOnError.messages.push({
                        text: `Ошибка при обработке фонового запроса к ИИ: ${llamaResponse.statusText}`,
                        sender: 'system'
                    });
                    chatToUpdateOnError.lastUpdated = Date.now();
                    saveDb();
                    console.log(`[Background AI] System message about LLaMA error saved to chat ${numericChatId}.`);
                }
                return;
            }

            const llamaData = await llamaResponse.json();
            const aiReply = llamaData.choices && llamaData.choices[0] && llamaData.choices[0].message && llamaData.choices[0].message.content
                ? llamaData.choices[0].message.content
                : 'Ошибка: получен пустой ответ от ИИ.';
            console.log(`[Background AI] Parsed AI reply for chat ${numericChatId}. Length: ${aiReply.length}`);

            const chatIndex = db.chats.findIndex(c => c.id === numericChatId && c.username === username);
            if (chatIndex !== -1) {
                console.log(`[Background AI] Found chat for ID ${numericChatId} at index ${chatIndex}. Current messages count: ${db.chats[chatIndex].messages.length}`);
                db.chats[chatIndex].messages.push({ text: aiReply, sender: 'ai' });
                db.chats[chatIndex].lastUpdated = Date.now();
                // --- Уменьшаем лимит только если AI-ответ не спец-команда ---
                if (!isSpecialCommandReply(aiReply)) {
                    incrementMessageCount(username);
                }
                saveDb();
                console.log(`[Background AI] Message count incremented for user ${username}. Chat ID: ${numericChatId}`);

                // --- Уведомляем клиента через SSE ---
                backgroundEventClients.forEach(client => {
                    if (client.username === username) {
                        client.res.write(`data: ${JSON.stringify({ chatId: numericChatId, aiReply })}\n\n`);
                    }
                });
            } else {
                console.error(`[Background AI] Chat with ID ${numericChatId} for user ${username} NOT FOUND for saving AI reply.`);
            }
            console.log(`[Background AI] Task finished successfully for user ${username}, chat ${numericChatId}.`);

        } catch (error) {
            console.error(`[Background AI] CRITICAL ERROR in background task for chat ${numericChatId} (original chatId: ${originalChatId}), user ${username}:`, error.message, error.stack);
            const chatToUpdateOnCriticalError = db.chats.find(c => c.id === numericChatId && c.username === username);
            if (chatToUpdateOnCriticalError) {
                chatToUpdateOnCriticalError.messages.push({
                    text: `Критическая ошибка при обработке фонового запроса. Проверьте логи сервера.`,
                    sender: 'system'
                });
                chatToUpdateOnCriticalError.lastUpdated = Date.now();
                saveDb();
                 console.log(`[Background AI] System message about CRITICAL error saved to chat ${numericChatId}.`);
            }
        }
    })();
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
        if (!Array.isArray(db.folders)) db.folders = [];
        const folder = { id: Date.now(), username: req.user.username, name, chatIds: [] };
        db.folders.push(folder);
        saveDb();
        res.status(201).json(folder);
    } catch (error) {
        console.error('Ошибка при создании папки:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

app.put('/api/folders/:id', auth, (req, res) => {
    const folderId = parseInt(req.params.id, 10);
    const folder = db.folders.find(f => f.id === folderId && f.username === req.user.username);
    if (!folder) return res.status(404).json({ error: 'Папка не найдена' });
    if (req.body.name !== undefined) folder.name = req.body.name;
    if (req.body.chatIds !== undefined) folder.chatIds = req.body.chatIds;
    saveDb();
    res.json(folder);
});

app.delete('/api/folders/:id', auth, (req, res) => {
    const folderId = parseInt(req.params.id, 10);
    const folderIndex = db.folders.findIndex(f => f.id === folderId && f.username === req.user.username);
    if (folderIndex === -1) return res.status(404).json({ error: 'Папка не найдена' });
    db.folders.splice(folderIndex, 1);
    saveDb();
    res.json({ ok: true });
});

app.post('/api/chats/:chatId/move', auth, async (req, res) => {
    try {
        const { folderId: targetFolderId } = req.body;
        const chatId = parseInt(req.params.chatId, 10);
        const chat = db.chats.find(c => c.id === chatId && c.username === req.user.username);
        if (!chat) return res.status(404).json({ error: 'Чат не найден' });
        if (!Array.isArray(db.folders)) db.folders = [];
        db.folders.forEach(folder => {
            if (folder.username === req.user.username && Array.isArray(folder.chatIds)) {
                folder.chatIds = folder.chatIds.filter(id => id !== chatId);
            }
        });
        if (targetFolderId !== null && targetFolderId !== undefined) {
            const targetFolder = db.folders.find(f => f.id == targetFolderId && f.username === req.user.username);
            if (!targetFolder) return res.status(404).json({ error: 'Целевая папка не найдена' });
            if (!Array.isArray(targetFolder.chatIds)) targetFolder.chatIds = [];
            if (!targetFolder.chatIds.includes(chatId)) {
                targetFolder.chatIds.push(chatId);
            }
        }
        saveDb();
        const userFolders = db.folders.filter(f => f.username === req.user.username);
        const userChats = db.chats.filter(c => c.username === req.user.username).sort((a, b) => (b.lastUpdated || b.id) - (a.lastUpdated || a.id));
        res.json({ ok: true, folders: userFolders, chats: userChats });
    } catch (error) {
        console.error('Ошибка при перемещении чата:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

app.get('/api/message-limits', auth, (req, res) => {
    const user = db.users.find(u => u.username === req.user.username);
    if (!user) return res.status(404).json({ error: "Пользователь не найден для получения лимитов" });
    const limits = checkMessageLimits(req.user.username, user.isPro);
    res.json(limits);
});

app.put('/api/me', auth, (req, res) => {
    const { displayName } = req.body;
    if (displayName === undefined || typeof displayName !== 'string') {
        return res.status(400).json({ error: 'Некорректное отображаемое имя' });
    }
    const user = db.users.find(u => u.username === req.user.username);
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
    user.displayName = displayName.trim();
    saveDb();
    res.json({ username: user.username, displayName: user.displayName, isPro: !!user.isPro });
});

app.post('/api/admin/setpro', (req, res) => {
    const { username, isPro } = req.body;
    const user = db.users.find(u => u.username === username);
    if (!user) return res.status(404).json({ error: 'Нет пользователя' });
    user.isPro = !!isPro;
    saveDb();
    res.json({ ok: true, message: `Статус Pro для ${username} обновлен.` });
});

app.get('/api/admin/pending', (req, res) => {
    res.json(db.pending.map(u => ({ username: u.username, displayName: u.displayName })));
});

app.get('/api/admin/users', (req, res) => {
    res.json(db.users.map(u => ({ username: u.username, displayName: u.displayName, isPro: !!u.isPro })));
});

app.post('/api/admin/approve', (req, res) => {
    const { username, accept } = req.body;
    const idx = db.pending.findIndex(u => u.username === username);
    if (idx === -1) return res.status(404).json({ error: 'Нет такого пользователя в ожидании' });
    const userToProcess = db.pending[idx];
    db.pending.splice(idx, 1);
    if (accept) {
        db.users.push({ username: userToProcess.username, password: userToProcess.password, displayName: userToProcess.displayName, isPro: false });
        saveDb();
        return res.json({ ok: true, message: 'Пользователь подтвержден' });
    } else {
        saveDb();
        return res.json({ ok: true, message: 'Пользователь отклонен' });
    }
});

app.post('/api/chat/stream', auth, async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    try {
        const llamaStreamResponse = await fetch(`${LLAMA_SERVER_URL}/v1/chat/completions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...req.body, stream: true })
        });
        if (!llamaStreamResponse.ok) {
            const errorBody = await llamaStreamResponse.text();
            throw new Error(`LLaMA stream API error: ${llamaStreamResponse.status} ${errorBody}`);
        }
        const reader = llamaStreamResponse.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            res.write(`data: ${chunk}\n\n`);
        }
        res.write('event: done\ndata: [DONE]\n\n');
    } catch (error) {
        console.error('Stream error:', error);
        res.write(`event: error\ndata: ${JSON.stringify({ message: error.message || "Stream failed" })}\n\n`);
    } finally {
        res.end();
    }
});

const CONFIG_FILE = './config.json';
const defaultConfig = { monitorUrl: 'https://excited-lark-witty.ngrok-free.app/data' };
let config;
try {
    config = fs.existsSync(CONFIG_FILE) ? JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')) : defaultConfig;
} catch { config = defaultConfig; }

function saveConfig() {
    try { fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2)); }
    catch (e) { console.error('Ошибка при сохранении config.json:', e); }
}

app.get('/api/monitor-url', (req, res) => res.json({ monitorUrl: config.monitorUrl }));

app.post('/api/monitor-url', (req, res) => {
    const { monitorUrl, adminSecret } = req.body;
    if (adminSecret !== '65195') return res.status(403).json({ error: 'Нет доступа' });
    if (!monitorUrl || typeof monitorUrl !== 'string') return res.status(400).json({ error: 'Некорректная ссылка' });
    config.monitorUrl = monitorUrl;
    saveConfig();
    res.json({ ok: true, monitorUrl });
});

app.post('/api/message-limits/decrement', auth, (req, res) => {
    const user = db.users.find(u => u.username === req.user.username);
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
    const limits = checkMessageLimits(req.user.username, user.isPro);
    if (!limits.canSend) {
        return res.status(429).json({ error: `Достигнут лимит сообщений (${limits.limit})`, resetTime: limits.resetTime, limit: limits.limit, remaining: limits.remaining });
    }
    incrementMessageCount(req.user.username);
    const newLimits = checkMessageLimits(req.user.username, user.isPro);
    res.json({ ok: true, remaining: newLimits.remaining, limit: newLimits.limit, resetTime: newLimits.resetTime });
});

app.listen(PORT, () => {
    console.log(`ReflexAI сервер (с улучшенной фоновой обработкой) запущен на http://localhost:${PORT}`);
});

// Проверка: является ли текст спец-командой (например, @ командами)
function isSpecialCommandReply(text) {
    if (!text) return false;
    // Добавьте сюда все спец-ответы, которые не должны уменьшать лимит
    // Например, все ответы на команды из index.js/COMMANDS
    const specialPatterns = [
        /^Текущий заряд батареи:/i,
        /^Текущая температура сервера:/i,
        /^Время работы сервера:/i,
        /^Доступные команды:/i
    ];
    return specialPatterns.some(re => re.test(text.trim()));
}

// Ожидание полной загрузки DOM перед выполнением скрипта
document.addEventListener('DOMContentLoaded', () => {
    // Получение ссылок на DOM-элементы
    const body = document.body;
    const loadingScreen = document.getElementById('loadingScreen'); // Экран загрузки
    const appContainer = document.querySelector('.app-container'); // Основной контейнер приложения
    const sidebar = document.querySelector('.sidebar'); // Боковая панель
    const btnToggleSidebar = document.querySelector('.btn-toggle-sidebar'); // Кнопка переключения боковой панели
    const btnCloseSidebar = document.querySelector('.btn-close-sidebar'); // Кнопка закрытия боковой панели (мобильная)
    const sidebarOverlay = document.querySelector('.sidebar-overlay'); // Оверлей для боковой панели (мобильная)
    const mainHeader = document.querySelector('.main-header'); // Шапка основного контента
    const mobileHeaderInfo = document.querySelector('.mobile-header-info'); // Инфо в шапке для мобильных
    const chatArea = document.querySelector('.chat-area'); // Область чата

    const settingsPanel = document.querySelector('.settings-panel'); // Панель настроек
    const btnSettings = document.querySelector('.btn-settings-header'); // Кнопка открытия настроек в шапке
    const btnCloseSettings = document.querySelector('.btn-close-settings'); // Кнопка закрытия настроек
    const settingsTabs = document.querySelectorAll('.settings-tabs .tab-link'); // Вкладки настроек
    const settingsTabContents = document.querySelectorAll('.settings-content .tab-content'); // Содержимое вкладок настроек
    const colorSchemeSelect = document.getElementById('color-scheme'); // Выбор цветовой схемы
    const themeColorPickers = document.querySelectorAll('.theme-color-picker .color-option'); // Выбор цвета темы
    const messageInput = document.getElementById('messageInput'); // Поле ввода сообщения
    const btnSend = document.getElementById('sendButton'); // Кнопка отправки сообщения
    const chatMessagesContainer = document.getElementById('chatMessages');  // Контейнер для сообщений чата
    const enterSubmitsChatToggle = document.getElementById('enter-submits'); // Переключатель "Enter отправляет сообщение"
    const chatsListUl = document.querySelector('.chats-list'); // Список чатов
    const advancedSettingsToggle = document.querySelector('.advanced-settings-toggle'); // Переключатель расширенных настроек
    const advancedSettingsContent = document.querySelector('.advanced-settings-content'); // Содержимое расширенных настроек

    const subscriptionModal = document.getElementById('subscriptionModal'); // Модальное окно подписки
    const upgradeToProLinks = document.querySelectorAll('.upgrade-to-pro-link'); // Ссылки "Улучшить до Pro"
    const closeSubscriptionModalBtn = document.getElementById('closeSubscriptionModal'); // Кнопка закрытия модального окна подписки
    const subscriptionToggleBtns = document.querySelectorAll('.subscription-toggle .sub-toggle-btn'); // Кнопки выбора периода подписки
    const subscriptionPriceEl = document.getElementById('subscriptionPrice'); // Элемент для отображения цены подписки
    const subscriptionPeriodEl = document.getElementById('subscriptionPeriod'); // Элемент для отображения периода подписки

    const webSearchBtn = document.getElementById('webSearchBtn'); // Кнопка "Веб-поиск" в поле ввода
    const webEnabledCheckbox = document.getElementById('web-enabled'); // Чекбокс "Веб включен" в настройках
    const codeActionBtn = document.getElementById('codeActionBtn'); // Кнопка "Код" в поле ввода
    const codeActionStorageKey = 'codeActionActive'; // Ключ для сохранения состояния кнопки "Код"
    const voiceInputBtn = document.getElementById('voiceInputBtn'); // Кнопка голосового ввода

    // URL для SVG иконки Reflex
    const reflexSvgUrl = "reflex.svg";

    const monthlyPrice = 10; // Месячная цена подписки
    const yearlyPrice = 100; // Годовая цена подписки

    // Новый элемент для анимации "ИИ печатает..."
    const aiTypingIndicator = document.getElementById('aiTypingIndicator');

    // --- Мини-монитор температуры и батареи ---
    const miniTempValue = document.getElementById('miniTempValue');
    const miniTempBar = document.getElementById('miniTempBar');
    const miniTempIcon = document.getElementById('miniTempIcon');
    const miniBatteryValue = document.getElementById('miniBatteryValue');
    const miniBatteryBar = document.getElementById('miniBatteryBar');
    const miniBatteryIcon = document.getElementById('miniBatteryIcon');

    const thermometerSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>`;
    const batteryIcons = {
        low: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect><line x1="22" x2="22" y1="11" y2="13"></line><line x1="6" x2="6" y1="12" y2="12"></line></svg>`,
        medium: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect><line x1="22" x2="22" y1="11" y2="13"></line><line x1="6" x2="6" y1="12" y2="12"></line><line x1="10" x2="10" y1="12" y2="12"></line></svg>`,
        full: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect><line x1="22" x2="22" y1="11" y2="13"></line><line x1="6" x2="6" y1="12" y2="12"></line><line x1="10" x2="10" y1="12" y2="12"></line><line x1="14" x2="14" y1="12" y2="12"></line></svg>`
    };
    const chargingSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>`;

    let MINI_MONITOR_CONFIG = {
        minTemperature: 25,
        maxTemperature: 45,
        dataUrl: '', 
        refreshInterval: 5000
    };

    async function fetchMonitorUrl() {
        try {
            const resp = await fetch('/api/monitor-url');
            if (resp.ok) {
                const data = await resp.json();
                MINI_MONITOR_CONFIG.dataUrl = data.monitorUrl;
            } else {
                MINI_MONITOR_CONFIG.dataUrl = '';
            }
        } catch {
            MINI_MONITOR_CONFIG.dataUrl = '';
        }
    }

    let lastMiniMonitorData = {
        temperature: null,
        batteryPercentage: null,
        batteryStatus: null,
        health: null,
        plugged: null,
        uptimeSeconds: null
    };

    function updateMiniTemp(temp) {
        if (!miniTempValue || !miniTempBar || !miniTempIcon) return;
        const min = MINI_MONITOR_CONFIG.minTemperature;
        const max = MINI_MONITOR_CONFIG.maxTemperature;
        miniTempValue.textContent = `${temp.toFixed(1)}°C`;
        let percent = ((temp - min) / (max - min)) * 100;
        percent = Math.max(0, Math.min(100, percent));
        miniTempBar.style.width = `${percent}%`;
        let color = '#22c55e'; 
        if (temp >= 39) color = '#ef4444'; 
        else if (temp > 35) color = '#fde047'; 
        miniTempBar.style.background = color;
        miniTempIcon.innerHTML = thermometerSVG;
        miniTempIcon.style.color = color;
        miniTempValue.style.color = color;
    }

    function updateMiniBattery(percent, status) {
        if (!miniBatteryValue || !miniBatteryBar || !miniBatteryIcon) return;
        miniBatteryValue.textContent = `${percent}%`;
        miniBatteryBar.style.width = `${percent}%`;
        let iconSVG = batteryIcons.medium;
        let color = '#fde047'; 
        if (percent >= 50) { iconSVG = batteryIcons.full; color = '#22c55e'; }
        else if (percent < 25) { iconSVG = batteryIcons.low; color = '#ef4444'; }
        if (status && (status === 'CHARGING' || status === 'FULL' || status === 'PLUGGED')) {
            iconSVG += `<span class="battery-charging-icon" style="position:absolute;left:2px;top:2px;color:#facc15;">${chargingSVG}</span>`;
            miniBatteryIcon.innerHTML = iconSVG;
            miniBatteryIcon.style.position = 'relative';
        } else {
            miniBatteryIcon.innerHTML = iconSVG;
            miniBatteryIcon.style.position = '';
        }
        miniBatteryBar.style.background = color;
        miniBatteryIcon.style.color = color;
        miniBatteryValue.style.color = color;
    }

    async function fetchMiniMonitorData() {
        if (!MINI_MONITOR_CONFIG.dataUrl) return; // Не делаем запрос, если URL не получен
        try {
            const response = await fetch(MINI_MONITOR_CONFIG.dataUrl);
            if (!response.ok) throw new Error('Monitor data fetch failed');
            const data = await response.json();
            lastMiniMonitorData = {
                temperature: data.temperature,
                batteryPercentage: data.batteryPercentage,
                batteryStatus: data.batteryStatus,
                health: data.health,
                plugged: data.plugged,
                uptimeSeconds: data.uptimeSeconds
            };
            if (typeof data.temperature === 'number') updateMiniTemp(data.temperature);
            if (typeof data.batteryPercentage === 'number') updateMiniBattery(data.batteryPercentage, data.batteryStatus);
        } catch (err){
            // console.warn('Failed to fetch mini monitor data:', err.message);
            if (miniTempValue) { miniTempValue.textContent = '--°C'; if(miniTempBar) miniTempBar.style.width = '0%'; }
            if (miniBatteryValue) { miniBatteryValue.textContent = '--%'; if(miniBatteryBar) miniBatteryBar.style.width = '0%'; }
        }
    }

    (async function () {
        await fetchMonitorUrl();
        if (MINI_MONITOR_CONFIG.dataUrl) { // Запускаем интервал только если URL есть
           setInterval(fetchMiniMonitorData, MINI_MONITOR_CONFIG.refreshInterval);
           fetchMiniMonitorData(); // Первоначальная загрузка
        } else {
            console.warn("Monitor URL not available. Mini-monitor will not be updated.");
             if (miniTempValue) { miniTempValue.textContent = 'N/A'; if(miniTempBar) miniTempBar.style.width = '0%'; }
            if (miniBatteryValue) { miniBatteryValue.textContent = 'N/A'; if(miniBatteryBar) miniBatteryBar.style.width = '0%'; }
        }
    })();

    function getCurrentTemperature() {
        if (miniTempValue && miniTempValue.textContent && miniTempValue.textContent !== '--°C' && miniTempValue.textContent !== 'N/A') {
            return miniTempValue.textContent.replace(',', '.');
        }
        return 'Нет данных';
    }
    function getCurrentBattery() {
        if (miniBatteryValue && miniBatteryValue.textContent && miniBatteryValue.textContent !== '--%' && miniBatteryValue.textContent !== 'N/A') {
            let status = lastMiniMonitorData.batteryStatus;
            let percent = miniBatteryValue.textContent;
            if (status === 'CHARGING' || status === 'PLUGGED') {
                return `${percent} (заряжается)`;
            }
            return percent;
        }
        return 'Нет данных';
    }
    function formatUptime(seconds) {
        if (!seconds || isNaN(seconds)) return 'Нет данных';
        let s = Math.floor(seconds);
        const days = Math.floor(s / 86400);
        s %= 86400;
        const hours = Math.floor(s / 3600);
        s %= 3600;
        const minutes = Math.floor(s / 60);
        s %= 60;
        let parts = [];
        if (days > 0) parts.push(`${days} д.`);
        if (hours > 0) parts.push(`${hours} ч.`);
        if (minutes > 0) parts.push(`${minutes} мин.`);
        if (parts.length === 0 && s >= 0) parts.push(`${s} сек.`); // Показываем секунды, если нет других единиц
        return parts.length > 0 ? parts.join(' ') : 'Нет данных';
    }
    function getCurrentUptime() {
        return formatUptime(lastMiniMonitorData.uptimeSeconds);
    }

    let authToken = localStorage.getItem('authToken') || null;
    let currentUser = null;

    if (!authToken && !window.location.pathname.endsWith('auth.html')) {
        window.location.href = 'auth.html';
        return;
    }

    if (window.location.pathname.endsWith('auth.html') && authToken) {
        window.location.href = 'index.html';
        return;
    }

    async function fetchCurrentUser() {
        if (!authToken) return;
        try {
            let resp = await fetch('/api/me', { headers: { Authorization: 'Bearer ' + authToken } });
            if (!resp.ok) throw new Error('Failed to fetch user profile');
            currentUser = await resp.json();
        } catch {
            localStorage.removeItem('authToken');
            authToken = null;
            currentUser = null;
            window.location.href = 'auth.html';
        }
    }

    let chatHistory = []; // Это история текущего активного чата для отправки в ИИ
    let currentChatId = null;
    let allChats = []; // Массив всех чатов пользователя с сервера
    let tempNewChat = null; 

    async function syncChatsFromServer() {
        if (!authToken) return;
        try {
            let resp = await fetch('/api/chats', { headers: { Authorization: 'Bearer ' + authToken } });
            if (!resp.ok) { 
                console.error("Failed to sync chats from server", resp.status);
                allChats = []; 
                return; 
            }
            allChats = await resp.json();
            await renderChatsList(currentChatId);
        } catch (error) {
            console.error("Error syncing chats:", error);
            allChats = [];
        }
    }

    async function renderChatsList(selectedId) {
        if (!chatsListUl) return;
        chatsListUl.innerHTML = '';

        const displayChats = getChatsWithoutFolder(); // Чаты вне папок

        // Сортируем чаты по lastUpdated или id (новые сверху)
        const sortedDisplayChats = displayChats.sort((a, b) => (b.lastUpdated || b.id) - (a.lastUpdated || a.id));

        for (const chat of sortedDisplayChats) {
            const li = document.createElement('li');
            li.dataset.chatId = chat.id;
            li.className = (String(chat.id) === String(selectedId)) ? 'active-chat-item' : '';
            const titleSpan = document.createElement('span');
            titleSpan.className = 'chat-title';
            titleSpan.textContent = chat.title || 'Новый чат';
            titleSpan.title = chat.title || 'Новый чат';
            li.appendChild(titleSpan);

            const actions = document.createElement('span');
            actions.style.marginLeft = 'auto';
            actions.className = 'chat-actions'; // Добавляем класс для стилизации
            actions.innerHTML = `
                <button class="btn-icon btn-rename-chat" title="Переименовать"><i class="fas fa-pencil-alt"></i></button>
                <button class="btn-icon btn-delete-chat" title="Удалить"><i class="fas fa-trash"></i></button>
            `;
            li.appendChild(actions);

            chatsListUl.appendChild(li);
        }
        setupFolderDragAndDrop();
    }
    
    async function getChatById(id) { // Переименована для ясности
        if (tempNewChat && String(tempNewChat.id) === String(id)) return tempNewChat;
        return allChats.find(c => String(c.id) === String(id));
    }

    async function saveChatToServer(chatData) { // Переименована для ясности
        if (!authToken) return null;
        const isNewChat = String(chatData.id).startsWith('temp-');
        const url = isNewChat ? '/api/chats' : `/api/chats/${chatData.id}`;
        const method = isNewChat ? 'POST' : 'PUT';

        try {
            let resp = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + authToken },
                body: JSON.stringify(chatData) // Отправляем только необходимые данные
            });
            if (!resp.ok) {
                const errorData = await resp.json();
                console.error(`Failed to save chat (${method} ${url}):`, resp.status, errorData.error);
                addMessageToChat(`Ошибка сохранения чата: ${errorData.error || resp.statusText}`, 'system');
                return null;
            }
            const savedChat = await resp.json();
            
            // Обновляем локальный кеш allChats и currentChatId если это был новый чат
            if (isNewChat) {
                allChats.unshift(savedChat); // Добавляем в начало
                if (tempNewChat && String(tempNewChat.id) === String(chatData.id)) {
                    currentChatId = savedChat.id; // Обновляем ID текущего чата
                    tempNewChat = null; // Сбрасываем временный чат
                }
            } else {
                const index = allChats.findIndex(c => String(c.id) === String(savedChat.id));
                if (index !== -1) allChats[index] = savedChat;
                else allChats.unshift(savedChat); // Если вдруг не нашли, добавляем
            }
            await syncChatsFromServer(); // Перерисовываем списки
            return savedChat;

        } catch (error) {
            console.error("Error saving chat:", error);
            addMessageToChat(`Критическая ошибка сохранения чата.`, 'system');
            return null;
        }
    }
    
    async function deleteChatOnServer(id) {
        if (!authToken) return;
        try {
            await fetch('/api/chats/' + id, {
                method: 'DELETE',
                headers: { Authorization: 'Bearer ' + authToken }
            });
            allChats = allChats.filter(c => String(c.id) !== String(id)); // Удаляем из локального кеша
            // Удаляем из папок
            userFolders.forEach(folder => {
                if (folder.chatIds) {
                    folder.chatIds = folder.chatIds.filter(chatIdInFolder => String(chatIdInFolder) !== String(id));
                }
            });

            await renderChatsList(currentChatId); // Обновляем список чатов "без папки"
            await renderFolders(); // Обновляем список папок (и чатов в них)

            if (String(currentChatId) === String(id)) { // Если удален текущий чат
                if (allChats.length > 0) {
                    await switchChat(allChats[0].id); // Переключаемся на первый в списке
                } else {
                    await createNewChat(); // Или создаем новый, если список пуст
                }
            }
        } catch (error) {
            console.error("Error deleting chat:", error);
        }
    }

    async function createNewChat() {
        if (tempNewChat && (!tempNewChat.messages || tempNewChat.messages.length === 0)) {
            await switchChat(tempNewChat.id); // Если есть пустой временный чат, просто переключаемся
            return;
        }
        // Создаем новый временный чат
        tempNewChat = {
            id: 'temp-' + Date.now(),
            username: currentUser ? currentUser.username : 'unknown',
            title: '', // Пустой заголовок, будет установлен при первом сообщении
            messages: [],
            lastUpdated: Date.now()
        };
        currentChatId = tempNewChat.id;
        chatHistory = []; // Очищаем историю для ИИ
        if(chatMessagesContainer) chatMessagesContainer.innerHTML = ''; // Очищаем область сообщений
        
        // Добавляем временный чаat в начало allChats для отображения, но не сохраняем на сервере сразу
        const displayChats = [tempNewChat, ...allChats.filter(c => !String(c.id).startsWith('temp-'))];
        
        // Обновляем UI списков
        await renderChatsList(currentChatId); // Передаем ID нового временного чата
        await renderFolders(); // Папки тоже могут измениться, если там был активный чат

        if (messageInput) messageInput.focus();
        updateChatHeaderTitle(); // Обновляем заголовок в шапке
    }

    async function switchChat(id) {
        if (String(currentChatId) === String(id) && chatMessagesContainer.children.length > 0 && !String(id).startsWith('temp-')) {
             // Не переключаемся, если уже на этом чате и он не временный и не пустой
            return;
        }

        currentChatId = id;
        chatHistory = []; // Очищаем историю для ИИ для нового чата
        if(chatMessagesContainer) chatMessagesContainer.innerHTML = '';
    
        let chatToLoad = await getChatById(id);
    
        if (chatToLoad) {
            if (Array.isArray(chatToLoad.messages)) {
                for (const msg of chatToLoad.messages) {
                    addMessageToChat(msg.text, msg.sender, { noHistory: true }); // noHistory чтобы не дублировать в chatHistory
                    // Добавляем в chatHistory только для отправки в ИИ
                    if (msg.sender === 'user' || msg.sender === 'ai') {
                         chatHistory.push({ role: msg.sender, content: msg.text });
                    }
                }
            }
        } else {
            console.warn("Chat not found for ID:", id, "Attempting to sync from server.");
            await syncChatsFromServer(); // Попытка синхронизировать, если чат не найден локально
            chatToLoad = await getChatById(id); // Повторная попытка найти
            if (chatToLoad && Array.isArray(chatToLoad.messages)) { // Повторная загрузка сообщений
                 for (const msg of chatToLoad.messages) {
                    addMessageToChat(msg.text, msg.sender, { noHistory: true });
                     if (msg.sender === 'user' || msg.sender === 'ai') {
                         chatHistory.push({ role: msg.sender, content: msg.text });
                    }
                }
            } else if (!String(id).startsWith('temp-')) { // Если это не временный чат и он все еще не найден
                console.error("Chat still not found after sync. Creating a new one.");
                addMessageToChat(`Чат с ID ${id} не найден. Возможно, он был удален.`, 'system');
                await createNewChat(); // Создаем новый чат, если запрошенный не существует
                return; // Выходим, так как createNewChat уже установит currentChatId
            }
        }
        
        await renderChatsList(currentChatId);
        await renderFolders(); // Обновляем папки, т.к. активный чат мог быть в папке
        updateChatHeaderTitle(); // Обновляем заголовок в шапке
        if (messageInput) messageInput.focus();
    }
    
    async function saveMessageToCurrentChat(text, sender) {
        if (!currentChatId) return;
    
        let chat = await getChatById(currentChatId);
        if (!chat) { // Если чат не найден (например, tempNewChat еще не создан как объект)
            if (String(currentChatId).startsWith('temp-')) { // Это должен быть tempNewChat
                 console.warn("Tried to save message to a temp chat that wasn't fully initialized. This shouldn't happen.");
                 // Попытка восстановить tempNewChat, если он был сброшен
                 if (!tempNewChat || tempNewChat.id !== currentChatId) {
                    tempNewChat = { id: currentChatId, username: currentUser.username, title: '', messages: [], lastUpdated: Date.now() };
                 }
                 chat = tempNewChat;
            } else {
                console.error("Cannot save message: current chat not found.", currentChatId);
                return;
            }
        }
    
        chat.messages = chat.messages || [];
        chat.messages.push({ text, sender });
        chat.lastUpdated = Date.now(); // Обновляем время последнего сообщения
    
        // Если это временный чат и это первое сообщение пользователя, используем его как заголовок
        if (String(chat.id).startsWith('temp-') && sender === 'user' && chat.messages.length === 1) {
            chat.title = text.substring(0, 50); // Ограничиваем длину заголовка
        }
    
        // Сохраняем чат на сервере (это обработает и новые, и существующие чаты)
        const savedChat = await saveChatToServer({
            id: chat.id, // Важно передавать ID
            title: chat.title,
            messages: chat.messages,
            username: chat.username,
            lastUpdated: chat.lastUpdated
        });

        if (savedChat) {
            // Если это был tempNewChat, он теперь сохранен, и currentChatId мог обновиться
            if (String(chat.id).startsWith('temp-')) {
                // currentChatId уже должен быть обновлен внутри saveChatToServer
                // tempNewChat должен быть сброшен в null там же
            }
            // Обновляем allChats и UI
            await syncChatsFromServer(); // Чтобы получить актуальный список с сервера
        }
        updateChatHeaderTitle();
    }

    if (chatsListUl) {
        chatsListUl.addEventListener('click', async (e) => {
            const li = e.target.closest('li[data-chat-id]'); // Убедимся, что клик по элементу с data-chat-id
            if (!li) return;
            const chatId = li.dataset.chatId;
            if (!chatId) return;

            if (e.target.closest('.btn-rename-chat')) {
                const chat = await getChatById(chatId);
                if (!chat) return;
                const titleSpan = li.querySelector('.chat-title');
                if (!titleSpan) return;

                const input = document.createElement('input');
                input.type = 'text';
                input.value = chat.title || '';
                input.className = 'chat-title-input';
                input.style.width = 'calc(100% - 20px)'; // Оставляем место для кнопок, если они видны
                titleSpan.replaceWith(input);
                input.focus();
                input.select();

                async function saveTitle() {
                    const newTitle = input.value.trim() || (chat.messages && chat.messages.length > 0 ? chat.messages[0].text.substring(0,30) : 'Новый чат');
                    if (chat.title === newTitle) { // Если название не изменилось
                        input.replaceWith(titleSpan); // Просто возвращаем span
                        titleSpan.textContent = newTitle; // Убедимся, что текст правильный
                        return;
                    }
                    chat.title = newTitle;
                    chat.lastUpdated = Date.now();
                    await saveChatToServer(chat); // Сохраняем на сервере
                    // renderChatsList и renderFolders будут вызваны через syncChatsFromServer в saveChatToServer
                }
                input.addEventListener('blur', saveTitle);
                input.addEventListener('keydown', async (ev) => {
                    if (ev.key === 'Enter') {
                        ev.preventDefault(); // Предотвращаем стандартное поведение Enter
                        input.blur(); // Это вызовет saveTitle
                    }
                    if (ev.key === 'Escape') {
                        input.replaceWith(titleSpan); // Возвращаем как было без сохранения
                        // await renderChatsList(currentChatId); // Можно перерисовать для чистоты
                    }
                });
                return;
            }
            if (e.target.closest('.btn-delete-chat')) {
                if (confirm(`Удалить чат "${(await getChatById(chatId))?.title || 'этот чат'}"?`)) {
                    await deleteChatOnServer(chatId);
                }
                return;
            }
            // Переключение чата по клику (если не по кнопкам)
            if (!e.target.closest('.btn-icon') && !e.target.closest('input')) {
                 if (String(currentChatId) !== String(chatId)) { // Переключаемся только если ID отличается
                    await switchChat(chatId);
                }
            }
        });
    }
    
    function updateChatHeaderTitle() {
        const dropdownToggle = document.querySelector('.dropdown-toggle .gradient-pro-title');
        if (!dropdownToggle) return;
    
        let titlePrefix = getAppName(); // "Reflex AI" или "Reflex AI Pro"
        // Убираем отображение названия чата
        // let currentChatTitle = "";
        // if (currentChatId) {
        //     const currentChatObj = (tempNewChat && String(tempNewChat.id) === String(currentChatId)) 
        //         ? tempNewChat 
        //         : allChats.find(c => String(c.id) === String(currentChatId));
        //     if (currentChatObj && currentChatObj.title) {
        //         currentChatTitle = ` / ${currentChatObj.title}`;
        //     } else if (currentChatObj && (!currentChatObj.title && currentChatObj.messages && currentChatObj.messages.length > 0)) {
        //         currentChatTitle = ` / ${currentChatObj.messages[0].text.substring(0, 20)}...`;
        //     } else if (String(currentChatId).startsWith('temp-')) {
        //         currentChatTitle = " / Новый чат";
        //     }
        // }
        
        dropdownToggle.textContent = `${titlePrefix}`; // Только название приложения
        document.title = `${titlePrefix}`; // Только название приложения в title
        renderProStarInHeader(); // Перерисовываем звезду, если она есть
    }


    function renderUserProfile() {
        const userProfile = document.querySelector('.user-profile');
        if (!userProfile || !currentUser) return;
        userProfile.querySelector('.user-name').textContent = currentUser.displayName || currentUser.username;
        userProfile.querySelector('.user-points').textContent = currentUser.isPro ? 'PRO Аккаунт' : 'Базовый аккаунт';
        let logoutBtn = userProfile.querySelector('.btn-logout');
        if (!logoutBtn) {
            logoutBtn = document.createElement('button');
            logoutBtn.className = 'btn-icon btn-logout';
            logoutBtn.title = 'Выйти';
            logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
            // Вставляем кнопку выхода перед другими элементами в user-profile если нужно
            const userAvatar = userProfile.querySelector('.user-avatar');
            if (userAvatar && userAvatar.nextSibling) {
                userProfile.insertBefore(logoutBtn, userAvatar.nextSibling.nextSibling); // После user-info
            } else {
                 userProfile.appendChild(logoutBtn);
            }
        }
        logoutBtn.style.display = ''; // Убедимся что кнопка видима
        logoutBtn.onclick = () => {
            localStorage.removeItem('authToken');
            authToken = null;
            currentUser = null;
            window.location.href = 'auth.html';
        };
        updateProLinkUI();
    }

    function getAppName() {
        return `Reflex AI${currentUser?.isPro ? ' Pro' : ''}`;
    }

    function renderProStarInHeader() {
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        if (!dropdownToggle) return;
        const oldStar = dropdownToggle.querySelector('.pro-gradient-icon');
        if (oldStar) oldStar.remove();

        if (currentUser && currentUser.isPro) {
            const gradientId = 'pro-gradient-svg-header';
            const proSvgGradient = `
                <span class="pro-gradient-icon" style="margin-left:7px;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style="vertical-align:middle;display:inline-block;" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stop-color="#3ee97c"/>
                                <stop offset="100%" stop-color="#5faee3"/>
                            </linearGradient>
                        </defs>
                        <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z"
                            stroke="url(#${gradientId})" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
            `;
            const titleSpan = dropdownToggle.querySelector('.gradient-pro-title');
            const chevronIcon = dropdownToggle.querySelector('.fa-chevron-down');
            if (titleSpan && chevronIcon) {
                 // Вставляем звезду между текстом и стрелкой
                titleSpan.insertAdjacentHTML('afterend', proSvgGradient);
            } else if (titleSpan && !titleSpan.nextElementSibling?.classList?.contains('pro-gradient-icon')) {
                 titleSpan.insertAdjacentHTML('afterend', proSvgGradient);
            }
        }
    }
    
    // Инициализация заголовка при загрузке
    if (document.querySelector('.dropdown-toggle')) {
        const titleContainer = document.querySelector('.dropdown-toggle');
        titleContainer.innerHTML = 
            `<span class="gradient-pro-title">${getAppName()}</span> <i class="fas fa-chevron-down"></i>`;
        renderProStarInHeader();
    }


    const userProfileDropdown = document.querySelector('.user-profile');
    const profileMenuDropdown = document.getElementById('profileMenuDropdown');
    let profileMenuOpen = false;

    let profileEditModal = null;
    function showProfileEditModal() {
        if (profileEditModal && document.body.contains(profileEditModal)) profileEditModal.remove(); // Удаляем старое, если есть
        profileEditModal = document.createElement('div');
        profileEditModal.className = 'modal-overlay open';
        profileEditModal.innerHTML = `
            <div class="modal-content" style="max-width:400px;">
                <div class="modal-header">
                    <h3>Настройки аккаунта</h3>
                    <button class="btn-icon btn-close-modal" aria-label="Закрыть"><i class="fas fa-times"></i></button>
                </div>
                <form id="profileEditForm">
                    <div class="setting-item">
                        <label for="editUsername">Имя пользователя</label>
                        <input type="text" id="editUsername" value="${currentUser.username}" disabled>
                    </div>
                    <div class="setting-item">
                        <label for="editDisplayName">Отображаемое имя</label>
                        <input type="text" id="editDisplayName" value="${currentUser.displayName || ''}" maxlength="32" required>
                    </div>
                    <button type="submit" class="btn btn-outline" style="width:100%;margin-top:10px;">Сохранить</button>
                </form>
                <div id="profileEditFeedback" style="color:#e55;font-size:13px;margin-top:8px;min-height:18px;"></div>
            </div>
        `;
        document.body.appendChild(profileEditModal);

        profileEditModal.querySelector('.btn-close-modal').onclick = () => profileEditModal.remove();
        profileEditModal.onclick = (e) => {
            if (e.target === profileEditModal) profileEditModal.remove();
        };

        const form = profileEditModal.querySelector('#profileEditForm');
        const feedback = profileEditModal.querySelector('#profileEditFeedback');
        form.onsubmit = async (e) => {
            e.preventDefault();
            const newDisplayName = form.editDisplayName.value.trim();
            if (!newDisplayName) {
                feedback.textContent = 'Отображаемое имя не может быть пустым';
                return;
            }
            try {
                let resp = await fetch('/api/me', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + authToken },
                    body: JSON.stringify({ displayName: newDisplayName })
                });
                if (!resp.ok) {
                     const errData = await resp.json();
                     throw new Error(errData.error || 'Ошибка сохранения');
                }
                currentUser.displayName = newDisplayName; // Обновляем локально
                renderUserProfile(); // Перерисовываем профиль в сайдбаре
                updateChatHeaderTitle(); // Обновляем имя в шапке, если оно там используется
                closeProfileMenu();
                profileEditModal.remove();
            } catch(err) {
                feedback.textContent = err.message || 'Ошибка сохранения';
            }
        };
    }

    function renderProfileMenu() {
        if (!profileMenuDropdown || !currentUser) return;
        profileMenuDropdown.innerHTML = `
            <div class="profile-menu-header">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 24 24'%3E%3Cpath fill='%23808080' d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E" class="profile-menu-avatar" alt="Аватар">
                <div>
                    <div class="profile-menu-name">${currentUser.displayName || currentUser.username}</div>
                    <div style="font-size:12px;color:var(--text-secondary-color);">${currentUser.isPro ? 'PRO Аккаунт' : 'Базовый аккаунт'}</div>
                </div>
            </div>
            <ul class="profile-menu-list">
                <li data-action="account"><i class="fas fa-user-cog"></i>Настройки аккаунта</li>
                <li data-action="orders"><i class="fas fa-receipt"></i>История заказов</li>
                <li data-action="backup" class="pro"><i class="fas fa-cloud-upload-alt"></i>Резервное копирование чата <span class="badge-new" style="margin-left:5px;">PRO</span></li>
                <li data-action="feedback"><i class="fas fa-comment-alt"></i>Обратная связь</li>
                <li data-action="suggest"><i class="fas fa-lightbulb"></i>Предложения и баги</li>
                <li data-action="about"><i class="fas fa-info-circle"></i>О проекте</li>
                <li data-action="logout"><i class="fas fa-sign-out-alt"></i>Выйти</li>
            </ul>
            <div class="profile-menu-footer">Reflex AI &copy; ${new Date().getFullYear()}</div>
        `;
        profileMenuDropdown.querySelectorAll('.profile-menu-list li').forEach(li => {
            li.onclick = () => {
                const act = li.dataset.action;
                if (act === 'logout') {
                    localStorage.removeItem('authToken');
                    window.location.href = 'auth.html';
                } else if (act === 'about') {
                    showSimpleModal('О проекте', `
                        Reflex AI — персональный помощник.<br>
                        Версия: <b>20250509.204911</b><br>
                        <a href="https://github.com/reflexai" target="_blank" style="color:var(--accent-color);">GitHub проекта</a>
                    `);
                } else if (act === 'feedback') {
                    showSimpleModal('Обратная связь', `
                        Напишите нам на <a href="mailto:support@reflexai.ru" style="color:var(--accent-color);">support@reflexai.ru</a>
                        или в <a href="https://t.me/reflexai_support" target="_blank" style="color:var(--accent-color);">Telegram</a>.
                    `);
                } else if (act === 'suggest') {
                    showSimpleModal('Предложения и баги', `
                        Оставьте предложение или баг-репорт в <a href="https://t.me/reflexai_support" target="_blank" style="color:var(--accent-color);">Telegram</a>
                        или на <a href="mailto:support@reflexai.ru" style="color:var(--accent-color);">почту</a>.
                    `);
                } else if (act === 'orders') {
                    showSimpleModal('История заказов', 'История заказов пока недоступна.');
                } else if (act === 'account') {
                    showProfileEditModal();
                } else if (act === 'backup') {
                    if (currentUser && currentUser.isPro) {
                        showSimpleModal('Резервное копирование', 'Функция резервного копирования в разработке.');
                    } else {
                        showSimpleModal('Резервное копирование', 'Резервное копирование доступно только для PRO. <a href="#" class="upgrade-to-pro-link-modal" style="color:var(--accent-color);">Улучшить?</a>');
                        const upgradeLinkInModal = document.querySelector('.upgrade-to-pro-link-modal');
                        if (upgradeLinkInModal) {
                            upgradeLinkInModal.onclick = (e) => {
                                e.preventDefault();
                                document.querySelector('.modal-overlay .btn-close-modal')?.click(); // Закрываем текущее модальное окно
                                if (subscriptionModal) {
                                    subscriptionModal.style.display = 'flex';
                                    setTimeout(() => subscriptionModal.classList.add('open'), 10);
                                }
                            };
                        }
                    }
                }
                closeProfileMenu();
            };
        });
    }

    function showSimpleModal(title, html) {
        let modal = document.querySelector('.simple-modal-overlay');
        if (modal) modal.remove(); // Удаляем предыдущее, если есть

        modal = document.createElement('div');
        modal.className = 'modal-overlay open simple-modal-overlay'; // Добавляем уникальный класс
        modal.innerHTML = `
            <div class="modal-content" style="max-width:400px;">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="btn-icon btn-close-modal" aria-label="Закрыть"><i class="fas fa-times"></i></button>
                </div>
                <div style="padding:10px 0 0 0;font-size:15px;">${html}</div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.btn-close-modal').onclick = () => modal.remove();
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    }

    function openProfileMenu() {
        renderProfileMenu();
        profileMenuDropdown.classList.add('open');
        profileMenuOpen = true;
    }
    function closeProfileMenu() {
        profileMenuDropdown.classList.remove('open');
        profileMenuOpen = false;
    }
    if (userProfileDropdown && profileMenuDropdown) {
        userProfileDropdown.style.cursor = 'pointer';
        userProfileDropdown.onclick = (e) => {
            e.stopPropagation();
            if (profileMenuOpen) closeProfileMenu();
            else openProfileMenu();
        };
        document.addEventListener('click', (e) => {
            if (profileMenuOpen && !profileMenuDropdown.contains(e.target) && !userProfileDropdown.contains(e.target)) {
                closeProfileMenu();
            }
        });
    }

    const btnNewChatSidebar = document.querySelector('.btn-new-chat');
    const btnNewChatHeader = document.querySelector('.btn-new-chat-header');
    if (btnNewChatSidebar) btnNewChatSidebar.onclick = async () => { await createNewChat(); };
    if (btnNewChatHeader) btnNewChatHeader.onclick = async () => { await createNewChat(); };

    function updateProLinkUI() {
        const proFeaturesContainer = document.querySelector('.pro-features');
        if (!proFeaturesContainer) return;
        proFeaturesContainer.innerHTML = ''; // Очищаем перед обновлением
        
        if (currentUser && currentUser.isPro) {
            // Для PRO пользователей ничего не показываем в этой области или другое сообщение
            // proFeaturesContainer.innerHTML = '<span style="font-size:12px; color: var(--accent-color);">PRO Аккаунт</span>';
        } else {
            const gradientId = 'pro-gradient-svg-footer'; // Уникальный ID для градиента
            const proSvgSmallGradient = `
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" style="vertical-align:middle;display:inline-block;" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stop-color="#3ee97c"/>
                            <stop offset="100%" stop-color="#5faee3"/>
                        </linearGradient>
                    </defs>
                    <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z"
                        stroke="url(#${gradientId})" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            `;
            const link = document.createElement('a');
            link.href = '#';
            link.className = 'upgrade-to-pro-link'; // Используется для открытия модального окна
            link.innerHTML = `
                <span class="pro-gradient-link">
                    ${proSvgSmallGradient}
                    <span class="pro-link-text" style="display:inline;">Улучшить до Pro</span>
                </span>
            `;
            link.onclick = (e) => {
                e.preventDefault();
                if (subscriptionModal) {
                    subscriptionModal.style.display = 'flex';
                    setTimeout(() => subscriptionModal.classList.add('open'), 10);
                }
            };
            proFeaturesContainer.appendChild(link);
        }
    }
    
    async function mainAuthInit() {
        await fetchCurrentUser();
        if (!currentUser) {
            if (!window.location.pathname.endsWith('auth.html')) {
                 window.location.href = 'auth.html';
            }
            return;
        }
        await Promise.all([
            syncChatsFromServer(),
            loadFolders(),
            fetchMessageLimits()
        ]);
        renderUserProfile();
        updateProLinkUI();
        
        // Логика выбора или создания чата при инициализации
        if (allChats.length === 0 && !tempNewChat) {
            await createNewChat();
        } else if (allChats.length > 0) {
            // Пытаемся найти последний активный чат из localStorage
            const lastActiveChatId = localStorage.getItem('lastActiveChatId');
            const chatExists = allChats.some(c => String(c.id) === String(lastActiveChatId));

            if (lastActiveChatId && chatExists) {
                await switchChat(lastActiveChatId);
            } else {
                 // Сортируем по lastUpdated и выбираем самый новый
                const sortedChats = [...allChats].sort((a, b) => (b.lastUpdated || b.id) - (a.lastUpdated || a.id));
                await switchChat(sortedChats[0].id);
            }
        } else if (tempNewChat) { // Если есть временный чат (например, после неудачной отправки)
            await switchChat(tempNewChat.id);
        }
        
        updateChatHeaderTitle(); // Обновляем заголовок в шапке с учетом текущего чата
        startBackgroundSSE(); // <--- добавлено
    }

    // Сохраняем ID активного чата при переключении
    const originalSwitchChat = switchChat;
    switchChat = async (id) => {
        await originalSwitchChat(id);
        if (id && !String(id).startsWith('temp-')) { // Не сохраняем временные ID
            localStorage.setItem('lastActiveChatId', id);
        }
        updateChatHeaderTitle();
    };
    
    (async function () { await mainAuthInit(); })();


    function adjustAppHeight() {
        if (appContainer) {
            appContainer.style.height = window.innerHeight + 'px';
        }
    }

    adjustAppHeight(); 
    window.addEventListener('resize', adjustAppHeight); 
    window.addEventListener('orientationchange', adjustAppHeight); 

    if (loadingScreen && appContainer) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0'; 
            loadingScreen.addEventListener('transitionend', () => {
                loadingScreen.style.display = 'none'; 
                appContainer.style.display = 'flex'; 
                requestAnimationFrame(() => { 
                    appContainer.style.opacity = '1';
                    adjustAppHeight(); 
                });
            }, { once: true }); 
        }, 1000); // Уменьшил задержку
    } else if (appContainer) { 
        appContainer.style.display = 'flex';
        appContainer.style.opacity = '1';
        adjustAppHeight();
    }

    function openMobileSidebar() {
        if (sidebar && window.innerWidth <= 768) { 
            sidebar.classList.add('sidebar-open');
            body.classList.add('sidebar-open-mobile'); 
        }
    }

    function closeMobileSidebar() {
        if (sidebar) {
            sidebar.classList.remove('sidebar-open');
            body.classList.remove('sidebar-open-mobile');
        }
    }

    if (window.innerWidth > 768 && sidebar) {
        sidebar.classList.add('sidebar-open');
        if (btnToggleSidebar) { 
            const icon = btnToggleSidebar.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-bars-staggered');
            }
        }
    }

    if (btnToggleSidebar) {
        btnToggleSidebar.addEventListener('click', () => {
            const icon = btnToggleSidebar.querySelector('i');
            if (window.innerWidth <= 768) { 
                if (sidebar.classList.contains('sidebar-open')) {
                    closeMobileSidebar();
                } else {
                    openMobileSidebar();
                }
            } else { 
                sidebar.classList.toggle('sidebar-open');
                if (icon) { // Проверка на существование иконки
                    if (sidebar.classList.contains('sidebar-open')) {
                       icon.classList.remove('fa-bars');
                       icon.classList.add('fa-bars-staggered');
                    } else {
                       icon.classList.remove('fa-bars-staggered');
                       icon.classList.add('fa-bars');
                    }
                }
            }
        });
    }

    if (btnCloseSidebar) { 
        btnCloseSidebar.addEventListener('click', closeMobileSidebar);
    }

    if (sidebarOverlay) { 
        sidebarOverlay.addEventListener('click', closeMobileSidebar);
    }

    if (chatArea && mainHeader) {
        chatArea.addEventListener('scroll', () => {
            const isScrolled = chatArea.scrollTop > 20; 
            mainHeader.classList.toggle('scrolled', isScrolled); 
            if (mobileHeaderInfo) { 
                 mobileHeaderInfo.classList.toggle('scrolled', isScrolled);
            }
        });
    }

    if (btnSettings && settingsPanel) {
        btnSettings.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем всплытие, чтобы не сработало закрытие по клику на документе
            settingsPanel.classList.add('open');
        });
    }
    if (btnCloseSettings && settingsPanel) {
        btnCloseSettings.addEventListener('click', () => settingsPanel.classList.remove('open'));
    }
    document.addEventListener('click', (event) => {
        if (settingsPanel && settingsPanel.classList.contains('open')) {
            const isClickInsidePanel = settingsPanel.contains(event.target);
            const isClickOnSettingsButton = btnSettings && btnSettings.contains(event.target);
            if (!isClickInsidePanel && !isClickOnSettingsButton) {
                settingsPanel.classList.remove('open');
            }
        }
    });

    settingsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            settingsTabs.forEach(t => t.classList.remove('active'));
            settingsTabContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const targetTabContent = document.getElementById(tab.dataset.tab);
            if (targetTabContent) targetTabContent.classList.add('active');
        });
    });

    if (colorSchemeSelect) {
        const savedScheme = localStorage.getItem('colorScheme') || 'dark'; 
        body.classList.remove('dark-theme', 'light-theme');
        body.classList.add(`${savedScheme}-theme`);
        colorSchemeSelect.value = savedScheme;

        colorSchemeSelect.addEventListener('change', (event) => {
            const selectedScheme = event.target.value;
            body.classList.remove('dark-theme', 'light-theme');
            body.classList.add(`${selectedScheme}-theme`);
            localStorage.setItem('colorScheme', selectedScheme);
            applyAccentColor(localStorage.getItem('accentColor') || getDefaultAccentForScheme(selectedScheme)); 
        });
    }
    
    function getDefaultAccentForScheme(scheme) {
        return scheme === 'light' ? 'default' : 'orange'; 
    }

    const currentThemeColorClasses = ['theme-default', 'theme-blue', 'theme-pink', 'theme-purple', 'theme-orange', 'theme-violet', 'theme-green', 'theme-grey'];
    
    function applyAccentColor(colorName) {
        currentThemeColorClasses.forEach(cls => body.classList.remove(cls)); 
        body.classList.add(`theme-${colorName}`); 
        localStorage.setItem('accentColor', colorName); 
        themeColorPickers.forEach(p => p.classList.toggle('active', p.dataset.color === colorName)); 

        const computedStyle = getComputedStyle(body);
        const accentRgb = computedStyle.getPropertyValue('--accent-color-rgb').trim();
        if (accentRgb) {
            body.style.setProperty('--accent-color-glow', `rgba(${accentRgb}, 0.5)`);
        } else { 
            const fallbackAccentRgb = body.classList.contains('light-theme') ? "0, 122, 255" : "169, 169, 169"; 
            body.style.setProperty('--accent-color-glow', `rgba(${fallbackAccentRgb}, 0.5)`);
        }
    }
    const initialScheme = localStorage.getItem('colorScheme') || 'dark';
    const savedAccentColor = localStorage.getItem('accentColor') || getDefaultAccentForScheme(initialScheme); 
    applyAccentColor(savedAccentColor); 

    themeColorPickers.forEach(picker => {
        picker.addEventListener('click', () => applyAccentColor(picker.dataset.color));
    });

    const textSettings = document.getElementById('text-settings');
    if (textSettings && !document.getElementById('systemMessage')) {
        const systemMessageSetting = document.createElement('div');
        systemMessageSetting.classList.add('setting-item');
        systemMessageSetting.innerHTML = `
            <label for="systemMessage">Системное сообщение</label>
            <textarea id="systemMessage" rows="3" placeholder="Введите системное сообщение (например, 'Вы — Reflex AI, персональный помощник...')">Вы — Reflex AI, персональный помощник, созданный для помощи на русском языке. Всегда отвечайте дружелюбно и полезно.</textarea>
            <p class="description">Укажите начальное сообщение, которое будет задавать поведение ИИ.</p>
        `;
        const insertBeforeEl = textSettings.querySelector('.advanced-settings-toggle') || textSettings.querySelector('.btn-reset-defaults');
        if (insertBeforeEl) { // Проверяем, что элемент для вставки существует
            textSettings.insertBefore(systemMessageSetting, insertBeforeEl);
        } else {
            textSettings.appendChild(systemMessageSetting); // Добавляем в конец, если не нашли точку вставки
        }
    }

    const temperatureSlider = document.getElementById('temperature');
    const temperatureValue = document.getElementById('temperatureValue');
    const topPSlider = document.getElementById('topP');
    const topPValue = document.getElementById('topPValue');
    const disableSystemReflexToggle = document.getElementById('disable-system-reflex');
    const btnResetDefaults = document.querySelector('.btn-reset-defaults');

    if (temperatureSlider && temperatureValue) {
        const savedTemp = localStorage.getItem('advancedTemperature');
        if (savedTemp !== null) temperatureSlider.value = savedTemp;
        temperatureValue.textContent = temperatureSlider.value;
        temperatureSlider.addEventListener('input', () => {
            temperatureValue.textContent = temperatureSlider.value;
            localStorage.setItem('advancedTemperature', temperatureSlider.value);
        });
    }
    if (topPSlider && topPValue) {
        const savedTopP = localStorage.getItem('advancedTopP');
        if (savedTopP !== null) topPSlider.value = savedTopP;
        topPValue.textContent = topPSlider.value;
        topPSlider.addEventListener('input', () => {
            topPValue.textContent = topPSlider.value;
            localStorage.setItem('advancedTopP', topPSlider.value);
        });
    }
    if (disableSystemReflexToggle) {
        const savedDisable = localStorage.getItem('disableSystemReflex');
        if (savedDisable !== null) disableSystemReflexToggle.checked = savedDisable === 'true';
        disableSystemReflexToggle.addEventListener('change', () => {
            localStorage.setItem('disableSystemReflex', disableSystemReflexToggle.checked);
        });
    }

    if (btnResetDefaults) {
        btnResetDefaults.addEventListener('click', () => {
            const defaultTemp = "0.3";
            const defaultTopP = "1";
            const defaultDisableSystemReflex = false;

            if (temperatureSlider && temperatureValue) {
                temperatureSlider.value = defaultTemp;
                temperatureValue.textContent = defaultTemp;
                localStorage.setItem('advancedTemperature', defaultTemp);
            }
            if (topPSlider && topPValue) {
                topPSlider.value = defaultTopP;
                topPValue.textContent = defaultTopP;
                localStorage.setItem('advancedTopP', defaultTopP);
            }
            if (disableSystemReflexToggle) {
                disableSystemReflexToggle.checked = defaultDisableSystemReflex;
                localStorage.setItem('disableSystemReflex', defaultDisableSystemReflex);
            }
        });
    }

    let serverUrl = localStorage.getItem('serverUrl') || 'https://excited-lark-witty.ngrok-free.app';
    let abortController = null; 

    function showUpdateServerUrlMessage() {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('message-wrapper');

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'ai-message');

        const avatarImg = document.createElement('img');
        avatarImg.classList.add('avatar');
        avatarImg.alt = 'Reflex AI';
        avatarImg.src = reflexSvgUrl;

        const messageContentDiv = document.createElement('div');
        messageContentDiv.classList.add('message-content');

        const aiMessageHeaderDiv = document.createElement('div');
        aiMessageHeaderDiv.classList.add('ai-message-header');
        const aiNameSpan = document.createElement('span');
        aiNameSpan.classList.add('ai-name');
        aiNameSpan.textContent = 'Reflex AI';
        aiMessageHeaderDiv.appendChild(aiNameSpan);

        const errorParagraph = document.createElement('p');
        errorParagraph.style.color = '#cf5a5a';
        errorParagraph.textContent = 'Ошибка: сервер недоступен.';

        const paragraph = document.createElement('p');
        paragraph.textContent = 'Пожалуйста, попробуйте позже.';

        messageContentDiv.appendChild(aiMessageHeaderDiv);
        messageContentDiv.appendChild(errorParagraph);
        messageContentDiv.appendChild(paragraph);

        messageDiv.appendChild(avatarImg);
        messageDiv.appendChild(messageContentDiv);
        messageWrapper.appendChild(messageDiv);

        if (chatMessagesContainer && chatArea) {
            chatMessagesContainer.appendChild(messageWrapper);
            chatArea.scrollTop = chatArea.scrollHeight;
        }
    }

    // Функция для прямой отправки на LLaMA сервер (когда "Веб" выключен)
    async function sendToLLaMADirectly(userMessageText, currentChatHistory) {
        const systemMessageInput = document.getElementById('systemMessage');
        const temperature = parseFloat(document.getElementById('temperature')?.value || 0.7);
        const topP = parseFloat(document.getElementById('topP')?.value || 1);
        const disableSystemReflex = document.getElementById('disable-system-reflex')?.checked;
        let systemMessageText = systemMessageInput?.value.trim() ||
            'Вы — Reflex AI, персональный помощник, созданный для помощи на русском языке. Всегда отвечайте дружелюбно и полезно.';

        const messagesForLLaMA = [];
        if (!disableSystemReflex) {
            messagesForLLaMA.push({ role: 'system', content: systemMessageText });
        }
        messagesForLLaMA.push(...currentChatHistory, { role: 'user', content: userMessageText });

        console.log("Отправка напрямую с историей:", messagesForLLaMA);
        console.log("Температура:", temperature, "top_p:", topP);

        abortController = new AbortController();
        try {
            showAiTypingIndicator();
            toggleSendButton(true); 

            const response = await fetch(`${serverUrl}/v1/chat/completions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: messagesForLLaMA,
                    temperature: temperature,
                    top_p: topP
                }),
                signal: abortController.signal
            });
            const data = await response.json();
            return data.choices[0].message.content || 'Ошибка: нет ответа от сервера';
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Запрос был отменен пользователем');
                return 'Генерация остановлена';
            }
            console.error('Ошибка при прямом запросе к LLaMA:', error);
            addMessageToChat('Нет доступа к серверу LLaMA.', 'system');
            showUpdateServerUrlMessage(); 
            return ''; 
        } finally {
            hideAiTypingIndicator();
            toggleSendButton(false);
            abortController = null;
        }
    }
    
    // Функция для отправки запроса на бэкенд для фоновой обработки (когда "Веб" включен)
    async function sendToBackendForBackgroundProcessing(userMessageText, currentChatHistoryForBackend) {
        const systemMessageInput = document.getElementById('systemMessage');
        const temperature = parseFloat(document.getElementById('temperature')?.value || 0.7);
        const topP = parseFloat(document.getElementById('topP')?.value || 1);
        const disableSystemReflex = document.getElementById('disable-system-reflex')?.checked;
        let systemMessageText = systemMessageInput?.value.trim() ||
            'Вы — Reflex AI, персональный помощник, созданный для помощи на русском языке. Всегда отвечайте дружелюбно и полезно.';

        try {
            const response = await fetch('/api/chat/background-request', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken 
                },
                body: JSON.stringify({
                    chatId: currentChatId,
                    userMessage: userMessageText,
                    chatHistory: currentChatHistoryForBackend, // Передаем актуальную историю
                    temperature: temperature,
                    topP: topP,
                    disableSystemReflex: disableSystemReflex,
                    systemMessageContent: systemMessageText
                }),
            });

            if (response.status === 202) { // 202 Accepted
                addMessageToChat('Ваш запрос принят в обработку и будет выполнен в фоновом режиме.', 'ai');
                // Не показываем индикатор загрузки и не блокируем кнопку, т.к. обработка фоновая
            } else {
                const errorData = await response.json();
                addMessageToChat(`Ошибка при отправке запроса на фоновую обработку: ${errorData.error || response.statusText}`, 'system');
            }
        } catch (error) {
            console.error('Ошибка при отправке на бэкенд:', error);
            addMessageToChat('Не удалось отправить запрос на сервер для фоновой обработки.', 'system');
        }
    }


    async function stopGenerationOnServer() {
        try {
            const response = await fetch(`${serverUrl}/v1/stop`, { // Убедитесь, что serverUrl правильный
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                console.log('Генерация остановлена на сервере LLaMA');
            } else {
                console.warn('Сервер LLaMA не смог обработать запрос на остановку:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при попытке остановить генерацию на сервере LLaMA:', error);
        }
    }

    function updateMessageLimitsUI() {
        const limitDisplay = document.querySelector('.message-limits');
        if (!limitDisplay || !messageLimits) return;

        const now = Date.now();
        const timeLeft = Math.max(0, messageLimits.resetTime - now);
        const hours = Math.floor(timeLeft / 3600000);
        const minutes = Math.floor((timeLeft % 3600000) / 60000);
        
        limitDisplay.innerHTML = `${messageLimits.remaining}/${messageLimits.limit} сообщений`;
        if (messageLimits.remaining === 0 && timeLeft > 0) { // Показываем время сброса только если лимит исчерпан и время не прошло
            limitDisplay.innerHTML += ` (доступно через ${hours}ч ${minutes}м)`;
        } else if (messageLimits.remaining === 0 && timeLeft <= 0) {
             limitDisplay.innerHTML += ` (лимит скоро обновится)`;
        }
        limitDisplay.style.display = 'block';
    }

    async function handleSendMessage() {
        let temp = null;
        if (typeof lastMiniMonitorData.temperature === 'number') {
            temp = lastMiniMonitorData.temperature;
        } else if (miniTempValue && miniTempValue.textContent && miniTempValue.textContent !== '--°C') {
            temp = parseFloat(miniTempValue.textContent.replace('°C', '').replace(',', '.'));
        }
        if (temp !== null && temp >= 40 && currentUser && !currentUser.isPro) {
            addMessageToChat(
                `Отправка сообщений временно недоступна: температура сервера превышает безопасный порог (40°C). Пожалуйста, подождите, пока температура снизится.`,
                'system'
            );
            return;
        }

        if (messageLimits && messageLimits.remaining <= 0) {
            const timeLeft = Math.max(0, messageLimits.resetTime - Date.now());
            const hours = Math.floor(timeLeft / 3600000);
            const minutes = Math.floor((timeLeft % 3600000) / 60000);
            let timeText = "";
            if (timeLeft > 0) {
                timeText = ` Пожалуйста, подождите ${hours}ч ${minutes}м.`;
            } else {
                timeText = " Лимит скоро обновится.";
            }
            const message = currentUser.isPro 
                ? `Достигнут лимит сообщений (${messageLimits.limit}).${timeText}` 
                : `Достигнут лимит сообщений (${messageLimits.limit}).${timeText} Улучшите аккаунт до Pro для увеличения лимита.`;
            addMessageToChat(message, 'system');
            return;
        }

        if (btnSend.classList.contains('stop')) {
            if (abortController) {
                abortController.abort(); 
                await stopGenerationOnServer(); 
            }
            toggleSendButton(false); 
            hideAiTypingIndicator();
            addMessageToChat('Генерация остановлена', 'system');
            await saveMessageToCurrentChat('Генерация остановлена', 'system'); // Сохраняем системное сообщение
            return;
        }

        const messageText = messageInput.value.trim();
        if (!messageText) return;

        const cmd = COMMANDS.find(c => c.match(messageText));
        if (cmd) {
            addMessageToChat(messageText, 'user');
            await saveMessageToCurrentChat(messageText, 'user');
            messageInput.value = '';
            messageInput.style.height = 'auto';
            messageInput.focus();
            addMessageToChat(cmd.handler(), 'ai');
            await saveMessageToCurrentChat(cmd.handler(), 'ai');
            hideCommandMenu();
            return;
        }
        
        // Добавляем сообщение пользователя в UI и историю для ИИ
        addMessageToChat(messageText, 'user');
        // chatHistory уже обновился внутри addMessageToChat, если sender 'user' или 'ai'
        
        // Сохраняем сообщение пользователя в БД (это также обновит lastUpdated)
        // Если это новый чат (tempNewChat), он будет создан на сервере здесь
        await saveMessageToCurrentChat(messageText, 'user'); 
        
        // Очищаем поле ввода
        messageInput.value = '';
        messageInput.style.height = 'auto';
        messageInput.focus();

        // Копируем chatHistory перед асинхронными операциями, чтобы избежать состояния гонки
        const currentChatHistoryForRequest = [...chatHistory]; 
        // Удаляем последнее сообщение пользователя из копии, так как оно будет передано отдельно
        if (currentChatHistoryForRequest.length > 0 && currentChatHistoryForRequest[currentChatHistoryForRequest.length - 1].role === 'user') {
             currentChatHistoryForRequest.pop();
        }


        // Проверяем состояние чекбокса "Веб включен"
        if (webEnabledCheckbox && webEnabledCheckbox.checked) {
            // Режим фоновой обработки через Node.js сервер
            await sendToBackendForBackgroundProcessing(messageText, currentChatHistoryForRequest);
        } else {
            // Прямая отправка на LLaMA сервер
            const aiReply = await sendToLLaMADirectly(messageText, currentChatHistoryForRequest);
            if (aiReply && aiReply !== 'Генерация остановлена') { // Не добавляем, если была остановка или пустой ответ
                addMessageToChat(aiReply, 'ai');
                await saveMessageToCurrentChat(aiReply, 'ai');
            }
        }
        
        // После успешной отправки сообщения (в любом режиме, если это не фоновый)
        // или после принятия в фоновую обработку, обновляем лимиты
        await fetchMessageLimits(); // Обновляем UI лимитов
    }


    function toggleSendButton(isGenerating) {
        if (!btnSend || !btnSend.querySelector('i')) return; // Защита от ошибок, если кнопка не найдена
        if (isGenerating) {
            btnSend.classList.add('stop');
            btnSend.querySelector('i').classList.remove('fa-arrow-up', 'fa-paper-plane');
            btnSend.querySelector('i').classList.add('fa-square'); 
            btnSend.setAttribute('aria-label', 'Остановить');
        } else {
            btnSend.classList.remove('stop');
            btnSend.querySelector('i').classList.remove('fa-square'); 
            btnSend.querySelector('i').classList.add('fa-arrow-up');
            btnSend.setAttribute('aria-label', 'Отправить');
        }
    }

    function getMsgLikeKey(chatId, msgIdx) { return `msg_like_${chatId}_${msgIdx}`; }
    function getMsgDislikeKey(chatId, msgIdx) { return `msg_dislike_${chatId}_${msgIdx}`; }

    function addMessageToChat(text, sender, opts = {}) {
        if (!text || !text.trim() || !chatMessagesContainer) return;

        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('message-wrapper');

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);

        const avatarImg = document.createElement('img');
        avatarImg.classList.add('avatar');
        avatarImg.alt = sender === 'user' ? 'Пользователь' : sender === 'system' ? 'Система' : 'Reflex ИИ';
        avatarImg.src = sender === 'user'
            ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 24 24'%3E%3Cpath fill='%23808080' d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E"
            : sender === 'system'
                ? 'https://placehold.co/30x30/555555/FFFFFF?text=S&font=inter'
                : reflexSvgUrl;

        const messageContentDiv = document.createElement('div');
        messageContentDiv.classList.add('message-content');

        if (sender === 'user') {
            const paragraph = document.createElement('p');
            paragraph.textContent = text;
            messageContentDiv.appendChild(paragraph);
            messageDiv.appendChild(messageContentDiv); // Контент слева от аватара
            messageDiv.appendChild(avatarImg);     // Аватар справа

            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('message-actions');
            actionsDiv.innerHTML = `
                <button class="action-icon btn-copy" aria-label="Копировать"><i class="fas fa-copy"></i></button>
                <button class="action-icon btn-edit" aria-label="Редактировать"><i class="fas fa-pencil-alt"></i></button>
            `;
            actionsDiv.querySelector('.btn-copy').onclick = function() {
                navigator.clipboard.writeText(text).then(() => {
                    const originalContent = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check" style="color: var(--accent-color);"></i>';
                    this.classList.add('copied');
                    setTimeout(() => {
                        this.innerHTML = originalContent;
                        this.classList.remove('copied');
                    }, 1500);
                }).catch(err => {
                    console.error('Ошибка копирования:', err);
                });
            };
            actionsDiv.querySelector('.btn-edit').onclick = () => {
                if (messageContentDiv.querySelector('.edit-message-input')) return;
                const oldText = paragraph.textContent;
                paragraph.style.display = 'none';
                const textarea = document.createElement('textarea');
                textarea.className = 'edit-message-input';
                textarea.value = oldText;
                textarea.setAttribute('rows', '1');
                textarea.style.resize = 'none';
                textarea.style.overflowY = 'auto';
                textarea.style.height = '38px'; // Начальная высота
                 // Автоматическое изменение высоты textarea
                textarea.addEventListener('input', () => {
                    textarea.style.height = 'auto';
                    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
                });
                setTimeout(() => { // Устанавливаем высоту после добавления в DOM
                    textarea.style.height = 'auto';
                    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
                },0);

                messageContentDiv.appendChild(textarea);

                const editActions = document.createElement('div');
                editActions.className = 'message-actions editing-active';
                editActions.innerHTML = `
                    <button class="action-icon btn-cancel-edit" title="Отмена"><i class="fas fa-times"></i></button>
                    <button class="action-icon btn-save-edit" title="Отправить"><i class="fas fa-arrow-up"></i></button>
                `;
                messageWrapper.appendChild(editActions); // Добавляем кнопки под всем wrapper'ом

                textarea.focus();
                textarea.select();

                editActions.querySelector('.btn-cancel-edit').onclick = () => {
                    textarea.remove();
                    editActions.remove();
                    paragraph.style.display = '';
                };
                editActions.querySelector('.btn-save-edit').onclick = async () => {
                    const newText = textarea.value.trim();
                    if (!newText || newText === oldText) { // Не отправляем, если текст не изменился или пустой
                        textarea.remove();
                        editActions.remove();
                        paragraph.style.display = '';
                        return;
                    }

                    if (messageLimits && messageLimits.remaining <= 0) {
                        const message = currentUser.isPro ? 
                            `Достигнут лимит сообщений (${messageLimits.limit}). Пожалуйста, подождите.` :
                            `Достигнут лимит сообщений (${messageLimits.limit}). Пожалуйста, подождите или улучшите аккаунт до Pro для увеличения лимита.`;
                        addMessageToChat(message, 'system');
                        textarea.remove();
                        editActions.remove();
                        paragraph.style.display = '';
                        return;
                    }

                    paragraph.textContent = newText;
                    paragraph.style.display = '';
                    textarea.remove();
                    editActions.remove();
                    
                    // Находим индекс отредактированного сообщения
                    const wrappers = Array.from(chatMessagesContainer.children);
                    const msgIdxInUI = wrappers.indexOf(messageWrapper);
                    
                    // Обновляем chatHistory (локальную историю для отправки в ИИ)
                    // Ищем соответствующее сообщение в chatHistory. Это может быть сложнее, если есть системные сообщения.
                    // Простой подход: предполагаем, что пользовательские и ИИ сообщения идут подряд.
                    let userMessageCounter = 0;
                    let historyIdxToUpdate = -1;
                    for(let i = 0; i < chatHistory.length; i++) {
                        if (chatHistory[i].role === 'user') {
                            if (userMessageCounter === msgIdxInUI) { // Примерное сопоставление, может потребовать улучшения
                                historyIdxToUpdate = i;
                                break;
                            }
                            userMessageCounter++;
                        }
                    }
                    // Если нашли, обновляем. Иначе, это может быть сложно восстановить точно.
                    if (historyIdxToUpdate !== -1) {
                         chatHistory[historyIdxToUpdate].content = newText;
                    } else {
                        console.warn("Could not accurately find message in chatHistory to update for edit.");
                        // Как запасной вариант, можно просто добавить новое сообщение в историю, но это нарушит последовательность.
                        // Лучше всего, если msgIdxInUI точно соответствует позиции в отфильтрованной истории (только user/ai).
                    }


                    // Обновляем сообщение в allChats и сохраняем на сервере
                    let chat = await getChatById(currentChatId);
                    if (chat && chat.messages) {
                        // Ищем сообщение в chat.messages. Это более надежно, если у сообщений есть уникальные ID.
                        // Пока что, будем считать по примерному индексу, как и с chatHistory.
                        // Это требует, чтобы chat.messages точно отражал UI.
                        // В идеале, сообщения должны иметь ID.
                        // Простой поиск по старому тексту (менее надежно, если сообщения повторяются):
                        const originalMessageIndexInDb = chat.messages.findIndex(m => m.text === oldText && m.sender === 'user');
                        if (originalMessageIndexInDb !== -1) {
                            chat.messages[originalMessageIndexInDb].text = newText;
                        } else {
                             // Если не нашли по тексту, пытаемся по индексу (менее надежно)
                            if (chat.messages[msgIdxInUI] && chat.messages[msgIdxInUI].sender === 'user') {
                                chat.messages[msgIdxInUI].text = newText;
                            } else {
                                console.warn("Failed to find exact message in DB to update for edit.");
                            }
                        }
                        chat.lastUpdated = Date.now();
                        await saveChatToServer(chat);
                    }
                    
                    // Удаляем все сообщения ИИ, которые были после этого отредактированного сообщения
                    const nextSibling = messageWrapper.nextElementSibling;
                    if (nextSibling && nextSibling.querySelector('.ai-message')) {
                        let current = nextSibling;
                        while(current) {
                            let tempNext = current.nextElementSibling;
                            if (current.querySelector('.ai-message') || current.querySelector('.system-message')) { // Удаляем и системные сообщения после
                                current.remove();
                                // Также нужно удалить из chatHistory и из allChats[...].messages
                                // Это усложняет логику, если нет ID сообщений.
                            }
                            current = tempNext;
                        }
                        // Очищаем chatHistory от старых ответов ИИ
                        if (historyIdxToUpdate !== -1) {
                            chatHistory.splice(historyIdxToUpdate + 1);
                        }
                    }


                    // Повторно отправить в ИИ (если "Веб" выключен) или на бэкенд (если "Веб" включен)
                    const currentChatHistoryForEditRequest = chatHistory.slice(0, historyIdxToUpdate !== -1 ? historyIdxToUpdate +1 : chatHistory.length);

                    if (webEnabledCheckbox && webEnabledCheckbox.checked) {
                        await sendToBackendForBackgroundProcessing(newText, currentChatHistoryForEditRequest);
                    } else {
                        const aiReply = await sendToLLaMADirectly(newText, currentChatHistoryForEditRequest);
                        if (aiReply && aiReply !== 'Генерация остановлена') {
                            addMessageToChat(aiReply, 'ai');
                            await saveMessageToCurrentChat(aiReply, 'ai');
                        }
                    }
                    await fetchMessageLimits(); // Обновляем лимиты
                };
                textarea.addEventListener('keydown', (ev) => {
                    if (ev.key === 'Enter' && !ev.shiftKey) {
                        ev.preventDefault();
                        editActions.querySelector('.btn-save-edit').click();
                    }
                    if (ev.key === 'Escape') {
                        ev.preventDefault();
                        editActions.querySelector('.btn-cancel-edit').click();
                    }
                });
            };
            messageWrapper.appendChild(messageDiv);
            messageWrapper.appendChild(actionsDiv);
        } else if (sender === 'system') {
            const paragraph = document.createElement('p');
            paragraph.textContent = text;
            messageContentDiv.appendChild(paragraph);
            messageDiv.appendChild(avatarImg); // Аватар слева
            messageDiv.appendChild(messageContentDiv); // Контент справа
            messageWrapper.appendChild(messageDiv);
        } else { // AI message
            let html = text;
            try {
                if (window.marked && typeof window.marked.parse === 'function') {
                    html = window.marked.parse(text);
                }
            } catch (e) { console.error("Marked.parse error:", e); }

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const codeBlocks = tempDiv.querySelectorAll('pre > code');
            
            const aiMessageHeaderDiv = document.createElement('div');
            aiMessageHeaderDiv.classList.add('ai-message-header');
            const aiNameSpan = document.createElement('span');
            aiNameSpan.classList.add('ai-name');
            aiNameSpan.textContent = getAppName(); // Используем функцию для имени
            aiMessageHeaderDiv.appendChild(aiNameSpan);
            messageContentDiv.appendChild(aiMessageHeaderDiv); // Добавляем заголовок ИИ

            if (codeBlocks.length > 0) {
                codeBlocks.forEach(codeEl => {
                    const preEl = codeEl.parentElement;
                    let lang = 'text';
                    // Проверяем классы на элементе code для определения языка
                    if (codeEl.className) {
                        const langMatch = codeEl.className.match(/language-(\S+)/);
                        if (langMatch && langMatch[1]) {
                            lang = langMatch[1];
                        }
                    }

                    const codeHeader = document.createElement('div');
                    codeHeader.className = 'code-block-header';
                    const langSpan = document.createElement('span');
                    langSpan.className = 'code-block-lang';
                    langSpan.textContent = lang;
                    const copyBtn = document.createElement('button');
                    copyBtn.className = 'code-block-copy-btn';
                    copyBtn.type = 'button';
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Копировать';
                    copyBtn.onclick = function() {
                        navigator.clipboard.writeText(codeEl.textContent).then(() => {
                            const orig = copyBtn.innerHTML;
                            copyBtn.innerHTML = '<i class="fas fa-check"></i> Скопировано!';
                            copyBtn.classList.add('copied');
                            setTimeout(() => {
                                copyBtn.innerHTML = orig;
                                copyBtn.classList.remove('copied');
                            }, 1200);
                        });
                    };
                    codeHeader.appendChild(langSpan);
                    codeHeader.appendChild(copyBtn);

                    const codeContainer = document.createElement('div');
                    codeContainer.className = 'code-block-container';
                    codeContainer.appendChild(codeHeader);
                    codeContainer.appendChild(preEl.cloneNode(true)); // Клонируем pre элемент
                    preEl.replaceWith(codeContainer); // Заменяем оригинальный pre на новый контейнер
                });
            }
            
            // Добавляем обработанное содержимое (с блоками кода или без)
            Array.from(tempDiv.childNodes).forEach(node => {
                messageContentDiv.appendChild(node);
            });

            messageDiv.appendChild(avatarImg); // Аватар слева
            messageDiv.appendChild(messageContentDiv); // Контент справа
            messageWrapper.appendChild(messageDiv);

            // Действия для AI сообщения
            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('message-actions');
            const msgIdxInUI = chatMessagesContainer.childElementCount; // Текущий индекс (0-based) нового сообщения
            const likeKey = getMsgLikeKey(currentChatId, msgIdxInUI);
            const dislikeKey = getMsgDislikeKey(currentChatId, msgIdxInUI);
            const liked = localStorage.getItem(likeKey) === '1';
            const disliked = localStorage.getItem(dislikeKey) === '1';
            actionsDiv.innerHTML = `
                <button class="action-icon btn-regen" aria-label="Обновить"><i class="fas fa-redo"></i></button>
                <button class="action-icon btn-copy" aria-label="Копировать"><i class="fas fa-copy"></i></button>
                <button class="action-icon btn-like${liked ? ' liked' : ''}" aria-label="Нравится"><i class="fas fa-thumbs-up"></i></button>
                <button class="action-icon btn-dislike${disliked ? ' disliked' : ''}" aria-label="Не нравится"><i class="fas fa-thumbs-down"></i></button>
                <button class="action-icon btn-tts" aria-label="Озвучить"><i class="fas fa-volume-up"></i></button>
                <button class="action-icon btn-more" aria-label="Еще"><i class="fas fa-ellipsis-h"></i></button>
            `;
            actionsDiv.querySelector('.btn-copy').onclick = function() {
                // Копируем исходный Markdown текст, а не HTML
                navigator.clipboard.writeText(text).then(() => {
                    const originalContent = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check" style="color: var(--accent-color);"></i>';
                    this.classList.add('copied');
                    setTimeout(() => {
                        this.innerHTML = originalContent;
                        this.classList.remove('copied');
                    }, 1500);
                });
            };
             actionsDiv.querySelector('.btn-like').onclick = function () {
                const isLiked = this.classList.toggle('liked');
                localStorage.setItem(likeKey, isLiked ? '1' : '0');
                if (isLiked && actionsDiv.querySelector('.btn-dislike.disliked')) {
                    actionsDiv.querySelector('.btn-dislike').classList.remove('disliked');
                    localStorage.setItem(dislikeKey, '0');
                }
            };
            actionsDiv.querySelector('.btn-dislike').onclick = function () {
                const isDisliked = this.classList.toggle('disliked');
                localStorage.setItem(dislikeKey, isDisliked ? '1' : '0');
                 if (isDisliked && actionsDiv.querySelector('.btn-like.liked')) {
                    actionsDiv.querySelector('.btn-like').classList.remove('liked');
                    localStorage.setItem(likeKey, '0');
                }
            };
            actionsDiv.querySelector('.btn-tts').onclick = () => {
                if ('speechSynthesis' in window) {
                    // Для TTS читаем только текстовое содержимое без HTML/Markdown разметки
                    const plainTextForTTS = messageContentDiv.textContent || text; // Берем textContent из messageContentDiv
                    const utter = new SpeechSynthesisUtterance(plainTextForTTS);
                    utter.lang = 'ru-RU';
                    window.speechSynthesis.speak(utter);
                }
            };
            actionsDiv.querySelector('.btn-more').onclick = () => {
                // Заглушка, можно будет добавить меню
                showSimpleModal('Дополнительные действия', 'Эта функция будет доступна позже.');
            };
            actionsDiv.querySelector('.btn-regen').onclick = async function () {
                // Найти предыдущее пользовательское сообщение
                let userMsgTextForRegen = null;
                let userMsgHistoryForRegen = [];

                // Ищем назад от текущего AI сообщения до первого сообщения пользователя
                // Это предполагает, что chatHistory содержит актуальную историю до этого AI ответа
                // Если это первое сообщение ИИ в чате, то предыдущее сообщение пользователя - последнее в chatHistory
                if (chatHistory.length > 0) {
                    let lastUserMsgIndex = -1;
                    for (let i = chatHistory.length - 1; i >= 0; i--) {
                        if (chatHistory[i].role === 'user') {
                            lastUserMsgIndex = i;
                            break;
                        }
                    }
                    if (lastUserMsgIndex !== -1) {
                        userMsgTextForRegen = chatHistory[lastUserMsgIndex].content;
                        userMsgHistoryForRegen = chatHistory.slice(0, lastUserMsgIndex); // История до этого сообщения пользователя
                    }
                }


                if (userMsgTextForRegen) {
                    if (messageLimits && messageLimits.remaining <= 0) {
                        const message = currentUser.isPro ? 
                            `Достигнут лимит сообщений (${messageLimits.limit}). Пожалуйста, подождите.` :
                            `Достигнут лимит сообщений (${messageLimits.limit}). Пожалуйста, подождите или улучшите аккаунт до Pro для увеличения лимита.`;
                        addMessageToChat(message, 'system');
                        return;
                    }
                    
                    // Удаляем текущее AI сообщение из UI
                    messageWrapper.remove();
                    // Удаляем последнее AI сообщение из chatHistory (если оно там есть)
                    if (chatHistory.length > 0 && chatHistory[chatHistory.length - 1].role === 'ai') {
                        chatHistory.pop();
                    }
                    // Удаляем последнее AI сообщение из БД
                    let chat = await getChatById(currentChatId);
                    if (chat && chat.messages && chat.messages.length > 0 && chat.messages[chat.messages.length -1].sender === 'ai') {
                        chat.messages.pop();
                        chat.lastUpdated = Date.now();
                        await saveChatToServer(chat);
                    }

                    // Отправляем запрос на регенерацию
                    if (webEnabledCheckbox && webEnabledCheckbox.checked) {
                        await sendToBackendForBackgroundProcessing(userMsgTextForRegen, userMsgHistoryForRegen);
                    } else {
                        const aiReply = await sendToLLaMADirectly(userMsgTextForRegen, userMsgHistoryForRegen);
                        if (aiReply && aiReply !== 'Генерация остановлена') {
                            addMessageToChat(aiReply, 'ai');
                            await saveMessageToCurrentChat(aiReply, 'ai');
                        }
                    }
                    await fetchMessageLimits(); // Обновляем лимиты
                } else {
                    addMessageToChat("Не найдено предыдущее сообщение пользователя для регенерации.", "system");
                }
            };
            messageWrapper.appendChild(actionsDiv);

            // Подсветка синтаксиса для блоков кода после добавления в DOM
            setTimeout(() => {
                messageContentDiv.querySelectorAll('pre code').forEach(block => {
                    if (window.hljs) {
                        try {
                             window.hljs.highlightElement(block);
                        } catch (e) { console.error("Highlight.js error:", e); }
                    }
                });
            }, 0);
        }

        chatMessagesContainer.appendChild(messageWrapper);
        if (chatArea) {
            chatArea.scrollTop = chatArea.scrollHeight;
        }

        // Обновляем chatHistory только если это не системное сообщение и не запрещено опцией
        if (sender !== 'system' && !opts.noHistory) {
            // Предотвращаем дублирование, если сообщение уже есть (например, при switchChat)
            const lastInHistory = chatHistory.length > 0 ? chatHistory[chatHistory.length - 1] : null;
            if (!lastInHistory || !(lastInHistory.role === sender && lastInHistory.content === text)) {
                 chatHistory.push({ role: sender, content: text });
            }
        }
    }

    async function decrementMessageLimit() { // Эта функция больше не нужна на клиенте, сервер сам управляет
        // try {
        //     const response = await fetch('/api/message-limits/decrement', {
        //         method: 'POST',
        //         headers: { Authorization: 'Bearer ' + authToken }
        //     });
        //     if (!response.ok) throw new Error('Ошибка уменьшения лимита');
        //     const data = await response.json();
        //     if (messageLimits) messageLimits.remaining = data.remaining; 
        //     updateMessageLimitsUI();
        // } catch (error) {
        //     console.error('Ошибка уменьшения лимита сообщений:', error);
        // }
    }

    function showAiTypingIndicator() {
        if (aiTypingIndicator) {
            aiTypingIndicator.style.display = 'flex';
            aiTypingIndicator.style.opacity = '1';
            if (chatArea) chatArea.scrollTop = chatArea.scrollHeight;
        }
    }
    function hideAiTypingIndicator() {
        if (aiTypingIndicator) {
            aiTypingIndicator.style.opacity = '0';
            setTimeout(() => {
                if (aiTypingIndicator) aiTypingIndicator.style.display = 'none';
            }, 200); // Задержка должна соответствовать transition-duration
        }
    }

    if (btnSend && messageInput) {
        btnSend.addEventListener('click', handleSendMessage);
    }
    if (messageInput && enterSubmitsChatToggle) {
        messageInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter' && !event.shiftKey && enterSubmitsChatToggle.checked) {
                event.preventDefault();
                handleSendMessage();
            }
        });
    }
    if (messageInput) {
        messageInput.addEventListener('input', () => {
            messageInput.style.height = 'auto'; 
            messageInput.style.height = `${Math.min(messageInput.scrollHeight, 150)}px`;
        });
    }

    if (advancedSettingsToggle && advancedSettingsContent) {
        advancedSettingsToggle.addEventListener('click', () => {
            const isOpen = advancedSettingsContent.style.display === 'block';
            advancedSettingsContent.style.display = isOpen ? 'none' : 'block';
            advancedSettingsToggle.classList.toggle('open', !isOpen); 
        });
    }
    
    function updateWebSearchButtonVisualState() {
        if (webSearchBtn && webEnabledCheckbox) {
            webSearchBtn.classList.toggle('active', webEnabledCheckbox.checked);
        }
    }

    if (webSearchBtn && webEnabledCheckbox) {
        updateWebSearchButtonVisualState(); // Инициализация состояния кнопки
        webSearchBtn.addEventListener('click', () => {
            webEnabledCheckbox.checked = !webEnabledCheckbox.checked; 
            // Имитируем событие change для сохранения в localStorage и обновления других зависимых элементов
            const changeEvent = new Event('change', { bubbles: true });
            webEnabledCheckbox.dispatchEvent(changeEvent);
            // Визуальное состояние кнопки обновится через слушатель события 'change' на чекбоксе
        });
    }
    
    function updateCodeActionButtonVisualState() {
        if (codeActionBtn) {
            const isActive = localStorage.getItem(codeActionStorageKey) === 'true';
            codeActionBtn.classList.toggle('active', isActive);
        }
    }

    if (codeActionBtn) {
        updateCodeActionButtonVisualState();
        codeActionBtn.addEventListener('click', () => {
            let isActive = localStorage.getItem(codeActionStorageKey) === 'true';
            isActive = !isActive;
            localStorage.setItem(codeActionStorageKey, isActive);
            updateCodeActionButtonVisualState();
        });
    }

    const togglesToSave = [
        { id: 'web-enabled', storageKey: 'webEnabled' }, 
        { id: 'input-history', storageKey: 'inputHistoryNavigation' },
        { id: 'external-link-warning', storageKey: 'externalLinkWarning' },
        { id: 'disable-telemetry', storageKey: 'disableTelemetry' },
        { id: 'enter-submits', storageKey: 'enterSubmitsChat' } 
    ];

    togglesToSave.forEach(item => {
        const toggleElement = document.getElementById(item.id);
        if (toggleElement) {
            const savedValue = localStorage.getItem(item.storageKey);
            if (savedValue !== null) {
                toggleElement.checked = savedValue === 'true';
            }
            if (item.id === 'web-enabled') { 
                updateWebSearchButtonVisualState(); // Обновляем кнопку при инициализации чекбокса
            }
            toggleElement.addEventListener('change', (event) => {
                localStorage.setItem(item.storageKey, event.target.checked);
                if (item.id === 'web-enabled') {
                    updateWebSearchButtonVisualState(); // Обновляем кнопку при изменении чекбокса
                }
            });
        }
    });

    if (voiceInputBtn) {
        voiceInputBtn.addEventListener('click', () => {
            console.log("Кнопка голосового ввода нажата. Функционал пока не реализован.");
            // voiceInputBtn.classList.toggle('active');
        });
    }

    if (settingsTabs.length > 0 && settingsTabContents.length > 0) {
        const defaultTab = document.querySelector('.settings-tabs .tab-link[data-tab="text-settings"]');
        const defaultTabContent = document.getElementById('text-settings');
        if (defaultTab && defaultTabContent) {
            settingsTabs.forEach(t => t.classList.remove('active'));
            settingsTabContents.forEach(c => c.classList.remove('active'));
            defaultTab.classList.add('active');
            defaultTabContent.classList.add('active');
        }
    }

    if (subscriptionModal && upgradeToProLinks.length > 0 && closeSubscriptionModalBtn) {
        upgradeToProLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                subscriptionModal.style.display = 'flex';
                setTimeout(() => subscriptionModal.classList.add('open'), 10);
            });
        });
        function closeSubModal() {
            subscriptionModal.classList.remove('open');
        }
        closeSubscriptionModalBtn.addEventListener('click', closeSubModal);
        subscriptionModal.addEventListener('click', (event) => {
            if (event.target === subscriptionModal) { 
                closeSubModal();
            }
        });
        subscriptionModal.addEventListener('transitionend', () => {
            if (!subscriptionModal.classList.contains('open')) {
                subscriptionModal.style.display = 'none';
            }
        });
        subscriptionToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                subscriptionToggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const period = btn.dataset.period;
                if (period === 'monthly') {
                    subscriptionPriceEl.textContent = `$${monthlyPrice}`;
                    subscriptionPeriodEl.textContent = '/месяц';
                } else if (period === 'yearly') {
                    subscriptionPriceEl.textContent = `$${(yearlyPrice / 12).toFixed(0)}`; // Показываем цену за месяц при годовой оплате
                    subscriptionPeriodEl.textContent = '/месяц (оплата за год)';
                }
            });
        });
        if (subscriptionPriceEl && subscriptionPeriodEl) {
            const initialActiveToggle = document.querySelector('.subscription-toggle .sub-toggle-btn.active');
            const initialPeriod = initialActiveToggle ? initialActiveToggle.dataset.period : 'monthly';
            if (initialPeriod === 'monthly') {
                subscriptionPriceEl.textContent = `$${monthlyPrice}`;
                subscriptionPeriodEl.textContent = '/месяц';
            } else if (initialPeriod === 'yearly') {
                subscriptionPriceEl.textContent = `$${(yearlyPrice / 12).toFixed(0)}`;
                subscriptionPeriodEl.textContent = '/месяц (оплата за год)';
            }
        }
    }

    window.addEventListener('beforeunload', () => {
        if (tempNewChat && (!tempNewChat.messages || tempNewChat.messages.length === 0)) {
            // Не сохраняем пустой временный чат. Он будет удален при следующей загрузке, если не был сохранен.
            // Если нужно принудительно удалить его из allChats, это можно сделать здесь, но обычно это не требуется.
        }
        // Сохраняем ID активного чата
        if (currentChatId && !String(currentChatId).startsWith('temp-')) {
            localStorage.setItem('lastActiveChatId', currentChatId);
        }
    });

    let userFolders = [];
    const searchInput = document.querySelector('.search-bar input');
    const btnAddFolder = document.querySelector('.folders-section .section-header .btn-icon');
    const foldersList = document.querySelector('.folders-list');

    let openFolders = JSON.parse(localStorage.getItem('openFolders')) || {}; // {folderId: true/false}
    let activeFolderId = null; 

    async function loadFolders() {
        if (!authToken) return;
        try {
            const response = await fetch('/api/folders', {
                headers: { Authorization: 'Bearer ' + authToken }
            });
            if (!response.ok) throw new Error('Ошибка загрузки папок');
            userFolders = await response.json();
            renderFolders(); // Рендерим папки
            // renderChatsList(currentChatId); // Чаты без папок рендерятся отдельно
        } catch (error) {
            console.error('Ошибка загрузки папок:', error);
        }
    }

    function getChatsWithoutFolder() {
        const allChatIdsInFolders = userFolders.flatMap(f => f.chatIds || []);
        return allChats.filter(chat => !allChatIdsInFolders.includes(chat.id) && !String(chat.id).startsWith('temp-'));
    }

    function renderFolders() {
        if (!foldersList) return;
        let html = '';
        const sortedFolders = [...userFolders].sort((a,b) => (a.name || "").localeCompare(b.name || ""));


        for (const folder of sortedFolders) {
            const chatCount = folder.chatIds ? folder.chatIds.length : 0;
            const isOpen = openFolders[folder.id] !== false; 
            html += `
                <li data-folder-id="${folder.id}" class="folder-item ${String(activeFolderId) === String(folder.id) ? 'active' : ''}">
                    <span class="folder-toggle-arrow">
                        <i class="fas fa-chevron-${isOpen && chatCount > 0 ? 'down' : 'right'}"></i>
                    </span>
                    <i class="fas fa-folder${isOpen && chatCount > 0 ? '-open' : ''}"></i>
                    <span class="folder-name">${folder.name}</span>
                    ${chatCount > 0 ? `<span class="folder-chat-count">${chatCount}</span>` : ''}
                    <div class="folder-actions">
                        <button class="btn-icon btn-rename-folder" aria-label="Редактировать">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="btn-icon btn-delete-folder" aria-label="Удалить">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </li>
                <ul class="folder-chats-list" data-folder-chats="${folder.id}" style="display:${isOpen && chatCount > 0 ? 'block' : 'none'};">
                    ${(folder.chatIds || [])
                        .map(chatId => allChats.find(c => String(c.id) === String(chatId))) // Находим объекты чатов
                        .filter(chat => chat) // Убираем undefined, если чат был удален, но ID остался в папке
                        .sort((a, b) => (b.lastUpdated || b.id) - (a.lastUpdated || a.id)) // Сортируем чаты в папке
                        .map(chat => {
                        return `
                            <li data-chat-id="${chat.id}" class="${String(chat.id) === String(currentChatId) ? 'active-chat-item' : ''}">
                                <span class="chat-title" title="${chat.title || 'Новый чат'}">${chat.title || 'Новый чат'}</span>
                                <span class="chat-actions">
                                    <button class="btn-icon btn-rename-chat" title="Переименовать"><i class="fas fa-pencil-alt"></i></button>
                                    <button class="btn-icon btn-delete-chat" title="Удалить"><i class="fas fa-trash"></i></button>
                                    <button class="btn-icon btn-move-chat-out" title="Убрать из папки"><i class="fas fa-arrow-up"></i></button>
                                </span>
                            </li>
                        `;
                    }).join('')}
                </ul>
            `;
        }
        foldersList.innerHTML = html;
        setupFolderDragAndDrop(); // Переназначаем слушатели для drag-n-drop
    }

    if (foldersList) {
        foldersList.addEventListener('click', async (e) => {
            const folderItem = e.target.closest('.folder-item');
            const folderId = folderItem ? folderItem.dataset.folderId : null;

            if (folderItem && (e.target.closest('.folder-toggle-arrow') || (!e.target.closest('.folder-actions') && !e.target.closest('.btn-icon') && !e.target.classList.contains('folder-name')))) {
                openFolders[folderId] = !(openFolders[folderId] !== false); 
                localStorage.setItem('openFolders', JSON.stringify(openFolders));
                renderFolders();
                return;
            }
            // Клик по названию папки для выбора (фильтрации)
            if (folderItem && e.target.classList.contains('folder-name')) {
                // Логика выбора папки (если нужна фильтрация по папке, здесь ее реализовать)
                // activeFolderId = folderId;
                // renderFolders(); // Перерисовать папки с выделением активной
                // renderChatsList(null); // Перерисовать список чатов, отфильтровав по activeFolderId
                console.log("Выбрана папка:", folderId);
                return;
            }


            if (e.target.closest('.btn-delete-folder')) {
                if (folderId) {
                    const folder = userFolders.find(f => String(f.id) === String(folderId));
                    if (confirm(`Удалить папку "${folder.name}"? Чаты не будут удалены, а переместятся в основной список.`)) {
                        await fetch(`/api/folders/${folderId}`, {
                            method: 'DELETE',
                            headers: { Authorization: 'Bearer ' + authToken }
                        });
                        await loadFolders(); // Обновляем список папок
                        await syncChatsFromServer(); // Обновляем список чатов (т.к. чаты из папки теперь "без папки")
                    }
                }
                return;
            }

            if (e.target.closest('.btn-rename-folder')) {
                if (folderId) {
                    const folder = userFolders.find(f => String(f.id) === String(folderId));
                    if (!folder) return;
                    const newName = prompt('Новое название папки:', folder.name);
                    if (newName && newName.trim() && newName.trim() !== folder.name) {
                        await fetch(`/api/folders/${folderId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + authToken
                            },
                            body: JSON.stringify({ name: newName.trim() })
                        });
                        await loadFolders();
                    }
                }
                return;
            }

            const chatLi = e.target.closest('ul.folder-chats-list li[data-chat-id]');
            if (chatLi) {
                const chatId = chatLi.dataset.chatId;
                if (e.target.closest('.btn-rename-chat')) {
                    const chat = await getChatById(chatId);
                    if (!chat) return;
                    const titleSpan = chatLi.querySelector('.chat-title');
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = chat.title || '';
                    input.className = 'chat-title-input';
                    input.style.width = 'calc(100% - 20px)';
                    titleSpan.replaceWith(input);
                    input.focus();
                    input.select();
                    async function saveTitleInFolder() {
                        const newTitle = input.value.trim() || (chat.messages && chat.messages.length > 0 ? chat.messages[0].text.substring(0,30) : 'Новый чат');
                        if (chat.title === newTitle) {
                            input.replaceWith(titleSpan);
                            titleSpan.textContent = newTitle;
                            return;
                        }
                        chat.title = newTitle;
                        chat.lastUpdated = Date.now();
                        await saveChatToServer(chat); // Это вызовет sync и перерисовку
                    }
                    input.addEventListener('blur', saveTitleInFolder);
                    input.addEventListener('keydown', async (ev) => {
                        if (ev.key === 'Enter') { ev.preventDefault(); input.blur(); }
                        if (ev.key === 'Escape') { input.replaceWith(titleSpan); /* renderFolders(); */ }
                    });
                    return;
                }
                if (e.target.closest('.btn-delete-chat')) {
                     if (confirm(`Удалить чат "${(await getChatById(chatId))?.title || 'этот чат'}"?`)) {
                        await deleteChatOnServer(chatId); // deleteChatOnServer обновит и папки, и список чатов
                    }
                    return;
                }
                if (e.target.closest('.btn-move-chat-out')) {
                    await fetch(`/api/chats/${chatId}/move`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + authToken
                        },
                        body: JSON.stringify({ folderId: null }) // Перемещаем в "без папки"
                    });
                    await loadFolders(); // Обновляем папки (уменьшится счетчик)
                    await syncChatsFromServer(); // Обновляем список чатов "без папки"
                    return;
                }
                if (!e.target.closest('.btn-icon') && !e.target.closest('input')) {
                    if (String(currentChatId) !== String(chatId)) {
                        await switchChat(chatId);
                    }
                }
                return;
            }
        });
    }

    async function createFolder(name) {
        if (!authToken) return;
        try {
            const response = await fetch('/api/folders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + authToken
                },
                body: JSON.stringify({ name })
            });
            if (!response.ok) throw new Error('Ошибка создания папки');
            // const newFolder = await response.json(); // Сервер вернет созданную папку
            // userFolders.push(newFolder); // Добавляем в локальный массив
            await loadFolders(); // Перезагружаем все папки для корректного отображения
        } catch (error) {
            console.error('Ошибка создания папки:', error);
            addMessageToChat(`Ошибка создания папки: ${error.message}`, 'system');
        }
    }

    if (btnAddFolder) {
        btnAddFolder.addEventListener('click', () => {
            const name = prompt('Введите название папки:');
            if (name && name.trim()) createFolder(name.trim());
        });
    }

    let draggedChatId = null; // Храним ID перетаскиваемого чата

    function setupFolderDragAndDrop() {
        // Чаты из основного списка (вне папок)
        const chatItemsOutsideFolders = document.querySelectorAll('.chats-list li[data-chat-id]');
        // Чаты внутри папок
        const chatItemsInsideFolders = document.querySelectorAll('.folder-chats-list li[data-chat-id]');
        
        const allDraggableChatItems = [...chatItemsOutsideFolders, ...chatItemsInsideFolders];

        allDraggableChatItems.forEach(chat => {
            chat.setAttribute('draggable', 'true');
            chat.addEventListener('dragstart', handleDragStart);
            chat.addEventListener('dragend', handleDragEnd);
        });
        
        const folderDropTargets = document.querySelectorAll('.folders-list > .folder-item'); // Только элементы папок верхнего уровня
        folderDropTargets.forEach(folder => {
            folder.addEventListener('dragenter', handleDragEnter);
            folder.addEventListener('dragleave', handleDragLeave);
            folder.addEventListener('dragover', handleDragOver);
            folder.addEventListener('drop', handleDropOnFolder);
        });
    }

    function handleDragStart(e) {
        // Проверяем, что перетаскиваем именно li с chatId, а не его дочерний элемент (например, кнопку)
        if (e.target.matches('li[data-chat-id]')) {
            draggedChatId = e.target.dataset.chatId;
            e.target.classList.add('dragging');
            e.dataTransfer.setData('text/plain', draggedChatId);
            e.dataTransfer.effectAllowed = 'move';
        } else {
            e.preventDefault(); // Запрещаем перетаскивание, если это не сам элемент чата
        }
    }
    
    function handleDragEnd(e) {
        if (e.target.matches('li[data-chat-id]')) {
            e.target.classList.remove('dragging');
        }
        document.querySelectorAll('.folder-item.drag-over').forEach(folder => {
            folder.classList.remove('drag-over');
        });
        draggedChatId = null;
    }

    function handleDragEnter(e) {
        e.preventDefault();
        if (e.currentTarget.matches('.folder-item')) {
             e.currentTarget.classList.add('drag-over');
        }
    }

    function handleDragLeave(e) {
        e.preventDefault();
        if (e.currentTarget.matches('.folder-item')) {
            // Проверяем, что уходим именно с этого элемента, а не на дочерний
            if (!e.currentTarget.contains(e.relatedTarget)) {
                e.currentTarget.classList.remove('drag-over');
            }
        }
    }
    
    function handleDragOver(e) {
        e.preventDefault(); // Обязательно для drop
        if (e.currentTarget.matches('.folder-item')) {
            e.dataTransfer.dropEffect = 'move';
        }
    }
    
    async function handleDropOnFolder(e) {
        e.preventDefault();
        if (!e.currentTarget.matches('.folder-item')) return;
        e.currentTarget.classList.remove('drag-over');
        
        const targetFolderId = e.currentTarget.dataset.folderId;
        const chatIdToMove = e.dataTransfer.getData('text/plain') || draggedChatId; // Получаем ID чата

        if (!chatIdToMove || !targetFolderId) {
            console.warn("Drop failed: missing chatId or folderId", chatIdToMove, targetFolderId);
            return;
        }
        if (chatIdToMove === targetFolderId) return; // Нельзя бросить папку саму на себя (если бы папки были draggable)

        try {
            const response = await fetch(`/api/chats/${chatIdToMove}/move`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + authToken
                },
                body: JSON.stringify({ folderId: targetFolderId })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка перемещения чата');
            }
            
            // Обновляем UI после успешного перемещения
            // Сервер теперь возвращает обновленные списки, можно их использовать
            const { folders: updatedFolders, chats: updatedChats } = await response.json();
            userFolders = updatedFolders;
            allChats = updatedChats;

            renderFolders(); // Перерисовываем папки (обновятся счетчики и списки чатов внутри)
            renderChatsList(currentChatId); // Перерисовываем список чатов "без папки"

        } catch (error) {
            console.error('Ошибка перемещения чата:', error);
            addMessageToChat(`Ошибка перемещения чата: ${error.message}`, 'system');
        } finally {
            draggedChatId = null;
        }
    }


    let searchTimeout = null;
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            if (searchTimeout) clearTimeout(searchTimeout);
            searchTimeout = setTimeout(async () => {
                const query = e.target.value.trim().toLowerCase();
                // Фильтрация на клиенте для немедленного отклика
                // Фильтруем папки
                userFolders.forEach(folder => {
                    const folderItem = foldersList.querySelector(`.folder-item[data-folder-id="${folder.id}"]`);
                    const folderChatsList = foldersList.querySelector(`ul[data-folder-chats="${folder.id}"]`);
                    let folderVisible = folder.name.toLowerCase().includes(query);
                    let hasVisibleChatsInFolder = false;

                    if (folder.chatIds && folderChatsList) {
                        folder.chatIds.forEach(chatId => {
                            const chat = allChats.find(c => String(c.id) === String(chatId));
                            const chatLi = folderChatsList.querySelector(`li[data-chat-id="${chatId}"]`);
                            if (chat && chatLi) {
                                const chatVisible = (chat.title && chat.title.toLowerCase().includes(query)) ||
                                                    (chat.messages && chat.messages.some(m => m.text.toLowerCase().includes(query)));
                                chatLi.style.display = chatVisible ? '' : 'none';
                                if (chatVisible) hasVisibleChatsInFolder = true;
                            }
                        });
                    }
                    if (folderItem) folderItem.style.display = (folderVisible || hasVisibleChatsInFolder) ? '' : 'none';
                    if (folderChatsList) folderChatsList.style.display = (folderVisible || hasVisibleChatsInFolder) && openFolders[folder.id] !== false && (folder.chatIds && folder.chatIds.length > 0) ? 'block' : 'none';

                });

                // Фильтруем чаты вне папок
                const chatsOutside = getChatsWithoutFolder();
                chatsListUl.innerHTML = ''; // Очищаем и перерисовываем только отфильтрованные
                 chatsOutside
                    .filter(chat => (chat.title && chat.title.toLowerCase().includes(query)) ||
                                   (chat.messages && chat.messages.some(m => m.text.toLowerCase().includes(query))))
                    .sort((a, b) => (b.lastUpdated || b.id) - (a.lastUpdated || a.id))
                    .forEach(chat => {
                        // Логика создания li элемента (аналогично renderChatsList)
                        const li = document.createElement('li');
                        li.dataset.chatId = chat.id;
                        li.className = (String(chat.id) === String(currentChatId)) ? 'active-chat-item' : '';
                        // ... остальное создание элемента li ...
                        const titleSpan = document.createElement('span');
                        titleSpan.className = 'chat-title';
                        titleSpan.textContent = chat.title || 'Новый чат';
                        titleSpan.title = chat.title || 'Новый чат';
                        li.appendChild(titleSpan);

                        const actions = document.createElement('span');
                        actions.style.marginLeft = 'auto';
                        actions.className = 'chat-actions';
                        actions.innerHTML = `
                            <button class="btn-icon btn-rename-chat" title="Переименовать"><i class="fas fa-pencil-alt"></i></button>
                            <button class="btn-icon btn-delete-chat" title="Удалить"><i class="fas fa-trash"></i></button>
                        `;
                        li.appendChild(actions);
                        chatsListUl.appendChild(li);
                    });
                setupFolderDragAndDrop(); // Важно для новых элементов

            }, 300);
        });
    }


    let messageLimits = null;

    async function fetchMessageLimits() {
        if (!authToken) return;
        try {
            const response = await fetch('/api/message-limits', {
                headers: { Authorization: 'Bearer ' + authToken }
            });
            if (response.ok) {
                messageLimits = await response.json();
                updateMessageLimitsUI();
            } else {
                console.warn("Failed to fetch message limits:", response.status);
                 const limitDisplay = document.querySelector('.message-limits');
                 if(limitDisplay) limitDisplay.style.display = 'none'; // Скрываем, если ошибка
            }
        } catch (error) {
            console.error('Ошибка получения лимитов:', error);
            const limitDisplay = document.querySelector('.message-limits');
            if(limitDisplay) limitDisplay.style.display = 'none';
        }
    }

    setInterval(updateMessageLimitsUI, 60000);

    const commandSuggestions = document.getElementById('commandSuggestions');
    const commandItems = commandSuggestions ? commandSuggestions.querySelectorAll('.command-item') : [];
    let commandMenuActive = false;

    const COMMANDS = [
        {
            key: 'заряд батареи',
            match: (txt) => txt.trim().toLowerCase() === 'заряд батареи',
            handler: () => `Текущий заряд батареи: <b>${getCurrentBattery()}</b>`
        },
        {
            key: 'температура',
            match: (txt) => txt.trim().toLowerCase() === 'температура',
            handler: () => `Текущая температура сервера: <b>${getCurrentTemperature()}</b>`
        },
        {
            key: 'время работы',
            match: (txt) => txt.trim().toLowerCase() === 'время работы',
            handler: () => `Время работы сервера: <b>${getCurrentUptime()}</b>`
        },
        {
            key: 'помощь',
            match: (txt) => txt.trim().toLowerCase() === 'помощь',
            handler: () => `Доступные команды:<br>
- <b>заряд батареи</b> — показать уровень заряда устройства<br>
- <b>температура</b> — температура CPU устройства<br>
- <b>время работы</b> — аптайм сервера<br>
- <b>помощь</b> — список команд`
        }
    ];

    function showCommandMenu() {
        if (commandSuggestions) {
            commandSuggestions.style.display = 'block';
            commandMenuActive = true;
        }
    }
    function hideCommandMenu() {
        if (commandSuggestions) {
            commandSuggestions.style.display = 'none';
            commandMenuActive = false;
        }
    }

    if (messageInput) {
        messageInput.addEventListener('input', (e) => {
            const val = messageInput.value;
            if (/^@[\wа-яё]*$/i.test(val.trim())) { // Показываем если начинается с @ и дальше буквы/цифры
                showCommandMenu();
            } else {
                hideCommandMenu();
            }
        });
        messageInput.addEventListener('blur', () => {
            setTimeout(hideCommandMenu, 150); 
        });
    }

    if (commandSuggestions) {
        commandSuggestions.addEventListener('mousedown', async (e) => { // mousedown чтобы сработало до blur на input
            const item = e.target.closest('.command-item');
            if (!item) return;
            e.preventDefault(); // Предотвращаем потерю фокуса с инпута до обработки
            const cmdKey = item.dataset.cmd;
            hideCommandMenu();
            if (messageInput) {
                messageInput.value = ''; 
            }
            const commandObj = COMMANDS.find(c => c.key === cmdKey);
            if (commandObj) {
                addMessageToChat(cmdKey, 'user'); // Отображаем команду как сообщение пользователя
                await saveMessageToCurrentChat(cmdKey, 'user'); // Сохраняем команду
                
                addMessageToChat(commandObj.handler(), 'ai'); // Отображаем ответ ИИ
                await saveMessageToCurrentChat(commandObj.handler(), 'ai'); // Сохраняем ответ ИИ
            }
            if (messageInput) {
                messageInput.focus();
            }
        });
    }

    // --- SSE для фоновых ответов ---
    let backgroundSSE = null;
    function startBackgroundSSE() {
        if (backgroundSSE) backgroundSSE.close();
        backgroundSSE = new EventSource('/api/background-events');
        backgroundSSE.onmessage = async function (event) {
            try {
                const data = JSON.parse(event.data);
                // Проверяем, что чат актуальный и пользователь на сайте
                if (data && data.chatId && String(data.chatId) === String(currentChatId) && data.aiReply) {
                    addMessageToChat(data.aiReply, 'ai');
                    await saveMessageToCurrentChat(data.aiReply, 'ai');
                    await fetchMessageLimits();
                }
            } catch (e) {
                // ignore parse errors
            }
        };
        backgroundSSE.onerror = function () {
            // Автоматически переподключаемся через 5 секунд
            setTimeout(startBackgroundSSE, 5000);
        };
    }
    // Запускаем SSE после успешной авторизации
});

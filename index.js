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
    const reflexSvgUrl = "https://cdn.glitch.global/209e13d7-5228-4d40-9601-0a225164a2fe/reflex.svg?v=1746970198201";

    const monthlyPrice = 10; // Месячная цена подписки
    const yearlyPrice = 100; // Годовая цена подписки

    // Новый элемент для анимации "ИИ печатает..."
    const aiTypingIndicator = document.getElementById('aiTypingIndicator');

    // --- Мини-монитор температуры и батареи ---
    // Элементы мини-шкал
    const miniTempValue = document.getElementById('miniTempValue');
    const miniTempBar = document.getElementById('miniTempBar');
    const miniTempIcon = document.getElementById('miniTempIcon');
    const miniBatteryValue = document.getElementById('miniBatteryValue');
    const miniBatteryBar = document.getElementById('miniBatteryBar');
    const miniBatteryIcon = document.getElementById('miniBatteryIcon');

    // SVG иконки
    const thermometerSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>`;
    const batteryIcons = {
        low: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect><line x1="22" x2="22" y1="11" y2="13"></line><line x1="6" x2="6" y1="12" y2="12"></line></svg>`,
        medium: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect><line x1="22" x2="22" y1="11" y2="13"></line><line x1="6" x2="6" y1="12" y2="12"></line><line x1="10" x2="10" y1="12" y2="12"></line></svg>`,
        full: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect><line x1="22" x2="22" y1="11" y2="13"></line><line x1="6" x2="6" y1="12" y2="12"></line><line x1="10" x2="10" y1="12" y2="12"></line><line x1="14" x2="14" y1="12" y2="12"></line></svg>`
    };
    // SVG для молнии (зарядка)
    const chargingSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>`;

    // --- Получение monitorUrl с сервера ---
    let MINI_MONITOR_CONFIG = {
        minTemperature: 25,
        maxTemperature: 45,
        dataUrl: '', // будет получено с сервера
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

    // --- Состояния мини-монитора ---
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
        let color = '#22c55e'; // green (≤ 35)
        if (temp >= 39) color = '#ef4444'; // red (≥ 39)
        else if (temp > 35) color = '#fde047'; // yellow (> 35 и < 39)
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
        let color = '#fde047'; // yellow
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
        try {
            const response = await fetch(MINI_MONITOR_CONFIG.dataUrl);
            if (!response.ok) throw new Error();
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
        } catch {
            if (miniTempValue) { miniTempValue.textContent = '--°C'; miniTempBar.style.width = '0%'; }
            if (miniBatteryValue) { miniBatteryValue.textContent = '--%'; miniBatteryBar.style.width = '0%'; }
        }
    }

    // Заменить вызовы fetchMiniMonitorData/setInterval на асинхронную инициализацию:
    (async function () {
        await fetchMonitorUrl();
        setInterval(fetchMiniMonitorData, MINI_MONITOR_CONFIG.refreshInterval);
        fetchMiniMonitorData();
    })();

    // --- ДОБАВЛЕНО: функции для получения текущих значений мини-монитора ---
    function getCurrentTemperature() {
        if (miniTempValue && miniTempValue.textContent && miniTempValue.textContent !== '--°C') {
            return miniTempValue.textContent.replace(',', '.');
        }
        return 'Нет данных';
    }
    function getCurrentBattery() {
        if (miniBatteryValue && miniBatteryValue.textContent && miniBatteryValue.textContent !== '--%') {
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
        if (parts.length === 0) parts.push(`${s} сек.`);
        return parts.join(' ');
    }
    function getCurrentUptime() {
        return formatUptime(lastMiniMonitorData.uptimeSeconds);
    }

    // --- Новый блок: Проверка авторизации и редирект ---
    let authToken = localStorage.getItem('authToken') || null;
    let currentUser = null;

    // Если не на странице авторизации и нет токена — редирект на auth.html
    if (!authToken && !window.location.pathname.endsWith('auth.html')) {
        window.location.href = 'auth.html';
        return;
    }

    // Если на странице авторизации и токен есть — редирект на главную
    if (window.location.pathname.endsWith('auth.html') && authToken) {
        window.location.href = 'index.html';
        return;
    }

    // --- Функция получения профиля пользователя ---
    async function fetchCurrentUser() {
        if (!authToken) return;
        try {
            let resp = await fetch('/api/me', { headers: { Authorization: 'Bearer ' + authToken } });
            if (!resp.ok) throw new Error();
            currentUser = await resp.json();
        } catch {
            localStorage.removeItem('authToken');
            authToken = null;
            currentUser = null;
            window.location.href = 'auth.html';
        }
    }

    // --- Синхронизация чатов с сервером ---
    let chatHistory = [];
    let currentChatId = null;
    let allChats = [];
    let tempNewChat = null; // временный чат, не сохранённый на сервере

    async function syncChatsFromServer() {
        if (!authToken) return;
        let resp = await fetch('/api/chats', { headers: { Authorization: 'Bearer ' + authToken } });
        if (!resp.ok) { allChats = []; return; }
        allChats = await resp.json();
        await renderChatsList(currentChatId);
    }

    async function renderChatsList(selectedId) {
        if (!chatsListUl) return;
        chatsListUl.innerHTML = '';

        const displayChats = getChatsWithoutFolder();

        for (const chat of displayChats) {
            const li = document.createElement('li');
            li.dataset.chatId = chat.id;
            li.className = (chat.id === selectedId) ? 'active-chat-item' : '';
            const titleSpan = document.createElement('span');
            titleSpan.className = 'chat-title';
            titleSpan.textContent = chat.title || 'Без названия';
            titleSpan.title = chat.title || 'Без названия';
            li.appendChild(titleSpan);

            const actions = document.createElement('span');
            actions.style.marginLeft = 'auto';
            actions.innerHTML = `
                <button class="btn-icon btn-rename-chat" title="Переименовать"><i class="fas fa-pencil-alt"></i></button>
                <button class="btn-icon btn-delete-chat" title="Удалить"><i class="fas fa-trash"></i></button>
            `;
            li.appendChild(actions);

            chatsListUl.appendChild(li);
        }
        setupFolderDragAndDrop();
    }

    // --- CRUD чатов через API ---
    async function getChat(id) {
        if (tempNewChat && tempNewChat.id === id) return tempNewChat;
        return allChats.find(c => String(c.id) === String(id));
    }

    async function saveChat(chat) {
        // tempNewChat сохраняется только при первом сообщении
        if (chat === tempNewChat) {
            // Сохраняем на сервере только если есть хотя бы одно сообщение
            if (chat.messages && chat.messages.length > 0) {
                let resp = await fetch('/api/chats', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + authToken },
                    body: JSON.stringify({ title: chat.title, messages: chat.messages })
                });
                if (resp.ok) {
                    await syncChatsFromServer();
                    // Получаем id нового чата с сервера
                    let newChat = allChats[0];
                    tempNewChat = null;
                    currentChatId = newChat.id;
                }
            }
            return;
        }
        let resp = await fetch('/api/chats/' + chat.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + authToken },
            body: JSON.stringify(chat)
        });
        if (resp.ok) {
            await syncChatsFromServer();
        }
    }

    async function deleteChat(id) {
        await fetch('/api/chats/' + id, {
            method: 'DELETE',
            headers: { Authorization: 'Bearer ' + authToken }
        });
        await syncChatsFromServer();
        // После удаления: если удалён текущий чат — переключиться на первый оставшийся
        if (allChats.length > 0) {
            await switchChat(allChats[0].id);
        } else {
            await createNewChat();
        }
    }

    async function createNewChat() {
        // Если уже есть tempNewChat — просто переключаемся на него
        if (tempNewChat) {
            await switchChat(tempNewChat.id);
            return;
        }
        // Создаём временный чат только в памяти (всегда, даже если есть другие чаты)
        tempNewChat = {
            id: 'temp-' + Date.now(),
            username: currentUser.username,
            title: '',
            messages: []
        };
        currentChatId = tempNewChat.id;
        chatHistory = [];
        chatMessagesContainer.innerHTML = '';
        await renderChatsList(currentChatId);
    }

    async function switchChat(id) {
        currentChatId = id;
        await renderChatsList(currentChatId);
        chatMessagesContainer.innerHTML = '';
        chatHistory = [];
        let chat = null;
        if (tempNewChat && tempNewChat.id === id) {
            chat = tempNewChat;
        } else {
            chat = allChats.find(c => String(c.id) === String(id));
        }
        if (chat && Array.isArray(chat.messages)) {
            for (const msg of chat.messages) {
                chatHistory.push({ role: msg.sender, content: msg.text });
                addMessageToChat(msg.text, msg.sender);
            }
        }
    }

    async function saveMessageToCurrentChat(text, sender) {
        if (!currentChatId) return;
        let chat = null;
        if (tempNewChat && tempNewChat.id === currentChatId) {
            chat = tempNewChat;
        } else {
            chat = allChats.find(c => String(c.id) === String(currentChatId));
        }
        if (!chat) return;
        chat.messages = chat.messages || [];
        chat.messages.push({ text, sender });
        await saveChat(chat);
    }

    // --- Обработка событий для списка чатов (удаление, переименование, переключение) ---
    if (chatsListUl) {
        chatsListUl.addEventListener('click', async (e) => {
            const li = e.target.closest('li');
            if (!li) return;
            const chatId = li.dataset.chatId;
            if (e.target.closest('.btn-rename-chat')) {
                const chat = await getChat(chatId);
                if (!chat) return;
                const titleSpan = li.querySelector('.chat-title');
                const input = document.createElement('input');
                input.type = 'text';
                input.value = chat.title || '';
                input.className = 'chat-title-input';
                input.style.width = '90%';
                titleSpan.replaceWith(input);
                input.focus();
                input.select();

                async function saveTitle() {
                    const newTitle = input.value.trim() || 'Без названия';
                    chat.title = newTitle;
                    await saveChat(chat);
                    await renderChatsList(currentChatId);
                }
                input.addEventListener('blur', saveTitle);
                input.addEventListener('keydown', async (ev) => {
                    if (ev.key === 'Enter') input.blur();
                    if (ev.key === 'Escape') await renderChatsList(currentChatId);
                });
                return;
            }
            if (e.target.closest('.btn-delete-chat')) {
                if (confirm('Удалить этот чат?')) {
                    await deleteChat(chatId);
                }
                return;
            }
            if (e.target.closest('.btn-move-chat-out')) {
                // Удалить чат из папки (переместить в "Без папки")
                await fetch(`/api/chats/${chatId}/move`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + authToken
                    },
                    body: JSON.stringify({ folderId: null })
                });
                await loadFolders();
                await syncChatsFromServer();
                renderChatsList(currentChatId);
                return;
            }
            // Переключение чата по клику (если не по кнопкам)
            if (chatId && !e.target.closest('.btn-icon')) {
                await switchChat(chatId);
            }
        });
    }

    // --- UI: user-profile (внизу слева) ---
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
            userProfile.appendChild(logoutBtn);
        }
        logoutBtn.onclick = () => {
            localStorage.removeItem('authToken');
            authToken = null;
            currentUser = null;
            window.location.href = 'auth.html';
        };
        updateProLinkUI();
    }

    // Добавляем функцию для генерации названия с учетом Pro статуса
    function getAppName() {
        return `Reflex AI${currentUser?.isPro ? ' Pro' : ''}`;
    }

    // --- Добавляем функцию для вставки градиентной звезды в заголовок ---
    function renderProStarInHeader() {
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        if (!dropdownToggle) return;
        // Удаляем старую звезду, если есть
        const oldStar = dropdownToggle.querySelector('.pro-gradient-icon');
        if (oldStar) oldStar.remove();

        if (currentUser && currentUser.isPro) {
            // SVG с градиентом (тот же, что и в updateProLinkUI)
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
            // Вставляем звезду после .gradient-pro-title, до стрелки
            const titleSpan = dropdownToggle.querySelector('.gradient-pro-title');
            if (titleSpan && !titleSpan.nextElementSibling?.classList?.contains('pro-gradient-icon')) {
                titleSpan.insertAdjacentHTML('afterend', proSvgGradient);
            }
        }
    }

    // Обновляем рендер названия в dropdown
    if (document.querySelector('.dropdown-toggle')) {
        // Используем градиентный span
        document.querySelector('.dropdown-toggle').innerHTML = 
            `<span class="gradient-pro-title">${getAppName()}</span> <i class="fas fa-chevron-down"></i>`;
        // Добавляем звезду, если Pro
        renderProStarInHeader();
    }

    // --- Меню профиля (dropdown) ---
    const userProfileDropdown = document.querySelector('.user-profile');
    const profileMenuDropdown = document.getElementById('profileMenuDropdown');
    let profileMenuOpen = false;

    // --- Модальное окно для редактирования профиля ---
    let profileEditModal = null;
    function showProfileEditModal() {
        if (profileEditModal) profileEditModal.remove();
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

        // Закрытие по кнопке или клику вне окна
        profileEditModal.querySelector('.btn-close-modal').onclick = () => profileEditModal.remove();
        profileEditModal.onclick = (e) => {
            if (e.target === profileEditModal) profileEditModal.remove();
        };

        // Сохранение изменений
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
                // Имитация обновления на сервере (реальный эндпоинт нужно реализовать на сервере)
                let resp = await fetch('/api/me', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + authToken },
                    body: JSON.stringify({ displayName: newDisplayName })
                });
                if (!resp.ok) throw new Error('Ошибка сохранения');
                currentUser.displayName = newDisplayName;
                renderUserProfile();
                closeProfileMenu();
                profileEditModal.remove();
            } catch {
                feedback.textContent = 'Ошибка сохранения';
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
            <div class="profile-menu-footer">Reflex AI &copy; 2025</div>
        `;
        profileMenuDropdown.querySelectorAll('.profile-menu-list li').forEach(li => {
            li.onclick = () => {
                const act = li.dataset.action;
                if (act === 'logout') {
                    localStorage.removeItem('authToken');
                    window.location.href = 'auth.html';
                } else if (act === 'about') {
                    // Всплывающее окно "О проекте"
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
                    showSimpleModal('Резервное копирование', 'Резервное копирование доступно только для PRO.');
                }
                closeProfileMenu();
            };
        });
    }

    // Универсальное простое модальное окно
    function showSimpleModal(title, html) {
        let modal = document.createElement('div');
        modal.className = 'modal-overlay open';
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

    // --- Кнопки "Новый чат" (сайдбар и хедер) ---
    const btnNewChatSidebar = document.querySelector('.btn-new-chat');
    const btnNewChatHeader = document.querySelector('.btn-new-chat-header');
    if (btnNewChatSidebar) btnNewChatSidebar.onclick = async () => { await createNewChat(); };
    if (btnNewChatHeader) btnNewChatHeader.onclick = async () => { await createNewChat(); };

    // --- Управление отображением ссылки "Улучшить до Pro" ---
    function updateProLinkUI() {
        // В input-secondary-line
        const proFeatures = document.querySelector('.pro-features');
        if (!proFeatures) return;
        proFeatures.innerHTML = '';
        // Градиент для SVG через id и <linearGradient>
        const gradientId = 'pro-gradient-svg';
        const proSvgGradient = `
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style="vertical-align:middle;display:inline-block;" xmlns="http://www.w3.org/2000/svg">
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
        const proSvgSmallGradient = `
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" style="vertical-align:middle;display:inline-block;" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="${gradientId}-small" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#3ee97c"/>
                        <stop offset="100%" stop-color="#5faee3"/>
                    </linearGradient>
                </defs>
                <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z"
                    stroke="url(#${gradientId}-small)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `;
        if (currentUser && currentUser.isPro) {
            // Не показываем значок внизу, если Pro
            // proFeatures.innerHTML = ''; // уже очищено выше
        } else {
            // Ссылка "Улучшить до Pro" с градиентным SVG и текстом (текст всегда видим)
            const link = document.createElement('a');
            link.href = '#';
            link.className = 'upgrade-to-pro-link';
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
            proFeatures.appendChild(link);
        }
    }

    // --- При заходе всегда новый чат без названия ---
    async function mainAuthInit() {
        await fetchCurrentUser();
        if (!currentUser) return;
        await Promise.all([
            syncChatsFromServer(),
            loadFolders(),
            fetchMessageLimits()  // Добавляем загрузку лимитов
        ]);
        renderUserProfile();
        updateProLinkUI();
        // Если нет чатов и нет tempNewChat — создать новый чат
        if (allChats.length === 0 && !tempNewChat) {
            await createNewChat();
        } else if (allChats.length > 0) {
            await switchChat(allChats[0].id);
        }

        // Обновляем заголовок после получения данных пользователя
        document.title = getAppName();
        // Используем градиентный span
        document.querySelector('.dropdown-toggle').innerHTML = 
            `<span class="gradient-pro-title">${getAppName()}</span> <i class="fas fa-chevron-down"></i>`;
        renderProStarInHeader();
    }
    (async function () { await mainAuthInit(); })();

    // --- Корректировка высоты приложения для мобильных устройств ---
    function adjustAppHeight() {
        if (appContainer) {
            appContainer.style.height = window.innerHeight + 'px';
        }
    }

    adjustAppHeight(); // Вызов при загрузке
    window.addEventListener('resize', adjustAppHeight); // Вызов при изменении размера окна
    window.addEventListener('orientationchange', adjustAppHeight); // Вызов при изменении ориентации экрана

    // --- Управление экраном загрузки ---
    if (loadingScreen && appContainer) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0'; // Плавное исчезновение экрана загрузки
            loadingScreen.addEventListener('transitionend', () => {
                loadingScreen.style.display = 'none'; // Скрытие экрана загрузки после анимации
                appContainer.style.display = 'flex'; // Отображение основного контейнера
                requestAnimationFrame(() => { // Плавное появление основного контейнера
                    appContainer.style.opacity = '1';
                    adjustAppHeight(); 
                });
            }, { once: true }); // Слушатель сработает только один раз
        }, 1500); // Задержка перед скрытием экрана загрузки
    } else if (appContainer) { // Если экрана загрузки нет, сразу показываем приложение
        appContainer.style.display = 'flex';
        appContainer.style.opacity = '1';
        adjustAppHeight();
    }

    // --- Управление боковой панелью ---
    function openMobileSidebar() {
        if (sidebar && window.innerWidth <= 768) { // Открываем только на мобильных
            sidebar.classList.add('sidebar-open');
            body.classList.add('sidebar-open-mobile'); // Добавляем класс для body для блокировки прокрутки и т.д.
        }
    }

    function closeMobileSidebar() {
        if (sidebar) {
            sidebar.classList.remove('sidebar-open');
            body.classList.remove('sidebar-open-mobile');
        }
    }

    // По умолчанию открываем сайдбар на десктопе
    if (window.innerWidth > 768 && sidebar) {
        sidebar.classList.add('sidebar-open');
        if (btnToggleSidebar) { // Меняем иконку кнопки
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
            if (window.innerWidth <= 768) { // Логика для мобильных
                if (sidebar.classList.contains('sidebar-open')) {
                    closeMobileSidebar();
                } else {
                    openMobileSidebar();
                }
            } else { // Логика для десктопа
                sidebar.classList.toggle('sidebar-open');
                if (sidebar.classList.contains('sidebar-open')) {
                   icon.classList.remove('fa-bars');
                   icon.classList.add('fa-bars-staggered');
                } else {
                   icon.classList.remove('fa-bars-staggered');
                   icon.classList.add('fa-bars');
                }
            }
        });
    }

    if (btnCloseSidebar) { // Кнопка закрытия на мобильных
        btnCloseSidebar.addEventListener('click', closeMobileSidebar);
    }

    if (sidebarOverlay) { // Закрытие по клику на оверлей
        sidebarOverlay.addEventListener('click', closeMobileSidebar);
    }

    // --- Эффект прокрутки для шапки ---
    if (chatArea && mainHeader) {
        chatArea.addEventListener('scroll', () => {
            const isScrolled = chatArea.scrollTop > 20; // Если прокручено больше чем на 20px
            mainHeader.classList.toggle('scrolled', isScrolled); // Добавляем/удаляем класс 'scrolled'
            if (mobileHeaderInfo) { // Также для мобильной инфо-панели
                 mobileHeaderInfo.classList.toggle('scrolled', isScrolled);
            }
        });
    }

    // --- Управление панелью настроек ---
    if (btnSettings && settingsPanel) {
        btnSettings.addEventListener('click', () => settingsPanel.classList.add('open'));
    }
    if (btnCloseSettings && settingsPanel) {
        btnCloseSettings.addEventListener('click', () => settingsPanel.classList.remove('open'));
    }
    // Закрытие панели настроек по клику вне её
    document.addEventListener('click', (event) => {
        if (settingsPanel && settingsPanel.classList.contains('open')) {
            const isClickInsidePanel = settingsPanel.contains(event.target);
            const isClickOnSettingsButton = btnSettings && btnSettings.contains(event.target);
            if (!isClickInsidePanel && !isClickOnSettingsButton) {
                settingsPanel.classList.remove('open');
            }
        }
    });

    // Переключение вкладок в настройках
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            settingsTabs.forEach(t => t.classList.remove('active'));
            settingsTabContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const targetTabContent = document.getElementById(tab.dataset.tab);
            if (targetTabContent) targetTabContent.classList.add('active');
        });
    });

    // --- Управление цветовой схемой и цветом темы ---
    if (colorSchemeSelect) {
        const savedScheme = localStorage.getItem('colorScheme') || 'dark'; // Загрузка сохраненной схемы или темная по умолчанию
        body.classList.remove('dark-theme', 'light-theme');
        body.classList.add(`${savedScheme}-theme`);
        colorSchemeSelect.value = savedScheme;

        colorSchemeSelect.addEventListener('change', (event) => {
            const selectedScheme = event.target.value;
            body.classList.remove('dark-theme', 'light-theme');
            body.classList.add(`${selectedScheme}-theme`);
            localStorage.setItem('colorScheme', selectedScheme);
            applyAccentColor(localStorage.getItem('accentColor') || getDefaultAccentForScheme(selectedScheme)); // Применяем текущий или дефолтный акцент для новой схемы
        });
    }
    
    // Функция для получения дефолтного акцентного цвета для текущей схемы (темная/светлая)
    function getDefaultAccentForScheme(scheme) {
        return scheme === 'light' ? 'default' : 'orange'; // Например, 'default' (синий) для светлой, 'orange' для темной
    }

    const currentThemeColorClasses = ['theme-default', 'theme-blue', 'theme-pink', 'theme-purple', 'theme-orange', 'theme-violet', 'theme-green', 'theme-grey'];
    
    function applyAccentColor(colorName) {
        currentThemeColorClasses.forEach(cls => body.classList.remove(cls)); // Удаляем все классы цветовых тем
        body.classList.add(`theme-${colorName}`); // Добавляем класс выбранной темы
        localStorage.setItem('accentColor', colorName); // Сохраняем выбор
        themeColorPickers.forEach(p => p.classList.toggle('active', p.dataset.color === colorName)); // Отмечаем активный кружок

        // Обновляем переменную для свечения на основе выбранного акцентного цвета
        const computedStyle = getComputedStyle(body);
        const accentRgb = computedStyle.getPropertyValue('--accent-color-rgb').trim();
        if (accentRgb) {
            body.style.setProperty('--accent-color-glow', `rgba(${accentRgb}, 0.5)`);
        } else { 
            // Фоллбэк, если RGB не определен (маловероятно при правильной CSS структуре)
            const fallbackAccentRgb = body.classList.contains('light-theme') ? "0, 122, 255" : "169, 169, 169"; 
            body.style.setProperty('--accent-color-glow', `rgba(${fallbackAccentRgb}, 0.5)`);
        }
    }
    // При загрузке применяем сохраненный акцентный цвет или дефолтный для текущей схемы
    const initialScheme = localStorage.getItem('colorScheme') || 'dark';
    const savedAccentColor = localStorage.getItem('accentColor') || getDefaultAccentForScheme(initialScheme); 
    applyAccentColor(savedAccentColor); 

    themeColorPickers.forEach(picker => {
        picker.addEventListener('click', () => applyAccentColor(picker.dataset.color));
    });

    // --- Добавление поля "Системное сообщение" в настройки текста ---
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
        textSettings.insertBefore(systemMessageSetting, insertBeforeEl);
    }

    // --- Расширенные настройки (температура, topP, отключение подсказки Reflex) ---
    const temperatureSlider = document.getElementById('temperature');
    const temperatureValue = document.getElementById('temperatureValue');
    const topPSlider = document.getElementById('topP');
    const topPValue = document.getElementById('topPValue');
    const disableSystemReflexToggle = document.getElementById('disable-system-reflex');
    const btnResetDefaults = document.querySelector('.btn-reset-defaults');

    // Загрузка значений из localStorage
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

    // --- Сбросить по умолчанию (температура, top_p, отключение подсказки Reflex) ---
    if (btnResetDefaults) {
        btnResetDefaults.addEventListener('click', () => {
            // Значения по умолчанию
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

    // Функциональность чата ---
    // Переменная для хранения ссылки на сервер
    let serverUrl = localStorage.getItem('serverUrl') || 'https://excited-lark-witty.ngrok-free.app';
    let abortController = null; // Для отмены запроса

    // Функция для отображения сообщения от ИИ о недоступности сервера (без поля ввода)
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

        chatMessagesContainer.appendChild(messageWrapper);
        if (chatArea) {
            chatArea.scrollTop = chatArea.scrollHeight;
        }
    }

    // Отправка сообщения на сервер LLaMA.cpp через Ngrok с историей
    window.sendToLLaMA = async (userMessage) => {
        const systemMessageInput = document.getElementById('systemMessage');
        // --- используем расширенные настройки ---
        const temperature = parseFloat(document.getElementById('temperature')?.value || 0.7);
        const topP = parseFloat(document.getElementById('topP')?.value || 1);
        const disableSystemReflex = document.getElementById('disable-system-reflex')?.checked;
        let systemMessage = systemMessageInput?.value.trim() ||
            'Вы — Reflex AI, персональный помощник, созданный для помощи на русском языке. Всегда отвечайте дружелюбно и полезно.';

        // Если отключена системная подсказка Reflex — не добавлять systemMessage
        const messages = [];
        if (!disableSystemReflex) {
            messages.push({ role: 'system', content: systemMessage });
        }
        messages.push(...chatHistory, { role: 'user', content: userMessage });

        console.log("Отправка с историей:", messages);
        console.log("Температура:", temperature, "top_p:", topP, "Откл. подсказку Reflex:", disableSystemReflex);

        abortController = new AbortController(); // Для отмены запроса
        try {
            const response = await fetch(`${serverUrl}/v1/chat/completions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: messages,
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
            console.error('Ошибка:', error);
            addMessageToChat('Нет доступа к серверу.', 'system'); // Только системное сообщение
            showUpdateServerUrlMessage(); // Показываем сообщение от ИИ
            return ''; // Возвращаем пустую строку, чтобы не добавлять сообщение от ИИ
        } finally {
            abortController = null; // Сброс контроллера после завершения
        }
    };

    // Остановка генерации на сервере
    async function stopGenerationOnServer() {
        try {
            const response = await fetch(`${serverUrl}/v1/stop`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                console.log('Генерация остановлена на сервере');
            } else {
                console.warn('Сервер не смог обработать запрос на остановку:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при попытке остановить генерацию на сервере:', error);
        }
    }

    // --- Обновляем функцию updateMessageLimitsUI чтобы показывать лимиты и для PRO
    function updateMessageLimitsUI() {
        const limitDisplay = document.querySelector('.message-limits');
        if (!limitDisplay || !messageLimits) return;

        const now = Date.now();
        const timeLeft = Math.max(0, messageLimits.resetTime - now);
        const hours = Math.floor(timeLeft / 3600000);
        const minutes = Math.floor((timeLeft % 3600000) / 60000);
        
        limitDisplay.innerHTML = `${messageLimits.remaining}/${messageLimits.limit} сообщений`;
        if (messageLimits.remaining === 0) {
            limitDisplay.innerHTML += ` (доступно через ${hours}ч ${minutes}м)`;
        }
        limitDisplay.style.display = 'block';
    }

    // --- Модифицируем функцию handleSendMessage для проверки лимитов при любой отправке
    async function handleSendMessage(isEdit = false) {
        // --- БЛОКИРОВКА ПО ТЕМПЕРАТУРЕ ДЛЯ НЕ-PRO ---
        // Получаем температуру из lastMiniMonitorData (или miniTempValue)
        let temp = null;
        if (typeof lastMiniMonitorData.temperature === 'number') {
            temp = lastMiniMonitorData.temperature;
        } else if (miniTempValue && miniTempValue.textContent && miniTempValue.textContent !== '--°C') {
            temp = parseFloat(miniTempValue.textContent.replace('°C', '').replace(',', '.'));
        }
        if (
            temp !== null &&
            temp >= 40 &&
            currentUser &&
            !currentUser.isPro
        ) {
            addMessageToChat(
                `Отправка сообщений временно недоступна: температура сервера превышает безопасный порог (40°C). Пожалуйста, подождите, пока температура снизится.`,
                'system'
            );
            return;
        }

        // Проверка лимитов для всех аккаунтов (включая PRO)
        if (messageLimits && messageLimits.remaining <= 0) {
            const message = currentUser.isPro ? 
                `Достигнут лимит сообщений (${messageLimits.limit}). Пожалуйста, подождите.` :
                `Достигнут лимит сообщений (${messageLimits.limit}). Пожалуйста, подождите или улучшите аккаунт до Pro для увеличения лимита.`;
            addMessageToChat(message, 'system');
            return;
        }

        if (btnSend.classList.contains('stop')) {
            // Пользователь нажал "Стоп"
            if (abortController) {
                abortController.abort(); // Остановить текущий fetch
                await stopGenerationOnServer(); // Остановить генерацию на сервере
            }
            toggleSendButton(false); // Вернуть кнопку в состояние "Отправить"
            hideAiTypingIndicator();
            addMessageToChat('Генерация остановлена', 'system');
            await saveMessageToCurrentChat('Генерация остановлена', 'system');
            return;
        }

        const messageText = messageInput.value;
        if (!messageText.trim()) return;

        // --- Проверка: если это команда из списка, отвечаем локально ---
        const cmd = COMMANDS.find(c => c.match(messageText));
        if (cmd) {
            addMessageToChat(messageText, 'user');
            await saveMessageToCurrentChat(messageText, 'user');
            messageInput.value = '';
            messageInput.style.height = 'auto';
            messageInput.focus();
            // Ответ от ИИ
            addMessageToChat(cmd.handler(), 'ai');
            await saveMessageToCurrentChat(cmd.handler(), 'ai');
            hideCommandMenu();
            return;
        }

        // Если у текущего чата нет сообщений — это первое сообщение, делаем его названием
        let chat = null;
        if (tempNewChat && tempNewChat.id === currentChatId) {
            chat = tempNewChat;
        } else {
            chat = await getChat(currentChatId);
        }
        if (chat && (!chat.messages || chat.messages.length === 0)) {
            chat.title = messageText.trim();
            // Если это tempNewChat — сохраняем на сервере и сбрасываем tempNewChat
            if (chat === tempNewChat) {
                chat.messages = [{ text: messageText, sender: 'user' }];
                await saveChat(chat);
                // После сохранения tempNewChat сброшен, currentChatId обновлён
                chat = await getChat(currentChatId);
            } else {
                await saveChat(chat);
            }
            await renderChatsList(currentChatId);
        }

        addMessageToChat(messageText, 'user');
        await saveMessageToCurrentChat(messageText, 'user');
        messageInput.value = '';
        messageInput.style.height = 'auto';
        messageInput.focus();

        toggleSendButton(true); // Перевести кнопку в состояние "Стоп"
        showAiTypingIndicator();
        const aiReply = await sendToLLaMA(messageText);
        hideAiTypingIndicator();
        toggleSendButton(false); // Вернуть кнопку в состояние "Отправить"

        addMessageToChat(aiReply, 'ai');
        await saveMessageToCurrentChat(aiReply, 'ai');

        // После успешной отправки сообщения
        await fetchMessageLimits();
    }

    // --- Смена состояния кнопки отправки ---
    function toggleSendButton(isGenerating) {
        if (isGenerating) {
            btnSend.classList.add('stop');
            btnSend.querySelector('i').classList.remove('fa-arrow-up', 'fa-paper-plane');
            btnSend.querySelector('i').classList.add('fa-square'); // Меняем на квадрат
            btnSend.setAttribute('aria-label', 'Остановить');
        } else {
            btnSend.classList.remove('stop');
            btnSend.querySelector('i').classList.remove('fa-square'); // Убираем квадрат
            btnSend.querySelector('i').classList.add('fa-arrow-up');
            btnSend.setAttribute('aria-label', 'Отправить');
        }
    }

    // --- Добавление сообщения в DOM чата и обновление истории ---
    function getMsgLikeKey(chatId, idx) { return `msg_like_${chatId}_${idx}`; }
    function getMsgDislikeKey(chatId, idx) { return `msg_dislike_${chatId}_${idx}`; }

    function addMessageToChat(text, sender, opts = {}) {
        if (!text.trim() || !chatMessagesContainer) return;

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
                ? 'https://placehold.co/30x30/555555/FFFFFF?text=S'
                : reflexSvgUrl;

        const messageContentDiv = document.createElement('div');
        messageContentDiv.classList.add('message-content');

        if (sender === 'user') {
            // --- Редактирование пользовательского сообщения ---
            const paragraph = document.createElement('p');
            paragraph.textContent = text;
            messageContentDiv.appendChild(paragraph);
            messageDiv.appendChild(messageContentDiv);
            messageDiv.appendChild(avatarImg);

            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('message-actions');
            actionsDiv.innerHTML = `
                <button class="action-icon btn-copy" aria-label="Копировать"><i class="fas fa-copy"></i></button>
                <button class="action-icon btn-edit" aria-label="Редактировать"><i class="fas fa-pencil-alt"></i></button>
            `;
            actionsDiv.querySelector('.btn-copy').onclick = function() {
                navigator.clipboard.writeText(text).then(() => {
                    // Сохраняем оригинальное содержимое кнопки
                    const originalContent = this.innerHTML;
                    // Меняем на галочку и добавляем класс для анимации
                    this.innerHTML = '<i class="fas fa-check" style="color: var(--accent-color);"></i>';
                    this.classList.add('copied');
                    // Возвращаем оригинальное состояние через 1.5 секунды
                    setTimeout(() => {
                        this.innerHTML = originalContent;
                        this.classList.remove('copied');
                    }, 1500);
                }).catch(err => {
                    console.error('Ошибка копирования:', err);
                });
            };
            actionsDiv.querySelector('.btn-edit').onclick = () => {
                // Показать textarea для редактирования
                if (messageContentDiv.querySelector('.edit-message-input')) return;
                const oldText = paragraph.textContent;
                paragraph.style.display = 'none';
                const textarea = document.createElement('textarea');
                textarea.className = 'edit-message-input';
                textarea.value = oldText;
                textarea.setAttribute('rows', '1');
                textarea.style.resize = 'none';
                textarea.style.overflowY = 'auto';
                textarea.style.height = '38px';
                messageContentDiv.appendChild(textarea);

                // Кнопки "Отмена" и "Отправить"
                const editActions = document.createElement('div');
                editActions.className = 'message-actions editing-active';
                editActions.innerHTML = `
                    <button class="action-icon btn-cancel-edit" title="Отмена"><i class="fas fa-times"></i></button>
                    <button class="action-icon btn-save-edit" title="Отправить"><i class="fas fa-arrow-up"></i></button>
                `;
                messageWrapper.appendChild(editActions);

                textarea.focus();
                textarea.select();

                // Отмена
                editActions.querySelector('.btn-cancel-edit').onclick = () => {
                    textarea.remove();
                    editActions.remove();
                    paragraph.style.display = '';
                };
                // Сохранить и отправить заново
                editActions.querySelector('.btn-save-edit').onclick = async () => {
                    const newText = textarea.value.trim();
                    if (!newText) return;

                    // Проверяем лимиты перед отправкой отредактированного сообщения
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
                    
                    const msgIdx = Array.from(chatMessagesContainer.children).indexOf(messageWrapper);
                    if (msgIdx >= 0 && chatHistory[msgIdx] && chatHistory[msgIdx].role === 'user') {
                        chatHistory[msgIdx].content = newText;
                        let chat = allChats.find(c => String(c.id) === String(currentChatId));
                        if (chat && chat.messages && chat.messages[msgIdx]) {
                            chat.messages[msgIdx].text = newText;
                            await saveChat(chat);
                        }
                        
                        // Повторно отправить в ИИ с учетом лимитов
                        toggleSendButton(true);
                        showAiTypingIndicator();
                        const aiReply = await sendToLLaMA(newText);
                        hideAiTypingIndicator();
                        toggleSendButton(false);
                        
                        if (aiReply) {
                            addMessageToChat(aiReply, 'ai');
                            await saveMessageToCurrentChat(aiReply, 'ai');
                            // Уменьшаем лимит на сервере
                            await decrementMessageLimit();
                        }
                    }
                };
                // Enter = отправить, Esc = отмена
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
            messageDiv.appendChild(messageContentDiv);
            messageWrapper.appendChild(messageDiv);
        } else {
            // --- AI-сообщение: если есть <pre><code> — используем стиль с code-block-container ---
            let html = window.marked ? marked.parse(text) : text;
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const codeBlocks = tempDiv.querySelectorAll('pre > code');
            if (codeBlocks.length > 0) {
                codeBlocks.forEach(codeEl => {
                    const preEl = codeEl.parentElement;
                    let lang = 'text';
                    codeEl.classList.forEach(cls => {
                        if (cls.startsWith('language-')) {
                            lang = cls.replace('language-', '');
                        }
                    });
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
                    codeContainer.appendChild(preEl.cloneNode(true));
                    preEl.replaceWith(codeContainer);
                });

                Array.from(tempDiv.childNodes).forEach(node => {
                    messageContentDiv.appendChild(node);
                });

                const aiMessageHeaderDiv = document.createElement('div');
                aiMessageHeaderDiv.classList.add('ai-message-header');
                const aiNameSpan = document.createElement('span');
                aiNameSpan.classList.add('ai-name');
                aiNameSpan.textContent = getAppName();
                aiMessageHeaderDiv.appendChild(aiNameSpan);
                messageContentDiv.insertBefore(aiMessageHeaderDiv, messageContentDiv.firstChild);

                messageDiv.appendChild(avatarImg);
                messageDiv.appendChild(messageContentDiv);
                messageWrapper.appendChild(messageDiv);

                // --- ДОБАВЛЕНО: actionsDiv для AI-сообщений с кодом ---
                const actionsDiv = document.createElement('div');
                actionsDiv.classList.add('message-actions');
                const msgIdx = chatMessagesContainer.childElementCount;
                const likeKey = getMsgLikeKey(currentChatId, msgIdx);
                const dislikeKey = getMsgDislikeKey(currentChatId, msgIdx);
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
                actionsDiv.querySelector('.btn-like').onclick = function () {
                    const isLiked = this.classList.toggle('liked');
                    localStorage.setItem(likeKey, isLiked ? '1' : '0');
                    if (isLiked) {
                        actionsDiv.querySelector('.btn-dislike').classList.remove('disliked');
                        localStorage.setItem(dislikeKey, '0');
                    }
                };
                actionsDiv.querySelector('.btn-dislike').onclick = function () {
                    const isDisliked = this.classList.toggle('disliked');
                    localStorage.setItem(dislikeKey, isDisliked ? '1' : '0');
                    if (isDisliked) {
                        actionsDiv.querySelector('.btn-like').classList.remove('liked');
                        localStorage.setItem(likeKey, '0');
                    }
                };
                actionsDiv.querySelector('.btn-tts').onclick = () => {
                    if ('speechSynthesis' in window) {
                        // Для tts читаем только текст без кода
                        let plainText = tempDiv.textContent || text;
                        const utter = new SpeechSynthesisUtterance(plainText);
                        utter.lang = 'ru-RU';
                        window.speechSynthesis.speak(utter);
                    }
                };
                actionsDiv.querySelector('.btn-more').onclick = () => {
                    alert('Дополнительные функции появятся позже!');
                };
                actionsDiv.querySelector('.btn-regen').onclick = async function () {
                    // Найти предыдущее пользовательское сообщение
                    let prev = messageWrapper.previousElementSibling;
                    let userMsgText = null;
                    let userMsgIndex = -1;
                    const wrappers = Array.from(chatMessagesContainer.querySelectorAll('.message-wrapper'));
                    const currentIndex = wrappers.indexOf(messageWrapper);

                    for (let i = currentIndex - 1; i >= 0; i--) {
                        const wrapper = wrappers[i];
                        const userMsg = wrapper.querySelector('.user-message .message-content p');
                        if (userMsg) {
                            userMsgText = userMsg.textContent;
                            userMsgIndex = i;
                            break;
                        }
                    }

                    if (userMsgText && userMsgIndex >= 0) {
                        if (messageLimits && messageLimits.remaining <= 0) {
                            const message = currentUser.isPro ? 
                                `Достигнут лимит сообщений (${messageLimits.limit}). Пожалуйста, подождите.` :
                                `Достигнут лимит сообщений (${messageLimits.limit}). Пожалуйста, подождите или улучшите аккаунт до Pro для увеличения лимита.`;
                            addMessageToChat(message, 'system');
                            return;
                        }
                        chatHistory.splice(userMsgIndex + 1, 1);
                        messageWrapper.remove();

                        showAiTypingIndicator();
                        const aiReply = await sendToLLaMA(userMsgText);
                        hideAiTypingIndicator();
                        addMessageToChat(aiReply, 'ai');
                        await saveMessageToCurrentChat(aiReply, 'ai');
                        await decrementMessageLimit();
                    }
                };
                messageWrapper.appendChild(actionsDiv);

                setTimeout(() => {
                    messageContentDiv.querySelectorAll('pre code').forEach(block => {
                        if (window.hljs) window.hljs.highlightElement(block);
                    });
                }, 0);
            } else {
                // --- Новый блок: AI-сообщение без кода, с кнопками под сообщением ---
                const paragraph = document.createElement('p');
                if (window.marked) {
                    paragraph.innerHTML = marked.parse(text);
                } else {
                    paragraph.textContent = text;
                }
                const aiMessageHeaderDiv = document.createElement('div');
                aiMessageHeaderDiv.classList.add('ai-message-header');
                const aiNameSpan = document.createElement('span');
                aiNameSpan.classList.add('ai-name');
                aiNameSpan.textContent = getAppName();
                aiMessageHeaderDiv.appendChild(aiNameSpan);

                messageContentDiv.appendChild(aiMessageHeaderDiv);
                messageContentDiv.appendChild(paragraph);

                messageDiv.appendChild(avatarImg);
                messageDiv.appendChild(messageContentDiv);
                messageWrapper.appendChild(messageDiv);

                const actionsDiv = document.createElement('div');
                actionsDiv.classList.add('message-actions');
                const msgIdx = chatMessagesContainer.childElementCount;
                const likeKey = getMsgLikeKey(currentChatId, msgIdx);
                const dislikeKey = getMsgDislikeKey(currentChatId, msgIdx);
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
                actionsDiv.querySelector('.btn-like').onclick = function () {
                    const isLiked = this.classList.toggle('liked');
                    localStorage.setItem(likeKey, isLiked ? '1' : '0');
                    if (isLiked) {
                        actionsDiv.querySelector('.btn-dislike').classList.remove('disliked');
                        localStorage.setItem(dislikeKey, '0');
                    }
                };
                actionsDiv.querySelector('.btn-dislike').onclick = function () {
                    const isDisliked = this.classList.toggle('disliked');
                    localStorage.setItem(dislikeKey, isDisliked ? '1' : '0');
                    if (isDisliked) {
                        actionsDiv.querySelector('.btn-like').classList.remove('liked');
                        localStorage.setItem(likeKey, '0');
                    }
                };
                actionsDiv.querySelector('.btn-tts').onclick = () => {
                    if ('speechSynthesis' in window) {
                        const utter = new SpeechSynthesisUtterance(paragraph.textContent || text);
                        utter.lang = 'ru-RU';
                        window.speechSynthesis.speak(utter);
                    }
                };
                actionsDiv.querySelector('.btn-more').onclick = () => {
                    alert('Дополнительные функции появятся позже!');
                };
                actionsDiv.querySelector('.btn-regen').onclick = async function () {
                    // Найти предыдущее пользовательское сообщение
                    let prev = messageWrapper.previousElementSibling;
                    let userMsgText = null;
                    let userMsgIndex = -1;
                    const wrappers = Array.from(chatMessagesContainer.querySelectorAll('.message-wrapper'));
                    const currentIndex = wrappers.indexOf(messageWrapper);

                    for (let i = currentIndex - 1; i >= 0; i--) {
                        const wrapper = wrappers[i];
                        const userMsg = wrapper.querySelector('.user-message .message-content p');
                        if (userMsg) {
                            userMsgText = userMsg.textContent;
                            userMsgIndex = i;
                            break;
                        }
                    }

                    if (userMsgText && userMsgIndex >= 0) {
                        if (messageLimits && messageLimits.remaining <= 0) {
                            const message = currentUser.isPro ? 
                                `Достигнут лимит сообщений (${messageLimits.limit}). Пожалуйста, подождите.` :
                                `Достигнут лимит сообщений (${messageLimits.limit}). Пожалуйста, подождите или улучшите аккаунт до Pro для увеличения лимита.`;
                            addMessageToChat(message, 'system');
                            return;
                        }
                        chatHistory.splice(userMsgIndex + 1, 1);
                        messageWrapper.remove();

                        showAiTypingIndicator();
                        const aiReply = await sendToLLaMA(userMsgText);
                        hideAiTypingIndicator();
                        addMessageToChat(aiReply, 'ai');
                        await saveMessageToCurrentChat(aiReply, 'ai');
                        await decrementMessageLimit();
                    }
                };
                messageWrapper.appendChild(actionsDiv);
            }
        }

        chatMessagesContainer.appendChild(messageWrapper);
        if (chatArea) {
            chatArea.scrollTop = chatArea.scrollHeight;
        }

        if (sender !== 'system' && !opts.noHistory) {
            chatHistory.push({ role: sender, content: text });
        }
    }

    // --- Уменьшение лимита сообщений на сервере ---
    async function decrementMessageLimit() {
        try {
            const response = await fetch('/api/message-limits/decrement', {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + authToken }
            });
            if (!response.ok) throw new Error('Ошибка уменьшения лимита');
            const data = await response.json();
            messageLimits.remaining = data.remaining; // Обновляем локальный лимит
            updateMessageLimitsUI();
        } catch (error) {
            console.error('Ошибка уменьшения лимита сообщений:', error);
        }
    }

    // --- Показать/скрыть анимацию "ИИ печатает..." ---
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
                aiTypingIndicator.style.display = 'none';
            }, 200);
        }
    }

    // --- Обработка отправки сообщений (Enter и кнопка) ---
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
        updateWebSearchButtonVisualState();
        webSearchBtn.addEventListener('click', () => {
            webEnabledCheckbox.checked = !webEnabledCheckbox.checked; 
            const changeEvent = new Event('change', { bubbles: true });
            webEnabledCheckbox.dispatchEvent(changeEvent);
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
                updateWebSearchButtonVisualState(); 
            }
            toggleElement.addEventListener('change', (event) => {
                localStorage.setItem(item.storageKey, event.target.checked);
                if (item.id === 'web-enabled') {
                    updateWebSearchButtonVisualState();
                }
            });
        }
    });

    if (voiceInputBtn) {
        voiceInputBtn.addEventListener('click', () => {
            console.log("Кнопка голосового ввода нажата. Функционал пока не реализован.");
            // Теперь иконка SVG, можно добавить анимацию или смену цвета, если нужно
            // Например, добавить/убрать класс активности:
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
                    subscriptionPriceEl.textContent = `$${(yearlyPrice / 12).toFixed(0)}`;
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

    // --- При уходе со страницы: если tempNewChat пустой — не сохраняем его ---
    window.addEventListener('beforeunload', () => {
        if (tempNewChat && (!tempNewChat.messages || tempNewChat.messages.length === 0)) {
            tempNewChat = null;
        }
    });

    // --- Управление папками и поиском ---
    let userFolders = [];
    const searchInput = document.querySelector('.search-bar input');
    const btnAddFolder = document.querySelector('.folders-section .section-header .btn-icon');
    const foldersList = document.querySelector('.folders-list');

    // --- Состояние открытых папок ---
    let openFolders = {}; // {folderId: true/false}
    let activeFolderId = null; // id выбранной папки, null = все чаты

    // Загрузка папок
    async function loadFolders() {
        try {
            const response = await fetch('/api/folders', {
                headers: { Authorization: 'Bearer ' + authToken }
            });
            if (!response.ok) throw new Error('Ошибка загрузки папок');
            userFolders = await response.json();
            renderFolders();
            renderChatsList(currentChatId);
        } catch (error) {
            console.error('Ошибка загрузки папок:', error);
        }
    }

    // --- Получить чаты вне папок ---
    function getChatsWithoutFolder() {
        const allChatIdsInFolders = userFolders.flatMap(f => f.chatIds || []);
        return allChats.filter(chat => !allChatIdsInFolders.includes(chat.id));
    }

    // --- Рендер папок и вложенных чатов ---
    function renderFolders() {
        if (!foldersList) return;
        let html = '';

        // Только папки (без "Без папки")
        for (const folder of userFolders) {
            const chatCount = folder.chatIds ? folder.chatIds.length : 0;
            const isOpen = openFolders[folder.id] !== false; // по умолчанию открыта
            html += `
                <li data-folder-id="${folder.id}" class="folder-item">
                    <span class="folder-toggle-arrow">
                        <i class="fas fa-chevron-${isOpen ? 'down' : 'right'}"></i>
                    </span>
                    <i class="fas fa-folder${isOpen ? '-open' : ''}"></i>
                    <span class="folder-name">${folder.name}</span>
                    <span class="folder-chat-count">${chatCount}</span>
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
                    ${folder.chatIds.map(chatId => {
                        const chat = allChats.find(c => c.id === chatId);
                        if (!chat) return '';
                        return `
                            <li data-chat-id="${chat.id}" class="${chat.id === currentChatId ? 'active-chat-item' : ''}">
                                <span class="chat-title">${chat.title || 'Без названия'}</span>
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
        setupFolderDragAndDrop();
    }

    // --- Делегирование событий для папок и вложенных чатов ---
    if (foldersList) {
        foldersList.addEventListener('click', async (e) => {
            const folderItem = e.target.closest('.folder-item');
            const folderId = folderItem ? folderItem.dataset.folderId : null;

            // Открыть/закрыть папку по стрелке или по клику на папку (кроме кнопок)
            if (folderItem && (e.target.closest('.folder-toggle-arrow') || (!e.target.closest('.folder-actions') && !e.target.closest('.btn-icon')))) {
                openFolders[folderId] = !(openFolders[folderId] !== false); // toggle open/close
                renderFolders();
                return;
            }

            // Кнопка "Удалить папку"
            if (e.target.closest('.btn-delete-folder')) {
                if (folderId) {
                    if (confirm('Удалить эту папку?')) {
                        await fetch(`/api/folders/${folderId}`, {
                            method: 'DELETE',
                            headers: { Authorization: 'Bearer ' + authToken }
                        });
                        await loadFolders();
                    }
                }
                return;
            }

            // Кнопка "Редактировать папку"
            if (e.target.closest('.btn-rename-folder')) {
                if (folderId) {
                    const folder = userFolders.find(f => String(f.id) === String(folderId));
                    if (!folder) return;
                    const newName = prompt('Новое название папки:', folder.name);
                    if (newName && newName.trim()) {
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

            // Клик по чату внутри папки
            const chatLi = e.target.closest('ul.folder-chats-list li');
            if (chatLi) {
                const chatId = chatLi.dataset.chatId;
                if (e.target.closest('.btn-rename-chat')) {
                    // Переименование чата
                    const chat = await getChat(chatId);
                    if (!chat) return;
                    const titleSpan = chatLi.querySelector('.chat-title');
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = chat.title || '';
                    input.className = 'chat-title-input';
                    input.style.width = '90%';
                    titleSpan.replaceWith(input);
                    input.focus();
                    input.select();
                    async function saveTitle() {
                        const newTitle = input.value.trim() || 'Без названия';
                        chat.title = newTitle;
                        await saveChat(chat);
                        await renderFolders();
                        await renderChatsList(currentChatId);
                    }
                    input.addEventListener('blur', saveTitle);
                    input.addEventListener('keydown', async (ev) => {
                        if (ev.key === 'Enter') input.blur();
                        if (ev.key === 'Escape') await renderFolders();
                    });
                    return;
                }
                if (e.target.closest('.btn-delete-chat')) {
                    if (confirm('Удалить этот чат?')) {
                        await deleteChat(chatLi.dataset.chatId);
                        await loadFolders();
                    }
                    return;
                }
                if (e.target.closest('.btn-move-chat-out')) {
                    // Удалить чат из папки (переместить в "Без папки")
                    await fetch(`/api/chats/${chatLi.dataset.chatId}/move`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + authToken
                        },
                        body: JSON.stringify({ folderId: null })
                    });
                    await loadFolders();
                    await syncChatsFromServer();
                    renderChatsList(currentChatId);
                    return;
                }
                // Переключение чата
                if (!e.target.closest('.btn-icon')) {
                    await switchChat(chatLi.dataset.chatId);
                }
                return;
            }
        });
    }

    // --- Исправлено создание новой папки ---
    async function createFolder(name) {
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
            const folder = await response.json();
            userFolders.push(folder);
            renderFolders();
        } catch (error) {
            console.error('Ошибка создания папки:', error);
        }
    }

    // --- Кнопка создания папки ---
    if (btnAddFolder) {
        btnAddFolder.addEventListener('click', () => {
            const name = prompt('Введите название папки:');
            if (name) createFolder(name);
        });
    }

    // Обновляем настройку drag & drop
    function setupFolderDragAndDrop() {
        const chatItems = document.querySelectorAll('.chats-list li');
        const folderItems = document.querySelectorAll('.folder-item');
        
        chatItems.forEach(chat => {
            chat.setAttribute('draggable', 'true');
            chat.addEventListener('dragstart', handleDragStart);
            chat.addEventListener('dragend', handleDragEnd);
            chat.addEventListener('drag', handleDrag);
        });
        
        folderItems.forEach(folder => {
            folder.addEventListener('dragenter', handleDragEnter);
            folder.addEventListener('dragleave', handleDragLeave);
            folder.addEventListener('dragover', handleDragOver);
            folder.addEventListener('drop', handleDrop);
        });
    }

    function handleDragStart(e) {
        e.target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', e.target.dataset.chatId);
        // Добавляем эффект копирования
        e.dataTransfer.effectAllowed = 'move';
    }

    function handleDrag(e) {
        e.preventDefault();
    }

    function handleDragEnter(e) {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    }

    function handleDragLeave(e) {
        e.preventDefault();
        if (e.currentTarget.contains(e.relatedTarget)) return;
        e.currentTarget.classList.remove('drag-over');
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function handleDragEnd(e) {
        e.target.classList.remove('dragging');
        document.querySelectorAll('.folder-item').forEach(folder => {
            folder.classList.remove('drag-over');
        });
    }

    async function handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        
        const chatId = e.dataTransfer.getData('text/plain');
        const folderId = e.currentTarget.dataset.folderId;
        
        try {
            const response = await fetch(`/api/chats/${chatId}/move`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + authToken
                },
                body: JSON.stringify({ folderId })
            });
            
            if (!response.ok) throw new Error('Ошибка перемещения чата');
            
            // Обновляем UI
            const chatElement = document.querySelector(`.chats-list li[data-chat-id="${chatId}"]`);
            if (chatElement) {
                // Анимируем перемещение
                chatElement.style.transition = 'opacity 0.2s ease';
                chatElement.style.opacity = '0';
                setTimeout(() => {
                    // Обновляем данные
                    syncChatsFromServer().then(() => {
                        loadFolders(); // Обновляем папки для обновления счетчиков
                    });
                }, 200);
            }
        } catch (error) {
            console.error('Ошибка перемещения чата:', error);
        }
    }

    // Поиск по чатам
    let searchTimeout = null;
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            if (searchTimeout) clearTimeout(searchTimeout);
            searchTimeout = setTimeout(async () => {
                const query = e.target.value.trim();
                const response = await fetch(`/api/chats?query=${encodeURIComponent(query)}`, {
                    headers: { Authorization: 'Bearer ' + authToken }
                });
                if (response.ok) {
                    allChats = await response.json();
                    await renderChatsList(currentChatId);
                }
            }, 300);
        });
    }

    // --- Лимиты сообщений ---
    let messageLimits = null;

    // Функция получения лимитов с сервера
    async function fetchMessageLimits() {
        try {
            const response = await fetch('/api/message-limits', {
                headers: { Authorization: 'Bearer ' + authToken }
            });
            if (response.ok) {
                messageLimits = await response.json();
                updateMessageLimitsUI();
            }
        } catch (error) {
            console.error('Ошибка получения лимитов:', error);
        }
    }

    // Запускаем обновление UI лимитов каждую минуту
    setInterval(updateMessageLimitsUI, 60000);

    // --- Командное меню (@) ---
    const commandSuggestions = document.getElementById('commandSuggestions');
    const commandItems = commandSuggestions ? commandSuggestions.querySelectorAll('.command-item') : [];
    let commandMenuActive = false;

    // Список команд и обработка
    const COMMANDS = [
        {
            key: 'заряд батареи',
            match: (txt) => txt.trim().toLowerCase() === 'заряд батареи',
            handler: () => {
                return `Текущий заряд батареи: <b>${getCurrentBattery()}</b>`;
            }
        },
        {
            key: 'температура',
            match: (txt) => txt.trim().toLowerCase() === 'температура',
            handler: () => {
                return `Текущая температура сервера: <b>${getCurrentTemperature()}</b>`;
            }
        },
        {
            key: 'время работы',
            match: (txt) => txt.trim().toLowerCase() === 'время работы',
            handler: () => {
                return `Время работы сервера: <b>${getCurrentUptime()}</b>`;
            }
        },
        {
            key: 'помощь',
            match: (txt) => txt.trim().toLowerCase() === 'помощь',
            handler: () => {
                return `Доступные команды:<br>
- <b>заряд батареи</b> — показать уровень заряда устройства<br>
- <b>температура</b> — температура CPU устройства<br>
- <b>время работы</b> — аптайм сервера<br>
- <b>помощь</b> — список команд`;
            }
        }
    ];

    // Показ/скрытие меню команд
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

    // Ввод в поле: показать меню при @ в начале или после пробела
    if (messageInput) {
        messageInput.addEventListener('input', (e) => {
            const val = messageInput.value;
            // Показываем меню, если строка начинается с @ или содержит "@<буквы>"
            if (/^@[\wа-яё]*$/i.test(val.trim())) {
                showCommandMenu();
            } else {
                hideCommandMenu();
            }
        });
        // Скрываем меню при потере фокуса
        messageInput.addEventListener('blur', () => {
            setTimeout(hideCommandMenu, 150); // задержка чтобы успел сработать клик по меню
        });
    }

    // Клик по пункту меню — сразу отправить команду как сообщение пользователя
    if (commandSuggestions) {
        commandSuggestions.addEventListener('mousedown', async (e) => {
            const item = e.target.closest('.command-item');
            if (!item) return;
            const cmd = item.dataset.cmd;
            hideCommandMenu();
            if (messageInput) {
                messageInput.value = ''; // очищаем поле
            }
            // Имитация отправки команды как сообщения пользователя
            // Найти команду
            const commandObj = COMMANDS.find(c => c.key === cmd);
            if (commandObj) {
                addMessageToChat(cmd, 'user');
                await saveMessageToCurrentChat(cmd, 'user');
                // Ответ от ИИ
                addMessageToChat(commandObj.handler(), 'ai');
                await saveMessageToCurrentChat(commandObj.handler(), 'ai');
            }
            if (messageInput) {
                messageInput.focus();
            }
        });
    }
});
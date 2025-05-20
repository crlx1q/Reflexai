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

    // --- ВОССТАНОВЛЕННЫЙ КОНФИГ ---
    const MINI_MONITOR_CONFIG = {
        minTemperature: 25,
        maxTemperature: 45,
        dataUrl: 'https://apglhi-ip-95-56-104-203.tunnelmole.net/data',
        refreshInterval: 5000
    };

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

    setInterval(fetchMiniMonitorData, MINI_MONITOR_CONFIG.refreshInterval);
    fetchMiniMonitorData();

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

    async function syncChatsFromServer() {
        if (!authToken) return;
        let resp = await fetch('/api/chats', { headers: { Authorization: 'Bearer ' + authToken } });
        if (!resp.ok) { allChats = []; return; }
        allChats = await resp.json();
        await renderChatsList(currentChatId);
    }

    async function renderChatsList(selectedId) {
        chatsListUl.innerHTML = '';
        for (const chat of allChats) {
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
    }

    // --- CRUD чатов через API ---
    async function getChat(id) {
        return allChats.find(c => String(c.id) === String(id));
    }

    async function saveChat(chat) {
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
        let resp = await fetch('/api/chats', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + authToken },
            body: JSON.stringify({ title: '', messages: [] })
        });
        if (resp.ok) {
            await syncChatsFromServer();
            let newChat = allChats[0];
            await switchChat(newChat.id);
        }
    }

    async function switchChat(id) {
        currentChatId = id;
        await renderChatsList(currentChatId);
        chatMessagesContainer.innerHTML = '';
        chatHistory = [];
        let chat = allChats.find(c => String(c.id) === String(id));
        if (chat && Array.isArray(chat.messages)) {
            for (const msg of chat.messages) {
                chatHistory.push({ role: msg.sender, content: msg.text });
                addMessageToChat(msg.text, msg.sender);
            }
        }
    }

    async function saveMessageToCurrentChat(text, sender) {
        if (!currentChatId) return;
        let chat = allChats.find(c => String(c.id) === String(currentChatId));
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
    }

    // --- Кнопки "Новый чат" (сайдбар и хедер) ---
    const btnNewChatSidebar = document.querySelector('.btn-new-chat');
    const btnNewChatHeader = document.querySelector('.btn-new-chat-header');
    if (btnNewChatSidebar) btnNewChatSidebar.onclick = async () => { await createNewChat(); };
    if (btnNewChatHeader) btnNewChatHeader.onclick = async () => { await createNewChat(); };

    // --- При загрузке приложения ---
    (async function mainAuthInit() {
        await fetchCurrentUser();
        if (!currentUser) return;
        await syncChatsFromServer();
        renderUserProfile();
        if (allChats.length === 0) await createNewChat();
        else await switchChat(allChats[0].id);
    })();

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

    // --- Функциональность чата ---
    let serverUrl = localStorage.getItem('serverUrl') || 'https://excited-lark-witty.ngrok-free.app';

    sendToLLaMA = async (userMessage) => {
        const systemMessageInput = document.getElementById('systemMessage');
        const temperature = parseFloat(document.getElementById('temperature')?.value || 0.7);
        const systemMessage = systemMessageInput?.value.trim() ||
            'Вы — Reflex AI, персональный помощник, созданный для помощи на русском языке. Всегда отвечайте дружелюбно и полезно.';

        const messages = [
            { role: 'system', content: systemMessage },
            ...chatHistory,
            { role: 'user', content: userMessage }
        ];

        console.log("Отправка с историей:", messages);
        console.log("Температура:", temperature);

        abortController = new AbortController(); // Для отмены запроса
        try {
            const response = await fetch(`${serverUrl}/v1/chat/completions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: messages,
                    temperature: temperature
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

    async function handleSendMessage() {
        if (btnSend.classList.contains('stop')) {
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

        const chat = await getChat(currentChatId);
        if (chat && (!chat.messages || chat.messages.length === 0)) {
            chat.title = messageText.trim();
            await saveChat(chat);
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
    }

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

    function addMessageToChat(text, sender) {
        if (!text.trim() || !chatMessagesContainer) return;

        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('message-wrapper');

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);

        const avatarImg = document.createElement('img');
        avatarImg.classList.add('avatar');
        avatarImg.alt = sender === 'user' ? 'Пользователь' : sender === 'system' ? 'Система' : 'Reflex ИИ';
        avatarImg.src = sender === 'user'
            ? 'https://placehold.co/30x30/7B447C/FFFFFF?text=U'
            : sender === 'system'
                ? 'https://placehold.co/30x30/555555/FFFFFF?text=S'
                : reflexSvgUrl;

        const messageContentDiv = document.createElement('div');
        messageContentDiv.classList.add('message-content');

        if (sender === 'user') {
            const paragraph = document.createElement('p');
            paragraph.textContent = text;
            messageContentDiv.appendChild(paragraph);
            messageDiv.appendChild(messageContentDiv);
            messageDiv.appendChild(avatarImg);

            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('message-actions');
            actionsDiv.innerHTML = `
                <button class="action-icon" aria-label="Копировать"><i class="fas fa-copy"></i></button>
                <button class="action-icon" aria-label="Редактировать"><i class="fas fa-pencil-alt"></i></button>
            `;
            messageWrapper.appendChild(messageDiv);
            messageWrapper.appendChild(actionsDiv);
        } else if (sender === 'system') {
            const paragraph = document.createElement('p');
            paragraph.textContent = text;
            messageContentDiv.appendChild(paragraph);
            messageDiv.appendChild(messageContentDiv);
            messageWrapper.appendChild(messageDiv);
        } else {
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
            aiNameSpan.textContent = 'Reflex AI';
            aiMessageHeaderDiv.appendChild(aiNameSpan);

            messageContentDiv.appendChild(aiMessageHeaderDiv);
            messageContentDiv.appendChild(paragraph);

            messageDiv.appendChild(avatarImg);
            messageDiv.appendChild(messageContentDiv);
            messageWrapper.appendChild(messageDiv);

            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('message-actions');
            actionsDiv.innerHTML = `
                <button class="action-icon" aria-label="Обновить"><i class="fas fa-redo"></i></button>
                <button class="action-icon" aria-label="Копировать"><i class="fas fa-copy"></i></button>
                <button class="action-icon" aria-label="Новая функция"><i class="fas fa-magic"></i></button>
                <button class="action-icon" aria-label="Нравится"><i class="fas fa-thumbs-up"></i></button>
                <button class="action-icon" aria-label="Не нравится"><i class="fas fa-thumbs-down"></i></button>
                <button class="action-icon" aria-label="Озвучить"><i class="fas fa-volume-up"></i></button>
                <button class="action-icon" aria-label="Еще"><i class="fas fa-ellipsis-h"></i></button>
            `;
            messageWrapper.appendChild(actionsDiv);
        }

        chatMessagesContainer.appendChild(messageWrapper);
        if (chatArea) {
            chatArea.scrollTop = chatArea.scrollHeight;
        }

        if (sender !== 'system') {
            chatHistory.push({ role: sender, content: text });
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
            const icon = voiceInputBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-microphone-lines');
                icon.classList.toggle('fa-microphone-lines-slash');
            }
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
});
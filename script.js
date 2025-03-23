document.addEventListener('DOMContentLoaded', function() {
    // 初始化变量
    const aiCheckboxes = document.querySelectorAll('.ai-checkbox');
    const selectAllBtn = document.getElementById('select-all');
    const deselectAllBtn = document.getElementById('deselect-all');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');
    const myAgentsLink = document.getElementById('my-agents-link');
    const settingsLink = document.getElementById('settings-link');
    const agentModal = document.getElementById('agent-modal');
    const settingsModal = document.getElementById('settings-modal');
    const myAgentsModal = document.getElementById('my-agents-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const createAgentButton = document.getElementById('create-agent-button');
    const agentForm = document.getElementById('agent-form');
    const settingsForm = document.getElementById('settings-form');
    const themeSelector = document.getElementById('theme-selector');
    const newTabChat = document.getElementById('new-tab-chat');
    const agentsList = document.getElementById('agents-list');

    // 模拟AI数据
    const aiData = {
        claude: { name: 'Claude', color: '#6e8efb', url: 'https://claude.ai' },
        grok: { name: 'Grok', color: '#ff6b6b', url: 'https://grok.x.ai' },
        gemini: { name: 'Gemini', color: '#4285f4', url: 'https://gemini.google.com' },
        perplexity: { name: 'Perplexity', color: '#00a67e', url: 'https://perplexity.ai' },
        poe: { name: 'Poe', color: '#8c52ff', url: 'https://poe.com' },
        chatgpt: { name: 'ChatGPT', color: '#19c37d', url: 'https://chat.openai.com' },
        genspark: { name: 'GenSpark', color: '#ff9500', url: 'https://genspark.ai' },
        doubao: { name: '豆包', color: '#00b96b', url: 'https://doubao.com' },
        kimi: { name: 'Kimi', color: '#ff4d4f', url: 'https://kimi.moonshot.cn' },
        wenxiaobai: { name: '问小白', color: '#1890ff', url: 'https://wenxiaobai.baidu.com' },
        copilot: { name: 'GitHub Copilot', color: '#000000', url: 'https://github.com/features/copilot' },
        wenxin: { name: '文心一言', color: '#2932e1', url: 'https://yiyan.baidu.com' },
        qianwen: { name: '通义千问', color: '#ff7a45', url: 'https://qianwen.aliyun.com' }
    };

    // 初始化本地存储
    if (!localStorage.getItem('agents')) {
        localStorage.setItem('agents', JSON.stringify([]));
    }

    if (!localStorage.getItem('settings')) {
        localStorage.setItem('settings', JSON.stringify({
            theme: 'light',
            newTabChat: true
        }));
    }

    // 应用设置
    const settings = JSON.parse(localStorage.getItem('settings'));
    applyTheme(settings.theme);
    themeSelector.value = settings.theme;
    newTabChat.checked = settings.newTabChat;

    // 全选/取消全选按钮
    selectAllBtn.addEventListener('click', function() {
        aiCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
    });

    deselectAllBtn.addEventListener('click', function() {
        aiCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    });

    // 发送消息
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // 获取选中的AI
        const selectedAIs = [];
        aiCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedAIs.push(checkbox.dataset.ai);
            }
        });

        if (selectedAIs.length === 0) {
            alert('请至少选择一个AI助手');
            return;
        }

        // 清空输入框
        chatInput.value = '';

        // 添加用户消息
        addUserMessage(message);

        // 如果设置为在新标签页打开聊天
        if (settings.newTabChat && selectedAIs.length === 1) {
            const aiId = selectedAIs[0];
            const aiInfo = aiData[aiId];
            window.open(aiInfo.url, '_blank');
            return;
        }

        // 为每个选中的AI添加回复
        selectedAIs.forEach(aiId => {
            setTimeout(() => {
                addAIMessage(aiId, message);
            }, Math.random() * 1000 + 500);
        });
    }

    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-header">
                    <div class="message-name">您</div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
                <div class="message-text">${text}</div>
            </div>
            <div class="message-avatar">您</div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // 移除欢迎消息
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.remove();
        }
    }

    function addAIMessage(aiId, query) {
        const ai = aiData[aiId];
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai';
        messageDiv.innerHTML = `
            <div class="message-avatar" style="background-color: ${ai.color}; color: white;">${ai.name.charAt(0)}</div>
            <div class="message-content">
                <div class="message-header">
                    <div class="message-name">${ai.name}</div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
                <div class="message-text">${generateAIResponse(ai.name, query)}</div>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // 模拟AI回复（实际项目中应替换为真实API调用）
    function generateAIResponse(aiName, query) {
        const responses = [
            `作为${aiName}，我认为${query.length > 30 ? query.substring(0, 30) + '...' : query}是一个很有趣的问题。`,
            `根据我的知识库，关于"${query.length > 20 ? query.substring(0, 20) + '...' : query}"的答案是...`,
            `这是一个很好的问题！${query.length > 25 ? query.substring(0, 25) + '...' : query}让我思考一下...`,
            `我是${aiName}，我的回答是：这取决于具体情况，但通常...`
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // 模态框控制
    myAgentsLink.addEventListener('click', function(e) {
        e.preventDefault();
        loadAgentsList();
        showModal(myAgentsModal);
    });

    settingsLink.addEventListener('click', function(e) {
        e.preventDefault();
        showModal(settingsModal);
    });

    createAgentButton.addEventListener('click', function() {
        hideModal(myAgentsModal);
        populateAgentAISelection();
        showModal(agentModal);
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            hideModal(modal);
        });
    });

    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target);
        }
    });

    function showModal(modal) {
        modal.style.display = 'flex';
    }

    function hideModal(modal) {
        modal.style.display = 'none';
    }

    // 智能体表单提交
    agentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const agentName = document.getElementById('agent-name').value;
        const agentDescription = document.getElementById('agent-description').value;
        const agentPrompt = document.getElementById('agent-prompt').value;
        
        // 获取选中的AI模型
        const selectedAIs = [];
        document.querySelectorAll('.agent-ai-item.selected').forEach(item => {
            selectedAIs.push(item.dataset.ai);
        });

        if (selectedAIs.length === 0) {
            alert('请至少选择一个AI模型');
            return;
        }

        // 创建新智能体
        const newAgent = {
            id: Date.now().toString(),
            name: agentName,
            description: agentDescription,
            prompt: agentPrompt,
            models: selectedAIs
        };

        // 保存到本地存储
        const agents = JSON.parse(localStorage.getItem('agents'));
        agents.push(newAgent);
        localStorage.setItem('agents', JSON.stringify(agents));

        // 重置表单并关闭模态框
        agentForm.reset();
        hideModal(agentModal);
        loadAgentsList();
        showModal(myAgentsModal);
    });

    // 设置表单提交
    settingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const theme = themeSelector.value;
        const newTabChatValue = newTabChat.checked;

        // 保存设置
        const settings = {
            theme: theme,
            newTabChat: newTabChatValue
        };
        localStorage.setItem('settings', JSON.stringify(settings));

        // 应用设置
        applyTheme(theme);

        // 关闭模态框
        hideModal(settingsModal);
    });

    // 应用主题
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else if (theme === 'light') {
            document.body.classList.remove('dark-theme');
        } else if (theme === 'system') {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        }
    }

    // 加载智能体列表
    function loadAgentsList() {
        const agents = JSON.parse(localStorage.getItem('agents'));
        agentsList.innerHTML = '';

        if (agents.length === 0) {
            agentsList.innerHTML = '<p class="no-agents">您还没有创建任何智能体</p>';
            return;
        }

        agents.forEach(agent => {
            const agentCard = document.createElement('div');
            agentCard.className = 'agent-card';
            agentCard.innerHTML = `
                <h3>${agent.name}</h3>
                <p>${agent.description || '无描述'}</p>
                <div class="agent-card-actions">
                    <button class="use-agent" data-id="${agent.id}">使用</button>
                    <button class="edit-agent" data-id="${agent.id}">编辑</button>
                    <button class="delete-agent delete" data-id="${agent.id}">删除</button>
                </div>
            `;
            agentsList.appendChild(agentCard);
        });

        // 添加事件监听器
        document.querySelectorAll('.use-agent').forEach(button => {
            button.addEventListener('click', function() {
                const agentId = this.dataset.id;
                useAgent(agentId);
            });
        });

        document.querySelectorAll('.edit-agent').forEach(button => {
            button.addEventListener('click', function() {
                const agentId = this.dataset.id;
                editAgent(agentId);
            });
        });

        document.querySelectorAll('.delete-agent').forEach(button => {
            button.addEventListener('click', function() {
                const agentId = this.dataset.id;
                deleteAgent(agentId);
            });
        });
    }

    // 使用智能体
    function useAgent(agentId) {
        const agents = JSON.parse(localStorage.getItem('agents'));
        const agent = agents.find(a => a.id === agentId);

        if (!agent) return;

        // 取消选中所有AI
        aiCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        // 选中智能体使用的AI
        agent.models.forEach(model => {
            const checkbox = document.querySelector(`.ai-checkbox[data-ai="${model}"]`);
            if (checkbox) checkbox.checked = true;
        });

        // 关闭模态框
        hideModal(myAgentsModal);
    }

    // 编辑智能体
    function editAgent(agentId) {
        const agents = JSON.parse(localStorage.getItem('agents'));
        const agent = agents.find(a => a.id === agentId);

        if (!agent) return;

        // 填充表单
        document.getElementById('agent-name').value = agent.name;
        document.getElementById('agent-description').value = agent.description || '';
        document.getElementById('agent-prompt').value = agent.prompt || '';

        // 填充AI选择
        populateAgentAISelection(agent.models);

        // 显示模态框
        hideModal(myAgentsModal);
        showModal(agentModal);
    }

    // 删除智能体
    function deleteAgent(agentId) {
        if (!confirm('确定要删除这个智能体吗？')) return;

        const agents = JSON.parse(localStorage.getItem('agents'));
        const updatedAgents = agents.filter(a => a.id !== agentId);
        localStorage.setItem('agents', JSON.stringify(updatedAgents));

        loadAgentsList();
    }

    // 填充智能体AI选择
    function populateAgentAISelection(selectedModels = []) {
        const agentAISelection = document.querySelector('.agent-ai-selection');
        agentAISelection.innerHTML = '';

        for (const aiId in aiData) {
            const ai = aiData[aiId];
            const aiItem = document.createElement('div');
            aiItem.className = 'agent-ai-item';
            if (selectedModels.includes(aiId)) {
                aiItem.classList.add('selected');
            }
            aiItem.dataset.ai = aiId;
            aiItem.innerHTML = ai.name;
            aiItem.addEventListener('click', function() {
                this.classList.toggle('selected');
            });
            agentAISelection.appendChild(aiItem);
        }
    }
});
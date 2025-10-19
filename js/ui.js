// ====== UI Rendering Functions ======

// ====== Log Event ======
function logEvent(text) {
    const logDiv = document.getElementById('log');
    const p = document.createElement('p');
    p.innerText = text;
    p.style.margin = "6px 0";
    logDiv.appendChild(p);

    const messages = Array.from(logDiv.children);
    messages.forEach(msg => {
        const rect = msg.getBoundingClientRect();
        const parentRect = logDiv.getBoundingClientRect();
        const distanceFromTop = rect.top - parentRect.top;
        if (distanceFromTop < 100) msg.style.opacity = Math.max(0, distanceFromTop / 100);
        else msg.style.opacity = 1;
    });
    messages.forEach(msg => {
        const rect = msg.getBoundingClientRect();
        const parentRect = logDiv.getBoundingClientRect();
        if (rect.bottom < parentRect.top) logDiv.removeChild(msg);
    });
}

// ====== Render Upgrades ======
function renderUpgrades() {
    const container = document.getElementById('upgrade-list');
    container.innerHTML = '';
    upgrades.forEach(u => {
        if (state.totalData >= u.unlock && !u.purchased) {
            const btn = document.createElement('button');
            btn.innerText = `${u.name} - Cost: ${u.cost}`;
            btn.className = 'upgrade-btn';
            btn.disabled = state.data < u.cost || u.purchased;
            btn.onclick = () => purchaseUpgrade(u.id);
            container.appendChild(btn);
        }
    });
}

// ====== Render Stats Panel ======
function renderStats() {
    document.getElementById('stat-employees').innerText = state.employees.toFixed(1);
    document.getElementById('stat-dps').innerText = state.employees.toFixed(1);
    document.getElementById('stat-click').innerText = state.clickMultiplier.toFixed(1);
    document.getElementById('stat-total').innerText = state.totalData.toFixed(0);
    document.getElementById('stat-data').innerText = Math.floor(state.data);
    document.getElementById('stat-cap').innerText = state.dataCap;
    document.getElementById('stat-moderation').innerText = state.moderation;
    document.getElementById('stat-users').innerText = Math.floor(state.users);
    document.getElementById('comp-synapse').innerText = `SynapseCorp: ${state.aiCompetitors[0].data.toFixed(0)}`;
    document.getElementById('comp-deepcore').innerText = `DeepCore: ${state.aiCompetitors[1].data.toFixed(0)}`;
}

// ====== Check Auto-AI Button ======
function checkAutoAIButton() {
    if (state.flags.autoAI) {
        autoAIButton.style.display = 'block';
    } else {
        autoAIButton.style.display = 'none';
    }
}

// ====== Main Render ======
function render() {
    document.getElementById('data').innerText = Math.floor(state.data);
    document.getElementById('employees').innerText = state.employees.toFixed(1);
    updateMQ();
    document.getElementById('mq').innerText = state.mqDisplay;
    renderUpgrades();
    renderStats();
    checkStage2();
    checkAutoAIButton();
}

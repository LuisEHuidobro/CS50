// ====== UI Rendering Functions ======

// ====== Floating Text Effect ======
function showFloatingText(text, x, y) {
    const floatingText = document.createElement('div');
    floatingText.className = 'floating-text';
    floatingText.innerText = text;
    floatingText.style.left = x + 'px';
    floatingText.style.top = y + 'px';

    document.body.appendChild(floatingText);

    // Remove element after animation completes
    setTimeout(() => {
        document.body.removeChild(floatingText);
    }, 1500);
}

// ====== Log Event ======
function logEvent(text) {
    const logDiv = document.getElementById('log');
    const p = document.createElement('p');
    p.innerText = text;
    p.style.margin = "6px 0";
    logDiv.appendChild(p);

    // Keep only the last 5 messages
    const messages = Array.from(logDiv.children);
    while (messages.length > 5) {
        logDiv.removeChild(messages[0]);
    }

    // Apply fade effect: brightest at bottom (newest)
    const currentMessages = Array.from(logDiv.children);
    currentMessages.forEach((msg, index) => {
        const positionFromEnd = currentMessages.length - 1 - index;
        const opacity = 1.0 - (positionFromEnd * 0.2);
        msg.style.opacity = opacity;
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
    document.getElementById('stat-dps').innerText = state.actualDPS.toFixed(1);
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
    document.getElementById('data').innerText = state.data.toFixed(1);
    document.getElementById('employees').innerText = state.employees.toFixed(1);
    updateMQ();
    document.getElementById('mq').innerText = state.mqDisplay;
    renderUpgrades();
    renderStats();
    checkStage2();
    checkAutoAIButton();
}

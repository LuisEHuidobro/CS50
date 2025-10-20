// ====== Core Game Logic ======

// ====== Add Data ======
function addData(amount) {
    const spaceLeft = state.dataCap - state.data;
    const actualAdd = Math.min(amount, spaceLeft);
    state.data += actualAdd;
    state.totalData += actualAdd;
}

// ====== Update MQ ======
function updateMQ() {
    let phaseCount = 0;
    mqPhases.forEach((phase, index) => {
        if (state.totalData >= phase.threshold) {
            phaseCount++;
            if (!state.milestones["mq" + index]) {
                logEvent(phase.text);
                state.milestones["mq" + index] = true;
            }
        }
    });
    state.mq = phaseCount / mqPhases.length;

    if (state.mq >= 0.999 && (state.flags.badBranch || state.flags.goodBranch)) {
        state.flags.meltdownActive = true;
    }

    if (state.flags.meltdownActive) {
        const extraNines = Math.min(Math.floor(state.totalData / 100000), 50);
        const base = "0.999";
        state.mqDisplay = base + "9".repeat(extraNines) + "%";

        if (Math.random() < 0.3) {
            const messages = ["I AM...", "@#&%!!", "SYSTEM OVERRIDE...", "999999..."];
            logEvent(messages[Math.floor(Math.random() * messages.length)]);
        }
    } else {
        state.mqDisplay = Math.floor(state.mq * 100) + "%";
    }
}

// ====== Auto-AI Button ======
const autoAIButton = document.createElement('button');
autoAIButton.id = 'auto-ai-toggle';
autoAIButton.innerText = 'AI can Upgrade: OFF';
autoAIButton.style.display = 'none';
autoAIButton.dataset.active = 'false';

// ====== Initialize Auto-AI ======
function initializeAutoAI() {
    // Append button to main content
    document.getElementById('main-content').appendChild(autoAIButton);

    // Toggle listener
    autoAIButton.addEventListener('click', () => {
        const isActive = autoAIButton.dataset.active === 'true';
        if (isActive) {
            autoAIButton.dataset.active = 'false';
            autoAIButton.innerText = 'AI can Upgrade: OFF';
        } else {
            autoAIButton.dataset.active = 'true';
            autoAIButton.innerText = 'AI can Upgrade: ON';
        }
    });

    // Auto-purchase interval
    setInterval(() => {
        if (autoAIButton.dataset.active === 'true') {
            const nextUpgrade = upgrades.find(u =>
                !u.purchased && state.totalData >= u.unlock && state.data >= u.cost
            );
            if (nextUpgrade) {
                purchaseUpgrade(nextUpgrade.id);
            }
        }
    }, TIMING.AUTO_AI_CHECK_INTERVAL);
}

// ====== Start Passive Growth ======
function startPassiveGrowth() {
    // Base passive interval (1 second)
    setInterval(() => {
        // Calculate actual DPS based on stored data change
        const currentData = state.data;
        const dataDifference = currentData - state.previousData;
        state.actualDPS = Math.max(0, dataDifference); // Can't be negative
        state.previousData = currentData;

        addData(state.employees);
        addData(state.users * 0.01 * state.marketingMultiplier);

        // User growth formula
        let baseGrowth = 0.01;
        let dataFactor = Math.log10(state.totalData + 1);
        let marketingFactor = 1 + (state.marketingMultiplier * 0.1);
        let growth = baseGrowth * dataFactor * marketingFactor;

        if (state.stage2.branchChosen === "efficiency") growth *= 1.2;
        if (state.stage2.branchChosen === "ethics") growth *= 1.1;

        state.users += growth;

        // Moderation penalty
        if (state.users > state.moderation * 1000) {
            let penalty = (state.users - state.moderation * 1000) * 0.01;
            addData(-penalty);
            logEvent(`Moderation overloaded! Lost ${penalty.toFixed(0)} data.`);
        }

        render();
    }, TIMING.PASSIVE_INTERVAL);

    // Variable data interval
    setInterval(() => {
        let passiveData = state.employees + state.users * 0.01 * state.marketingMultiplier;
        addData(passiveData * state.passiveMultiplier * state.dataMultiplier);
        render();
    }, state.dataInterval);
}

// ====== Main Game Initialization and Event Listeners ======

// ====== Event Listeners ======

// Train button
document.getElementById('btn-train').addEventListener('click', () => {
    addData(state.clickMultiplier * state.dataMultiplier);
    render();
});

// Experimental tracking button
document.getElementById('exp-track-btn').addEventListener('click', () => {
    const cost = 100;
    const success = Math.random() < 0.5;
    if (state.data >= cost) {
        state.data -= cost;
        if (success) {
            const gain = 10000;
            addData(gain);
            logEvent(`Experimental Tracking succeeded! Data +${gain}.`);
        } else {
            logEvent("Experimental Tracking failed. No data gained.");
        }
    } else {
        logEvent("Not enough data for Experimental Tracking.");
    }
    render();
});

// Branch choice: Ethics
document.getElementById('branch-ethics').addEventListener('click', () => {
    if (!state.stage2.branchChosen) {
        state.stage2.branchChosen = "ethics";
        logEvent("You chose the ethical path. Humanity benefits!");
        state.clickMultiplier += 0.2;
        hideBranchButtons();
    }
});

// Branch choice: Efficiency
document.getElementById('branch-efficiency').addEventListener('click', () => {
    if (!state.stage2.branchChosen) {
        state.stage2.branchChosen = "efficiency";
        logEvent("You chose the efficiency path. Maximum productivity unlocked!");
        state.clickMultiplier += 0.5;
        hideBranchButtons();
    }
});

// Hire moderators button
document.getElementById('btn-hire-moderators').addEventListener('click', () => {
    const cost = 600;
    if (state.data >= cost) {
        state.data -= cost;
        state.moderation += 1;
        logEvent("Hired a moderator via Global Systems Dashboard!");
        render();
    } else {
        logEvent("Not enough data to hire a moderator.");
    }
});

// Dev unlock button (for testing)
document.getElementById('dev-unlock').addEventListener('click', () => {
    // Force-unlock all dashboards
    document.getElementById('stage2-menu').style.display = 'block';
    document.getElementById('branch-panel').style.display = 'block';
    document.getElementById('global-systems').style.display = 'block';
    document.getElementById('meltdown-monitor').style.display = 'block';

    // Mark all milestones as achieved
    state.milestones.stage2 = true;
    state.milestones.branch = true;
    state.milestones.global = true;
    state.milestones.meltdown = true;

    // Push stage to final
    state.stage = 5;

    logEvent("⚙ Dev Unlock: All dashboards unlocked for testing.");
    render();
});

// ====== Game Initialization ======
function initGame() {
    // Initialize Auto-AI system
    initializeAutoAI();

    // Start passive growth intervals
    startPassiveGrowth();

    // Initial render
    render();
}

// Start the game when DOM is ready
initGame();

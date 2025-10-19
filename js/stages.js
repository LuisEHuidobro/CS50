// ====== Stage Progression System ======

// ====== Stage 2 Check (Legacy - kept for compatibility) ======
function checkStage2() {
    if (state.totalData >= STAGE_THRESHOLDS.STAGE_2 && !state.milestones.stage2) {
        document.getElementById('stage2-menu').style.display = 'block';
        logEvent("Neural Network Dashboard unlocked!");
        state.stage = 2;
        state.milestones.stage2 = true;
    }
}

// ====== Hide Branch Buttons ======
function hideBranchButtons() {
    const panel = document.getElementById('branch-panel');
    panel.style.display = 'none';
}

// ====== Check All Stage Unlocks ======
function checkStageUnlocks() {
    // Stage 2: Neural Network Dashboard
    if (state.totalData >= STAGE_THRESHOLDS.STAGE_2 && !state.milestones.stage2) {
        document.getElementById('stage2-menu').style.display = 'block';
        logEvent("Neural Network Dashboard unlocked!");
        state.stage = 2;
        state.milestones.stage2 = true;
    }

    // Stage 3: Branch Decision
    if (state.totalData >= STAGE_THRESHOLDS.STAGE_3 && !state.milestones.branch) {
        document.getElementById('branch-panel').style.display = 'block';
        logEvent("Your AI starts questioning its purpose...");
        state.stage = 3;
        state.milestones.branch = true;
    }

    // Stage 4: Global Systems
    if (state.totalData >= STAGE_THRESHOLDS.STAGE_4 && !state.milestones.global) {
        document.getElementById('global-systems').style.display = 'block';
        logEvent("Global Systems Dashboard unlocked—users, competitors, and world influence!");
        state.stage = 4;
        state.milestones.global = true;
    }

    // Stage 5: Meltdown Monitor
    if (state.mq >= STAGE_THRESHOLDS.STAGE_5_MQ && state.stage >= 3 && !state.milestones.meltdown) {
        document.getElementById('meltdown-monitor').style.display = 'block';
        logEvent("⚠ Meltdown Monitor activated. System instability detected.");
        state.stage = 5;
        state.milestones.meltdown = true;
    }
}

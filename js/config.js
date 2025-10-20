// ====== Game Configuration ======

// Model Quality progression phases
const mqPhases = [
    { threshold: 50, text: "Your AI takes its first steps." },
    { threshold: 2500, text: "Data is flowing; models become coherent." },
    { threshold: 10000, text: "AI starts suggesting optimizations." },
    { threshold: 500000, text: "Neural Network Dashboard unlocked." }
];

// Stage unlock thresholds
const STAGE_THRESHOLDS = {
    STAGE_2: 500000,      // Neural Network Dashboard
    STAGE_3: 2000000,     // Branch Decision
    STAGE_4: 20000000,    // Global Systems
    STAGE_5_MQ: 0.999     // Meltdown (requires MQ >= 99.9% and stage >= 3)
};

// Timing constants
const TIMING = {
    PASSIVE_INTERVAL: 1000,          // Base passive growth interval (1 second)
    DEFAULT_DATA_INTERVAL: 2000,     // Initial data generation interval (2 seconds)
    AUTO_AI_CHECK_INTERVAL: 1000     // Auto-AI purchase check interval (1 second)
};

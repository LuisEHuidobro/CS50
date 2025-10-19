// ====== Game State ======

let state = {
    data: 0,
    employees: 0,
    mq: 0,
    mqDisplay: "0%",
    totalData: 0,
    stage: 1,
    flags: {
        failsafe: false,
        badBranch: false,
        goodBranch: false,
        secretEndingAvailable: false,
        meltdownActive: false,
        autoAI: false
    },
    milestones: {},
    clickMultiplier: 1,
    dataCap: 10000,
    users: 0,
    moderation: 1,
    aiCompetitors: [
        {name: "SynapseCorp", data: 0, rate: 0.5},
        {name: "DeepCore", data: 0, rate: 0.3}
    ],
    marketingMultiplier: 1,
    dataMultiplier: 1,
    dataInterval: TIMING.DEFAULT_DATA_INTERVAL,
    passiveMultiplier: 1
};

// Stage 2 state
state.stage2 = { branchChosen: null };

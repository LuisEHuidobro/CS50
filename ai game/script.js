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
        {name:"SynapseCorp", data:0, rate:0.5},
        {name:"DeepCore", data:0, rate:0.3}
    ],
    marketingMultiplier: 1,
    dataMultiplier : 1, // 100% by default
    dataInterval : 2000, // 2 seconds by default

};

// Stage 2
state.stage2 = { branchChosen: null };

// ====== Flavor / MQ Phases ======
const mqPhases = [
  { threshold: 50, text: "Your AI takes its first steps." },
  { threshold: 2500, text: "Data is flowing; models become coherent." },
  { threshold: 10000, text: "AI starts suggesting optimizations." },
  { threshold: 500000, text: "Neural Network Dashboard unlocked." }
];

// ====== Log Event ======
function logEvent(text){
    const logDiv = document.getElementById('log');
    const p = document.createElement('p');
    p.innerText = text;
    p.style.margin = "6px 0"; // add spacing
    logDiv.appendChild(p);

    const messages = Array.from(logDiv.children);
    messages.forEach(msg => {
        const rect = msg.getBoundingClientRect();
        const parentRect = logDiv.getBoundingClientRect();
        const distanceFromTop = rect.top - parentRect.top;
        if(distanceFromTop < 100) msg.style.opacity = Math.max(0, distanceFromTop/100);
        else msg.style.opacity = 1;
    });
    messages.forEach(msg => {
        const rect = msg.getBoundingClientRect();
        const parentRect = logDiv.getBoundingClientRect();
        if(rect.bottom < parentRect.top) logDiv.removeChild(msg);
    });
}

// ====== Upgrades ======
const upgrades = [
    // ===== Click / Education Branch =====
    {id:'education', name:'AI Education', cost:50, unlock:50, purchased:false, effect:()=>{
        state.clickMultiplier += 0.5;
        logEvent("Your AI studies basic patterns—clicks feel more effective.");
    }},
    {id:'advanced-education', name:'Advanced AI Courses', cost:300, unlock:500, purchased:false, effect:()=>{
        state.clickMultiplier += 1.0;
        logEvent("Deep learning courses taken—clicks are sharper than ever.");
    }},
    {id:'neural-research', name:'Neural Research Papers', cost:1200, unlock:2000, purchased:false, effect:()=>{
        state.clickMultiplier += 2.0;
        logEvent("Neural network research applied—clicks feel like magic.");
    }},
    {id:'ai-conference', name:'AI Global Conference', cost:5000, unlock:10000, purchased:false, effect:()=>{
        state.clickMultiplier += 3.0;
        logEvent("Global insights improve AI efficiency massively.");
    }},

    // ===== Data Storage =====
    {id:'storage', name:'Data Storage Expansion', cost:50, unlock:100, purchased:false, effect:()=>{
        state.dataCap += 500;
        logEvent("Storage expanded—your drives are groaning already.");
    }},
    {id:'cloud', name:'Cloud Trial Subscription', cost:550, unlock:1250, purchased:false, effect:()=>{
        state.dataCap += 2000;
        logEvent("Temporary cloud space unlocked—don’t forget to cancel the trial!");
    }},
    {id:'cloudplus', name:'Cloud Expansion', cost:5200, unlock:2700, purchased:false, effect:()=>{
        state.dataCap += 10000;
        logEvent("Your datasets float effortlessly in the digital sky.");
    }},
    {id:'quantum', name:'Quantum Cache', cost:3200, unlock:1700, purchased:false, effect:()=>{
        state.dataCap += 50000;
        logEvent("Quantum entanglement bends space to store more data.");
    }},
    {id:'distributed-storage', name:'Distributed Storage Network', cost:12000, unlock:10000, purchased:false, effect:()=>{
        state.dataCap += 100000;
        logEvent("Data is now replicated across multiple continents.");
    }},
    {id:'quantum-network', name:'Quantum Data Network', cost:50000, unlock:50000, purchased:false, effect:()=>{
        state.dataCap += 500000;
        logEvent("Quantum networks store vast amounts of information instantly.");
    }},

    // ===== Employees / Click Power =====
    {id:'intern', name:'Intern', cost:0, unlock:1000, purchased:false, effect:()=>{
        state.employees += 1; state.dataMultiplier += 0.25;
        logEvent("Fresh out of college—eager and underpaid!");
    }},
    {id:'advintern', name:'Advanced Interns', cost:0, unlock:10000, purchased:false, effect:()=>{
        state.employees += 1; state.dataMultiplier += 0.25;
        logEvent("Interns with actual experience? What a bargain.");
    }},
    {id:'consultant', name:'AI Consultant', cost:125000, unlock:100000, purchased:false, effect:()=>{
        state.employees += 1; state.clickMultiplier += 0.5; state.dataMultiplier += 0.25
        logEvent("Consultant hired—half the cost, double the buzzwords.");
    }},
    {id:'gpu', name:'Used GPU Rig', cost:1300, unlock:700, purchased:false, effect:()=>{
        state.employees += 0.5;
        state.dataMultiplier += 0.1;
        state.dataInterval = Math.max(500, state.dataInterval - 100);
        logEvent("Slightly scorched, but still crunches tensors.");
    }},
    {id:'supergpu', name:'GPU Cluster', cost:4800, unlock:2500, purchased:false, effect:()=>{
        state.employees += 2;
        logEvent("GPUs hum together like a digital choir.");
    }},
    {id:'tpu', name:'TPU Slot', cost:130000, unlock:100000, purchased:false, effect:()=>{
        state.employees += 1;
        logEvent("TPU slot accelerates your AI calculations.");
    }},
    {id:'ml-engineer', name:'Hire ML Engineer', cost:8000, unlock:5000, purchased:false, effect:()=>{
        state.employees += 5;
        state.clickMultiplier += 1.0;
        logEvent("ML engineers onboard—efficiency skyrockets.");
    }},
    {id:'ai-lab', name:'AI Research Lab', cost:25000, unlock:20000, purchased:false, effect:()=>{
        state.employees += 10;
        state.clickMultiplier += 2.0;
        logEvent("Research lab established—AI breakthroughs accelerate.");
    }},
    {id:'supercluster', name:'Supercomputer Cluster', cost:100000, unlock:100000, purchased:false, effect:()=>{
        state.employees += 25;
        state.clickMultiplier += 5.0;
        logEvent("Massive supercomputers deployed—AI productivity surges.");
    }},

    // ===== Tools =====
    {id:'labeling', name:'Labeling Toolkit', cost:600, unlock:150, purchased:false, effect:()=>{
        state.clickMultiplier += 0.3;
        logEvent("Labels are crisp, clean, and profitable.");
    }},
    {id:'tracker', name:'Experiment Tracker', cost:900, unlock:400, purchased:false, effect:()=>{
        state.clickMultiplier += 0.5;
        logEvent("You finally know which model did what. Productivity rises.");
    }},
    {id:'neuraltool', name:'Neural Toolkit', cost:2800, unlock:1500, purchased:false, effect:()=>{
        state.clickMultiplier += 1.0;
        logEvent("Your tools grow smarter—clicks resonate with precision.");
    }},
    {id:'annotation', name:'Basic Annotation Tool', cost:50, unlock:10, purchased:false, effect:()=>{
        state.clickMultiplier += 0.2;
        logEvent("Annotation tool activated—clicks feel more meaningful.");
    }},
    {id:'auto-labeler', name:'Automated Labeler', cost:8000, unlock:5000, purchased:false, effect:()=>{
        state.clickMultiplier += 2.0;
        logEvent("Automated labeling drastically reduces manual work.");
    }},
    {id:'ai-debugger', name:'AI Debugging Suite', cost:20000, unlock:20000, purchased:false, effect:()=>{
        state.clickMultiplier += 3.0;
        logEvent("Advanced debugging tools optimize AI behavior.");
    }},

    // ===== Ethics / Failsafe =====
    {id:'hitl', name:'Early Failsafe Protocol', cost:1100, unlock:500, purchased:false, effect:()=>{
        state.flags.failsafe = true;
        state.flags.secretEndingAvailable = true;
        logEvent("Early failsafe installed discreetly.");
    }},
    {id:'autonomy', name:'Autonomy Protocol', cost:3600, unlock:1900, purchased:false, effect:()=>{
        state.flags.autoAI = true;
        logEvent("Autonomy protocol enabled—the AI can make some decisions.");
    }},
    {id:'ethics', name:'Ethical Guidelines', cost:4400, unlock:2300, purchased:false, effect:()=>{
        state.clickMultiplier += 0.2;
        logEvent("Ethical principles improve efficiency.");
    }},
    {id:'failsafe-advanced', name:'Advanced Failsafe System', cost:10000, unlock:15000, purchased:false, effect:()=>{
        state.flags.failsafe = true;
        state.clickMultiplier += 1.0;
        logEvent("Failsafe upgraded to advanced level—AI is more controlled.");
    }},
    {id:'autonomy-advanced', name:'Autonomous AI Module', cost:30000, unlock:50000, purchased:false, effect:()=>{
        state.flags.autoAI = true;
        state.clickMultiplier += 2.0;
        logEvent("AI autonomy enhanced—AI can make complex decisions independently.");
    }},

    // ===== Marketing / Users =====
    {id:'marketing', name:'Marketing Campaign', cost:500, unlock:1000, purchased:false, effect:()=>{
        state.users += 50;
        logEvent("Your AI gains more users through clever marketing.");
    }},
    {id:'lobby', name:'Lobby for AI Rights', cost:1200, unlock:2500, purchased:false, effect:()=>{
        state.dataCap += 5000;
        logEvent("Government lobbying expands your capabilities.");
    }},
    {id:'patent', name:'Patent Algorithm', cost:2000, unlock:3500, purchased:false, effect:()=>{
        state.dataCap += 10000;
        logEvent("Patents protect your algorithm—your dominance grows.");
    }},
    {id:'global-marketing', name:'Global Marketing Blitz', cost:20000, unlock:20000, purchased:false, effect:()=>{
        state.users += 500;
        logEvent("Global marketing attracts hundreds of new users!");
    }},
    {id:'ai-ambassadors', name:'AI Ambassadors Program', cost:50000, unlock:50000, purchased:false, effect:()=>{
        state.users += 2000;
        logEvent("Ambassadors help onboard thousands of new users.");
    }},
    // ====== Data Gain Interval Reducers =====
    {id: 'fasterProcessing', name: 'Faster Processing', cost: 300, unlock: 150, purchased: false, effect: () => {
        state.dataInterval = Math.max(1000, state.dataInterval - 200);
        logEvent("Processing speed increased—data is generated more frequently.");
    }},
    {id: 'optimizedAlgorithms', name: 'Optimized Algorithms', cost: 1500, unlock: 800, purchased: false, effect: () => {
        state.dataInterval = Math.max(500, state.dataInterval - 300);
        logEvent("Algorithms optimized—data generation is even faster.");
    }},
    {id: 'quantumComputing', name: 'Quantum Computing', cost: 5000, unlock: 2000, purchased: false, effect: () => {
        state.dataInterval = Math.max(100, state.dataInterval - 500);
        logEvent("Quantum computing implemented—data generation reaches new speeds.");
    }},
];


// ====== Render Upgrades ======
function renderUpgrades() {
    const container = document.getElementById('upgrade-list');
    container.innerHTML = '';
    upgrades.forEach(u=>{
        if(state.totalData >= u.unlock && !u.purchased) {
            const btn = document.createElement('button');
            btn.innerText = `${u.name} - Cost: ${u.cost}`;
            btn.className='upgrade-btn';
            btn.disabled = state.data < u.cost || u.purchased;
            btn.onclick = ()=>purchaseUpgrade(u.id);
            container.appendChild(btn);
        }
    });
}

// ====== Purchase Upgrade ======
function purchaseUpgrade(id){
    const upg = upgrades.find(u=>u.id===id);
    if(state.data>=upg.cost && !upg.purchased){
        state.data -= upg.cost;
        upg.effect();
        upg.purchased=true;
        render();
        logEvent(`Purchased ${upg.name}`);
    }
}

// Create the button element
const autoAIButton = document.createElement('button');
autoAIButton.id = 'auto-ai-toggle';
autoAIButton.innerText = 'AI can Upgrade: OFF';
autoAIButton.style.display = 'none'; // hidden by default
autoAIButton.dataset.active = 'false';

// Append it under the stats panel
document.getElementById('main-content').appendChild(autoAIButton);

// Function to toggle AI auto-upgrade
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

// ====== Show the button if autoAI is purchased ======
function checkAutoAIButton() {
    if(state.flags.autoAI) {
        autoAIButton.style.display = 'block';
    } else {
        autoAIButton.style.display = 'none';
    }
}

setInterval(() => {
    if(autoAIButton.dataset.active === 'true') {
        // Find the first upgrade that is unlocked, not purchased, and affordable
        const nextUpgrade = upgrades.find(u => 
            !u.purchased && state.totalData >= u.unlock && state.data >= u.cost
        );
        if(nextUpgrade) {
            purchaseUpgrade(nextUpgrade.id);
        }
    }
}, 1000); // check every second

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
    mqPhases.forEach((phase, index)=>{
        if(state.totalData >= phase.threshold){
            phaseCount++;
            if(!state.milestones["mq"+index]){
                logEvent(phase.text);
                state.milestones["mq"+index] = true;
            }
        }
    });
    state.mq = phaseCount / mqPhases.length;
    
    if(state.mq >= 0.999 && (state.flags.badBranch || state.flags.goodBranch)){
        state.flags.meltdownActive = true;
    }

    if(state.flags.meltdownActive){
        const extraNines = Math.min(Math.floor(state.totalData/100000), 50);
        const base = "0.999";
        state.mqDisplay = base + "9".repeat(extraNines) + "%";

        if(Math.random() < 0.3){
            const messages = ["I AM...", "@#&%!!", "SYSTEM OVERRIDE...", "999999..."];
            logEvent(messages[Math.floor(Math.random()*messages.length)]);
        }
    } else {
        state.mqDisplay = Math.floor(state.mq*100) + "%";
    }
}

// ====== Render Stats Panel ======
function renderStats(){
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


// ====== Render UI ======
function render(){
    document.getElementById('data').innerText = Math.floor(state.data);
    document.getElementById('employees').innerText = state.employees.toFixed(1);
    updateMQ();
    document.getElementById('mq').innerText = state.mqDisplay;
    renderUpgrades();
    renderStats();
    checkStage2();
    checkAutoAIButton();
}

// ====== Stage 2 ======
function checkStage2(){
    if(state.totalData >= 500000 && !state.milestones.stage2){
        document.getElementById('stage2-menu').style.display = 'block';
        logEvent("Neural Network Dashboard unlocked!");
        state.stage = 2;
        state.milestones.stage2 = true;
    }
}

// ====== Button Clicks ======
document.getElementById('btn-train').addEventListener('click',()=>{
    addData(state.clickMultiplier * state.dataMultiplier);
    render();
});


document.getElementById('exp-track-btn').addEventListener('click',()=>{
    const cost = 100;
    const success = Math.random() < 0.5;
    if(state.data >= cost){
        state.data -= cost;
        if(success){
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

document.getElementById('branch-ethics').addEventListener('click', ()=>{
    if(!state.stage2.branchChosen){
        state.stage2.branchChosen = "ethics";
        logEvent("You chose the ethical path. Humanity benefits!");
        state.clickMultiplier += 0.2;
        hideBranchButtons(); // now hides the whole panel
    }
});

document.getElementById('branch-efficiency').addEventListener('click', ()=>{
    if(!state.stage2.branchChosen){
        state.stage2.branchChosen = "efficiency";
        logEvent("You chose the efficiency path. Maximum productivity unlocked!");
        state.clickMultiplier += 0.5;
        hideBranchButtons(); // now hides the whole panel
    }
});
document.getElementById('btn-hire-moderators').addEventListener('click', () => {
    const cost = 600;
    if (state.data >= cost) {
        state.data -= cost;
        state.moderation += 1;  // Matches your existing upgrade effect
        logEvent("Hired a moderator via Global Systems Dashboard!");
        render();
    } else {
        logEvent("Not enough data to hire a moderator.");
    }
});


function hideBranchButtons(){
    const panel = document.getElementById('branch-panel');
    panel.style.display = 'none';
}


// ====== Passive Growth ======
setInterval(()=>{
    addData(state.employees); // employee-generated data
    addData(state.users * 0.01 * state.marketingMultiplier); // still keep passive data from users

    // New slow user growth formula
    let baseGrowth = 0.01;
    let dataFactor = Math.log10(state.totalData + 1);
    let marketingFactor = 1 + (state.marketingMultiplier * 0.1);
    let growth = baseGrowth * dataFactor * marketingFactor;

    if(state.stage2.branchChosen === "efficiency") growth *= 1.2;
    if(state.stage2.branchChosen === "ethics") growth *= 1.1;

    state.users += growth;

    // Moderation limit
    if(state.users > state.moderation * 1000){
        let penalty = (state.users - state.moderation*1000)*0.01;
        addData(-penalty);
        logEvent(`Moderation overloaded! Lost ${penalty.toFixed(0)} data.`);
    }

    render();
},1000);

setInterval(()=>{
    let passiveData = state.employees + state.users * 0.01 * state.marketingMultiplier;
    addData(passiveData * state.passiveMultiplier * state.dataMultiplier); // multiply by percentage multiplier
    render();
}, state.dataInterval);



//dev
// ====== Dev Unlock Button ======
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


// ====== Stage Unlocks ======
function checkStageUnlocks(){
    if(state.totalData >= 500000 && !state.milestones.stage2){
        document.getElementById('stage2-menu').style.display = 'block';
        logEvent("Neural Network Dashboard unlocked!");
        state.stage = 2;
        state.milestones.stage2 = true;
    }
    if(state.totalData >= 2000000 && !state.milestones.branch){
        document.getElementById('branch-panel').style.display = 'block';
        logEvent("Your AI starts questioning its purpose...");
        state.stage = 3;
        state.milestones.branch = true;
    }
    if(state.totalData >= 20000000 && !state.milestones.global){
        document.getElementById('global-systems').style.display = 'block';
        logEvent("Global Systems Dashboard unlocked—users, competitors, and world influence!");
        state.stage = 4;
        state.milestones.global = true;
    }
    if(state.mq >= 0.999 && state.stage >= 3 && !state.milestones.meltdown){
        document.getElementById('meltdown-monitor').style.display = 'block';
        logEvent("⚠ Meltdown Monitor activated. System instability detected.");
        state.stage = 5;
        state.milestones.meltdown = true;
    }
}


// ====== Initial Render ======
render();

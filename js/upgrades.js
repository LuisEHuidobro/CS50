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
        logEvent("Temporary cloud space unlocked—don't forget to cancel the trial!");
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

// ====== Purchase Upgrade ======
function purchaseUpgrade(id) {
    const upg = upgrades.find(u => u.id === id);
    if (state.data >= upg.cost && !upg.purchased) {
        state.data -= upg.cost;
        upg.effect();
        upg.purchased = true;
        render();
        logEvent(`Purchased ${upg.name}`);
    }
}

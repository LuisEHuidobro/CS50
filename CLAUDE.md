# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a CS50 AI-themed incremental game called "Growth Engine AI". It's a browser-based clicker game built with vanilla HTML/CSS/JavaScript that simulates the progression of training and scaling an AI system.

## Architecture

### Modular Structure
The codebase follows a clear separation of concerns with dedicated files for different responsibilities:

**Configuration** (`js/config.js`)
- `mqPhases`: Model Quality progression thresholds and flavor text
- `STAGE_THRESHOLDS`: Stage unlock requirements (500k, 2M, 20M, 99.9% MQ)
- `TIMING`: Interval constants for game loops

**State Management** (`js/state.js`)
- Single `state` object containing all game data
- Core resources: `data`, `employees`, `users`, `moderation`
- Progression: `totalData`, `mq`, `stage`, `milestones`
- Flags: `failsafe`, `autoAI`, `meltdownActive`, etc.
- Multipliers and limits

**Upgrades** (`js/upgrades.js`)
- Flat array of upgrade definitions (~39 upgrades)
- Categories: Education, Storage, Employees, Tools, Ethics, Marketing, Processing Speed
- `purchaseUpgrade()` function handles all purchase logic

**Game Logic** (`js/game.js`)
- `addData()`: Enforces data cap when adding resources
- `updateMQ()`: Calculates Model Quality from thresholds
- `initializeAutoAI()`: Sets up auto-purchase system
- `startPassiveGrowth()`: Manages two passive income intervals

**UI Rendering** (`js/ui.js`)
- `logEvent()`: Adds messages to story log with fade effects
- `render()`: Main render loop, updates all UI elements
- `renderUpgrades()`, `renderStats()`: Specialized rendering
- `checkAutoAIButton()`: Shows/hides auto-AI toggle

**Stage Progression** (`js/stages.js`)
- `checkStageUnlocks()`: Manages all 5 stage unlocks
- `checkStage2()`: Legacy compatibility for Stage 2
- `hideBranchButtons()`: Controls branch decision UI

**Event Handlers** (`js/main.js`)
- All DOM event listeners (train, experimental, branch choices, moderators, dev tools)
- `initGame()`: Initialization entry point

### Stage Progression System
The game unlocks five progressive stages based on `totalData`:
1. **Stage 1** (0-500k): Basic upgrades and clicking
2. **Stage 2** (500k+): Neural Network Dashboard with experimental tracking
3. **Stage 3** (2M+): Branch decision panel (Ethics vs Efficiency path)
4. **Stage 4** (20M+): Global Systems Dashboard (users, competitors, moderation)
5. **Stage 5** (MQ ≥ 99.9% + Stage 3+): Meltdown Monitor (game climax)

Each stage unlock is controlled by `state.milestones` flags to prevent re-triggering.

### Passive Income System
Two intervals drive passive data generation:
- **1000ms interval** (base): Employee-based data, user growth formula, moderation penalties
- **Variable interval** (`state.dataInterval`): Additional passive data scaled by multipliers

### Model Quality (MQ) System
MQ is a percentage calculated from passing thresholds in `mqPhases`. When MQ reaches 99.9% after choosing a branch in Stage 3, the meltdown state activates with special visual effects (repeating 9s in display).

## File Structure

```
/
├── index.html           - Main HTML with proper script/link loading order
├── README.md           - Project description
├── CLAUDE.md           - This file
├── .gitignore          - Ignore macOS and IDE files
├── js/
│   ├── config.js       - Game constants and thresholds
│   ├── state.js        - Game state object
│   ├── upgrades.js     - Upgrade definitions and purchase logic
│   ├── game.js         - Core game mechanics (data, MQ, passive growth)
│   ├── ui.js           - Rendering and UI updates
│   ├── stages.js       - Stage progression system
│   └── main.js         - Event listeners and initialization
├── css/
│   ├── base.css        - Global styles, header, typography
│   ├── components.css  - Buttons, panels, upgrade styles
│   └── layout.css      - Fixed panels, responsive design
└── assets/
    └── .gitkeep
```

## Development Notes

### Running the Game
Open `index.html` directly in a browser. No build process or server required.

### Script Loading Order
Scripts must load in this order (enforced by index.html):
1. `config.js` - Constants needed by other modules
2. `state.js` - State object needed by all modules
3. `upgrades.js` - Upgrades array
4. `game.js` - Core logic
5. `ui.js` - Rendering functions
6. `stages.js` - Stage checks
7. `main.js` - Event listeners and initialization

### Dev Tools
Press the "⚙ Dev Unlock Dashboards" button to instantly unlock all 5 stages for testing.

### State Management Pattern
All state changes flow through:
1. Event listener (button click or interval)
2. Modify `state` object directly
3. Call `render()` to update DOM
4. Optional: `logEvent()` for narrative feedback

### Adding New Upgrades
Add object to `upgrades` array in `js/upgrades.js`:
```javascript
{
  id: 'unique-id',
  name: 'Display Name',
  cost: 100,           // Data cost
  unlock: 500,         // totalData threshold
  purchased: false,
  effect: () => {
    // Modify state here
    logEvent("Flavor text");
  }
}
```

### Adding New Stages
1. Add HTML section in `index.html` with `style="display:none;"`
2. Add threshold constant in `js/config.js` STAGE_THRESHOLDS
3. Add milestone check in `checkStageUnlocks()` in `js/stages.js`
4. Update `state.stage` and set milestone flag when unlocking

### CSS Organization
- **base.css**: Modify for global styling changes (colors, fonts, header)
- **components.css**: Modify for button and panel styles
- **layout.css**: Modify for positioning and responsive behavior

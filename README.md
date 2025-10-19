# Growth Engine AI

A browser-based incremental clicker game built for CS50 that simulates the progression of training and scaling an AI system.

## Overview

Growth Engine AI is an idle/incremental game where you grow an AI company from humble beginnings to potential technological singularity. Click to generate data, purchase upgrades, hire employees, and navigate the ethical challenges of AI development across 5 progressive stages.

### Game Features

- **Incremental Progression**: 5 distinct stages unlocking as you accumulate data
- **Strategic Upgrades**: 39+ upgrades across multiple categories (Education, Storage, Hardware, Tools, Ethics)
- **Branching Narrative**: Make key ethical decisions that affect your AI's development path
- **Passive Income**: Automated data generation through employees and users
- **Auto-AI System**: Let your AI make upgrade decisions autonomously
- **Model Quality Tracking**: Watch your AI evolve from simple patterns to potential meltdown
- **Global Competition**: Track competitors and manage user moderation

### The 5 Stages

1. **Stage 1** (0-500k data): Basic training and upgrades
2. **Stage 2** (500k+ data): Neural Network Dashboard with experimental features
3. **Stage 3** (2M+ data): Ethical branch decision - choose between Ethics or Efficiency
4. **Stage 4** (20M+ data): Global Systems Dashboard for managing users and competitors
5. **Stage 5** (99.9% Model Quality): Meltdown Monitor - approach the singularity

## Installation & Running

No installation or build process required! Simply:

1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. Start clicking "Train AI" to begin

```bash
# Clone the repository
git clone https://github.com/LuisEHuidobro/CS50.git
cd CS50

# Open in browser (macOS example)
open index.html
```

## Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Responsive design with fixed panels
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **Modular Architecture** - Separated concerns across 7 JS modules

## Project Structure

```
/
├── index.html          # Main entry point
├── README.md           # This file
├── CLAUDE.md           # Developer documentation
├── js/
│   ├── config.js       # Game constants and thresholds
│   ├── state.js        # Centralized game state
│   ├── upgrades.js     # All upgrade definitions
│   ├── game.js         # Core game mechanics
│   ├── ui.js           # Rendering and UI updates
│   ├── stages.js       # Stage progression logic
│   └── main.js         # Event handlers and initialization
├── css/
│   ├── base.css        # Global styles and typography
│   ├── components.css  # Button and panel styles
│   └── layout.css      # Positioning and responsive design
└── assets/             # Future assets directory
```

## Development

### Dev Tools

The game includes a developer button to unlock all stages instantly for testing:
- Click "⚙ Dev Unlock Dashboards" to access all content

### Code Organization

The codebase follows a modular pattern with clear separation of concerns:

- **Configuration**: All constants and thresholds centralized in `config.js`
- **State Management**: Single source of truth in `state.js`
- **UI Rendering**: Dedicated rendering functions in `ui.js`
- **Game Logic**: Core mechanics isolated in `game.js`
- **Modularity**: Each file has a single, well-defined responsibility

### Adding Content

**New Upgrades**: Add to the `upgrades` array in `js/upgrades.js`

**New Stages**: Update `STAGE_THRESHOLDS` in `js/config.js` and add unlock logic to `js/stages.js`

**Styling**: Modify appropriate CSS file (base/components/layout)

See `CLAUDE.md` for detailed developer documentation.

## Game Mechanics

### Resources

- **Data**: Primary currency earned by clicking and passive generation
- **Employees**: Increase passive data generation rate
- **Users**: Generate passive income, require moderation
- **Model Quality (MQ)**: Progression metric unlocking new content

### Upgrade Categories

1. **Education**: Increase click power through AI learning
2. **Storage**: Expand data capacity limits
3. **Hardware**: GPUs, TPUs, and supercomputers for production
4. **Tools**: Annotation, tracking, and debugging suites
5. **Ethics**: Failsafe protocols and autonomy systems
6. **Marketing**: User acquisition and growth
7. **Processing**: Faster passive data generation intervals

## CS50 Context

This project was created as part of Harvard's CS50 course to demonstrate:
- Vanilla JavaScript game development
- State management patterns
- Modular code organization
- Clean separation of concerns
- Responsive CSS design
- Interactive web applications

## License

Created for educational purposes as part of CS50.

## Author

Luis E. Huidobro
- GitHub: [@LuisEHuidobro](https://github.com/LuisEHuidobro)

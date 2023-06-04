import './style.css';

import Game from './Game';
import ThemeManager from './managers/ThemeManager';
import ScoreManager from './managers/Scoremanager';
import TimeManager from './managers/TimeManager';

ThemeManager.setup();
ScoreManager.setup();
TimeManager.setup();

const game = new Game();

game.runGameLoop();

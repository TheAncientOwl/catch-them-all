import './style.css';

import Game from './Game';
import ThemeManager from './managers/ThemeManager';
import ScoreManager from './managers/Scoremanager';

ThemeManager.setup();
ScoreManager.setup();

const game = new Game();

game.runGameLoop();

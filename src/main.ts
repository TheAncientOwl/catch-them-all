import './style.css';

import SceneRenderer from './SceneRenderer';

let scene = new SceneRenderer(true);

// loops updates
(function loop() {
  scene.render();

  requestAnimationFrame(loop);
})();

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';

import { Physics } from './systems/Physics.js';
import { Renderer } from './systems/Renderer.js';
import { Resizer } from './systems/Resizer.js';

import { Camera } from './components/Camera.js';
import { Scene } from './components/Scene.js';
import { LoungeScene } from './components/lounge/LoungeScene.js';
import { OrangeLoungeScene } from './components/orange/OrangeLoungeScene.js';

class World {
  constructor(container) {
    this.container = container;
    this.activeScene = 'lounge';
    this.clock = new THREE.Clock();

    this.camera = Camera.create();
    this.renderer = Renderer.create();
    container.append(this.renderer.domElement);

    this.resizer = new Resizer(container, this.camera, this.renderer);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.maxPolarAngle = Math.PI / 2.05;
    this.controls.minDistance = 2;
    this.controls.maxDistance = 12;

    this.scene = Scene.create();
    Scene.setBackgroundColor(this.scene, 0xe8e8e8);

    RectAreaLightUniformsLib.init();
  }

  async init() {
    await Physics.init();
    this.physicsWorld = Physics.createWorld();

    this.lounge = LoungeScene.create(this.physicsWorld);
    this.orange = OrangeLoungeScene.create();

    this.scene.add(this.lounge.group);
    this.scene.add(this.orange.group);

    this.orange.group.visible = false;

    this.#setupCamera('lounge');
    this.#setupSceneSelector();
  }

  #setupCamera(sceneName) {
    if (sceneName === 'lounge') {
      this.camera.position.set(3.5, 2.2, 4.5);
      this.controls.target.set(0, 1.2, -1.5);
    } else {
      this.camera.position.set(3, 2.5, 4);
      this.controls.target.set(0, 1.0, -1.0);
    }
    this.controls.update();
  }

  #setupSceneSelector() {
    const btnLounge = document.getElementById('btn-lounge');
    const btnOrange = document.getElementById('btn-orange');

    btnLounge.addEventListener('click', () => this.#switchScene('lounge'));
    btnOrange.addEventListener('click', () => this.#switchScene('orange'));
  }

  #switchScene(name) {
    this.activeScene = name;
    this.lounge.group.visible = name === 'lounge';
    this.orange.group.visible = name === 'orange';

    document.getElementById('btn-lounge').classList.toggle('active', name === 'lounge');
    document.getElementById('btn-orange').classList.toggle('active', name === 'orange');

    this.#setupCamera(name);
  }

  render() {
    this.renderer.setAnimationLoop(() => {
      const delta = this.clock.getDelta();

      if (this.activeScene === 'lounge') {
        this.lounge.curtain.update(delta, this.physicsWorld);
      }

      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    });
  }
}

export { World };

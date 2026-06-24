import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class Scene {
  static create() {
    return new THREE.Scene();
  }

  static setBackgroundColor(scene, color = 'lightgray') {
    scene.background = new THREE.Color(color);
    return scene;
  }

  static addGridHelper(scene, size = 10, divisions = 10) {
    const helper = new THREE.GridHelper(size, divisions);
    scene.add(helper);
    return { scene, helper };
  }

  static addAxesHelper(scene, size = 8) {
    const helper = new THREE.AxesHelper(size);
    scene.add(helper);
    return { scene, helper };
  }

  static async loadGLTF(url) {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(url);
    return gltf.scene;
  }
}

export { Scene };

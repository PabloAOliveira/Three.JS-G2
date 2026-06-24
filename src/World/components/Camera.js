import * as THREE from 'three';

class Camera {
  static create() {
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    return camera;
  }
}

export { Camera };

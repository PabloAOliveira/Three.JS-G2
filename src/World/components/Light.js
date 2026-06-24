import * as THREE from 'three';

class Light {
  static createAmbientLight(color = 0xffffff, intensity = 0.5) {
    return new THREE.AmbientLight(color, intensity);
  }

  static createDirectionalLight(x = 0, y = 2, z = 2, color = 0xffffff, intensity = 1) {
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    light.castShadow = true;
    light.shadow.mapSize.set(2048, 2048);
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 30;
    light.shadow.camera.left = -10;
    light.shadow.camera.right = 10;
    light.shadow.camera.top = 10;
    light.shadow.camera.bottom = -10;
    return light;
  }

  static createDirectionalLightHelper(light, size = 3) {
    const helper = new THREE.DirectionalLightHelper(light, size);
    helper.visible = false;
    return helper;
  }
}

export { Light };

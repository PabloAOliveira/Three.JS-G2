import * as THREE from 'three';

class CeilingLight {
  static create(roomInfo) {
    const group = new THREE.Group();
    group.name = 'CeilingLight';

    const stripLength = 3.2;
    const recessDepth = 0.08;
    const posZ = -1.5;
    const lightY = roomInfo.wallHeight - recessDepth - 0.05;

    const recess = new THREE.Mesh(
      new THREE.BoxGeometry(stripLength, recessDepth, 0.25),
      new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.5 })
    );
    recess.position.set(0, roomInfo.wallHeight - recessDepth / 2, posZ);
    group.add(recess);

    const emissiveMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 3.0,
      roughness: 0.1,
    });

    const strip = new THREE.Mesh(
      new THREE.BoxGeometry(stripLength - 0.1, 0.03, 0.15),
      emissiveMaterial
    );
    strip.position.set(0, roomInfo.wallHeight - recessDepth - 0.02, posZ);
    group.add(strip);

    const rectLight = new THREE.RectAreaLight(0xf0f8ff, 18, stripLength, 0.25);
    rectLight.position.set(0, lightY, posZ);
    rectLight.rotation.x = -Math.PI / 2;
    group.add(rectLight);

    const pointLight = new THREE.PointLight(0xf0f8ff, 22, 12);
    pointLight.position.set(0, lightY - 0.08, posZ);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.set(2048, 2048);
    pointLight.shadow.bias = -0.001;
    pointLight.shadow.camera.near = 0.5;
    pointLight.shadow.camera.far = 8;
    group.add(pointLight);

    for (const x of [-1.0, 1.0]) {
      const sideLight = new THREE.PointLight(0xf0f8ff, 10, 9);
      sideLight.position.set(x, lightY - 0.1, posZ);
      group.add(sideLight);
    }

    const glowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(stripLength * 1.2, 0.9),
      new THREE.MeshBasicMaterial({
        color: 0xf0f8ff,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
      })
    );
    glowPlane.rotation.x = Math.PI / 2;
    glowPlane.position.set(0, roomInfo.wallHeight - 0.01, posZ);
    group.add(glowPlane);

    return { group, light: pointLight, rectLight };
  }
}

export { CeilingLight };

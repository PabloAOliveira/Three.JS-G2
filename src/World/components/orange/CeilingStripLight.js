import * as THREE from 'three';

class CeilingStripLight {
  static create(roomInfo) {
    const group = new THREE.Group();
    group.name = 'CeilingStripLight';

    const stripLength = 3.5;
    const recessDepth = 0.08;

    const recess = new THREE.Mesh(
      new THREE.BoxGeometry(stripLength, recessDepth, 0.25),
      new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.5 })
    );
    recess.position.set(0, roomInfo.wallHeight - recessDepth / 2, -1.5);
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
    strip.position.set(0, roomInfo.wallHeight - recessDepth - 0.02, -1.5);
    group.add(strip);

    const rectLight = new THREE.RectAreaLight(0xfff8f0, 12, stripLength, 0.2);
    rectLight.position.set(0, roomInfo.wallHeight - recessDepth - 0.05, -1.5);
    rectLight.rotation.x = -Math.PI / 2;
    group.add(rectLight);

    const pointLight = new THREE.PointLight(0xfff8f0, 20, 10);
    pointLight.position.set(0, roomInfo.wallHeight - 0.15, -1.5);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.set(1024, 1024);
    group.add(pointLight);

    const glowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(stripLength * 1.2, 0.8),
      new THREE.MeshBasicMaterial({
        color: 0xfff5e6,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
      })
    );
    glowPlane.rotation.x = Math.PI / 2;
    glowPlane.position.set(0, roomInfo.wallHeight - 0.01, -1.5);
    group.add(glowPlane);

    return { group, light: pointLight, rectLight };
  }
}

export { CeilingStripLight };

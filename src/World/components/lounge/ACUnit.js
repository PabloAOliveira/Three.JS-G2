import * as THREE from 'three';

class ACUnit {
  static create() {
    const group = new THREE.Group();
    group.name = 'ACUnit';

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4c4a8,
      roughness: 0.6,
    });

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.3, 0.22),
      bodyMaterial
    );
    body.castShadow = true;
    group.add(body);

    const vent = new THREE.Mesh(
      new THREE.BoxGeometry(0.75, 0.08, 0.02),
      new THREE.MeshStandardMaterial({ color: 0xc4b498, roughness: 0.7 })
    );
    vent.position.set(0, -0.05, 0.12);
    group.add(vent);

    const display = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.04, 0.01),
      new THREE.MeshStandardMaterial({ color: 0x333333 })
    );
    display.position.set(0.3, 0.05, 0.12);
    group.add(display);

    group.position.set(-1.2, 2.85, -2.65);

    return group;
  }
}

export { ACUnit };

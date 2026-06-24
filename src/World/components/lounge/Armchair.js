import * as THREE from 'three';

class Armchair {
  static create() {
    const group = new THREE.Group();
    group.name = 'Armchair';

    const fabricMaterial = new THREE.MeshStandardMaterial({
      color: 0x5c3d2e,
      roughness: 0.9,
    });

    const seat = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.4, 0.85),
      fabricMaterial
    );
    seat.position.y = 0.35;
    seat.castShadow = true;
    seat.receiveShadow = true;
    group.add(seat);

    const back = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.75, 0.2),
      fabricMaterial
    );
    back.position.set(0, 0.75, -0.32);
    back.castShadow = true;
    group.add(back);

    const armGeometry = new THREE.BoxGeometry(0.18, 0.5, 0.85);
    const armLeft = new THREE.Mesh(armGeometry, fabricMaterial);
    armLeft.position.set(-0.42, 0.55, 0);
    armLeft.castShadow = true;
    group.add(armLeft);

    const armRight = armLeft.clone();
    armRight.position.x = 0.42;
    group.add(armRight);

    group.position.set(2.0, 0, -0.5);
    group.rotation.y = -Math.PI / 6;

    return group;
  }
}

export { Armchair };

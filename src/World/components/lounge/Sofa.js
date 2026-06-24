import * as THREE from 'three';

class Sofa {
  static create() {
    const group = new THREE.Group();
    group.name = 'Sofa';

    const leatherMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.35,
      metalness: 0.05,
    });

    const baseGeometry = new THREE.BoxGeometry(3.2, 0.45, 0.95);
    const base = new THREE.Mesh(baseGeometry, leatherMaterial);
    base.position.y = 0.25;
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);

    const backGeometry = new THREE.BoxGeometry(3.2, 0.7, 0.25);
    const back = new THREE.Mesh(backGeometry, leatherMaterial);
    back.position.set(0, 0.65, -0.35);
    back.castShadow = true;
    group.add(back);

    const ribCount = 8;
    for (let i = 0; i < ribCount; i++) {
      const rib = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.55, 0.26),
        new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.4 })
      );
      rib.position.set(-1.4 + i * 0.4, 0.65, -0.35);
      group.add(rib);
    }

    const armGeometry = new THREE.BoxGeometry(0.2, 0.55, 0.95);
    const armLeft = new THREE.Mesh(armGeometry, leatherMaterial);
    armLeft.position.set(-1.5, 0.5, 0);
    armLeft.castShadow = true;
    group.add(armLeft);

    const armRight = armLeft.clone();
    armRight.position.x = 1.5;
    group.add(armRight);

    group.position.set(0, 0, -2.0);

    return group;
  }
}

export { Sofa };

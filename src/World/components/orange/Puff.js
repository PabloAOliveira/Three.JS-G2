import * as THREE from 'three';

class Puff {
  static create() {
    const group = new THREE.Group();
    group.name = 'Puff';

    const fabricMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a8a8a,
      roughness: 0.85,
    });

    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.45, 0.4, 24),
      fabricMaterial
    );
    body.position.y = 0.2;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    const top = new THREE.Mesh(
      new THREE.CylinderGeometry(0.43, 0.45, 0.06, 24),
      fabricMaterial
    );
    top.position.y = 0.41;
    top.castShadow = true;
    group.add(top);

    group.position.set(-0.8, 0, 0.8);

    return group;
  }
}

export { Puff };

import * as THREE from 'three';

class SeatingPlatform {
  static create() {
    const group = new THREE.Group();
    group.name = 'SeatingPlatform';

    const platformMaterial = new THREE.MeshStandardMaterial({
      color: 0xc45a1a,
      roughness: 0.65,
    });

    const bottomShape = new THREE.Shape();
    bottomShape.moveTo(-2.5, -1.2);
    bottomShape.lineTo(2.5, -1.2);
    bottomShape.lineTo(2.5, 1.0);
    bottomShape.lineTo(0.5, 1.0);
    bottomShape.lineTo(-0.5, 0.3);
    bottomShape.lineTo(-2.5, 0.3);
    bottomShape.closePath();

    const bottomGeometry = new THREE.ExtrudeGeometry(bottomShape, {
      depth: 0.45,
      bevelEnabled: false,
    });
    bottomGeometry.rotateX(-Math.PI / 2);
    const bottom = new THREE.Mesh(bottomGeometry, platformMaterial);
    bottom.position.set(0, 0.45, -1.5);
    bottom.castShadow = true;
    bottom.receiveShadow = true;
    group.add(bottom);

    const topShape = new THREE.Shape();
    topShape.moveTo(-1.8, -0.8);
    topShape.lineTo(1.8, -0.8);
    topShape.lineTo(1.8, 0.6);
    topShape.lineTo(0.3, 0.6);
    topShape.lineTo(-0.3, 0.1);
    topShape.lineTo(-1.8, 0.1);
    topShape.closePath();

    const topGeometry = new THREE.ExtrudeGeometry(topShape, {
      depth: 0.4,
      bevelEnabled: false,
    });
    topGeometry.rotateX(-Math.PI / 2);
    const top = new THREE.Mesh(topGeometry, platformMaterial);
    top.position.set(0, 0.9, -1.5);
    top.castShadow = true;
    top.receiveShadow = true;
    group.add(top);

    const cutoutMaterial = new THREE.MeshStandardMaterial({ color: 0x8b3a0a });
    const cutoutPositions = [
      [-1.5, 0.55, -0.8],
      [1.2, 0.55, -0.5],
      [0, 0.55, -1.8],
      [-0.8, 1.0, -1.2],
      [1.0, 1.0, -1.5],
    ];

    for (const [x, y, z] of cutoutPositions) {
      const cutout = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.08, 0.06),
        cutoutMaterial
      );
      cutout.position.set(x, y, z);
      group.add(cutout);
    }

    return group;
  }
}

export { SeatingPlatform };

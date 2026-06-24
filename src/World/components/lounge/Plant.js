import * as THREE from "three";

class Plant {
  static create() {
    const group = new THREE.Group();
    group.name = "Plant";

    const potMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f5f5,
      roughness: 0.55,
    });

    const potBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.22, 0.55, 4),
      potMaterial
    );
    potBody.rotation.y = Math.PI / 4;
    potBody.position.y = 0.275;
    potBody.castShadow = true;
    potBody.receiveShadow = true;
    group.add(potBody);

    const potRim = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.06, 0.42),
      potMaterial
    );
    potRim.position.y = 0.55;
    potRim.castShadow = true;
    group.add(potRim);

    const trunkMaterial = new THREE.MeshStandardMaterial({
      color: 0x5c3d2e,
      roughness: 0.85,
    });

    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.045, 0.75, 8),
      trunkMaterial
    );
    trunk.position.set(0, 0.9, 0);
    trunk.castShadow = true;
    group.add(trunk);

    const leafMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d6a4f,
      roughness: 0.75,
      side: THREE.DoubleSide,
    });

    const foliageLevels = [
      { y: 1.05, scale: 0.55, spread: 0.18 },
      { y: 1.35, scale: 0.65, spread: 0.22 },
      { y: 1.65, scale: 0.75, spread: 0.25 },
      { y: 1.95, scale: 0.6, spread: 0.2 },
    ];

    for (const level of foliageLevels) {
      const cluster = new THREE.Group();
      cluster.position.y = level.y;

      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const leaf = new THREE.Mesh(
          new THREE.SphereGeometry(level.scale * 0.35, 8, 6),
          leafMaterial
        );
        leaf.scale.set(1.4, 0.35, 1.0);
        leaf.position.set(
          Math.cos(angle) * level.spread,
          0,
          Math.sin(angle) * level.spread
        );
        leaf.rotation.set(0.2, angle, 0.15);
        leaf.castShadow = true;
        cluster.add(leaf);
      }

      const centerLeaf = new THREE.Mesh(
        new THREE.SphereGeometry(level.scale * 0.3, 8, 6),
        leafMaterial
      );
      centerLeaf.scale.set(1.2, 0.4, 1.0);
      centerLeaf.castShadow = true;
      cluster.add(centerLeaf);

      group.add(cluster);
    }

    // Posição: x = esquerda(-)/direita(+), z = fundo(-)/frente(+)
    group.position.set(1.95, 0, -2.2);

    return group;
  }
}

export { Plant };

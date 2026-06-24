import * as THREE from 'three';

class OrangeRoom {
  static create() {
    const group = new THREE.Group();
    group.name = 'OrangeRoom';

    const roomWidth = 8;
    const roomDepth = 6;
    const wallHeight = 3.5;

    group.add(OrangeRoom.#createTiledFloor(roomWidth, roomDepth));

    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8621a,
      roughness: 0.75,
      side: THREE.DoubleSide,
    });

    const backWall = new THREE.Mesh(
      new THREE.PlaneGeometry(roomWidth, wallHeight),
      wallMaterial
    );
    backWall.position.set(0, wallHeight / 2, -roomDepth / 2);
    backWall.receiveShadow = true;
    group.add(backWall);

    const sideWall = new THREE.Mesh(
      new THREE.PlaneGeometry(roomDepth, wallHeight),
      wallMaterial
    );
    sideWall.rotation.y = Math.PI / 2;
    sideWall.position.set(-roomWidth / 2, wallHeight / 2, 0);
    sideWall.receiveShadow = true;
    group.add(sideWall);

    const ceilingMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.05,
    });
    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(roomWidth, roomDepth),
      ceilingMaterial
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, wallHeight, 0);
    ceiling.receiveShadow = true;
    group.add(ceiling);

    return { group, roomWidth, roomDepth, wallHeight };
  }

  static #createTiledFloor(width, depth) {
    const group = new THREE.Group();
    const tileSize = 0.65;
    const cols = Math.ceil(width / tileSize);
    const rows = Math.ceil(depth / tileSize);

    const tileMaterial = new THREE.MeshStandardMaterial({
      color: 0xeae6df,
      roughness: 0.35,
    });

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const tile = new THREE.Mesh(
          new THREE.PlaneGeometry(tileSize - 0.025, tileSize - 0.025),
          tileMaterial
        );
        tile.rotation.x = -Math.PI / 2;
        tile.position.set(
          -width / 2 + tileSize / 2 + col * tileSize,
          0.001,
          -depth / 2 + tileSize / 2 + row * tileSize
        );
        tile.receiveShadow = true;
        group.add(tile);
      }
    }

    return group;
  }
}

export { OrangeRoom };

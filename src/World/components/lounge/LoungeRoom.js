import * as THREE from 'three';

class LoungeRoom {
  static create() {
    const group = new THREE.Group();
    group.name = 'LoungeRoom';

    const roomWidth = 7;
    const roomDepth = 5.5;
    const wallHeight = 3.2;

    const floor = LoungeRoom.#createTiledFloor(roomWidth, roomDepth);
    group.add(floor);

    const backWall = LoungeRoom.#createWall(roomWidth, wallHeight, 0xf5f3ef);
    backWall.position.set(0, wallHeight / 2, -roomDepth / 2);
    group.add(backWall);

    const rightWall = LoungeRoom.#createWall(roomDepth, wallHeight, 0x1a1a1a);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(roomWidth / 2, wallHeight / 2, 0);
    group.add(rightWall);

    const leftWall = LoungeRoom.#createWall(roomDepth, wallHeight, 0xf5f3ef);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-roomWidth / 2, wallHeight / 2, 0);
    group.add(leftWall);

    const ceilingMaterial = new THREE.MeshStandardMaterial({
      color: 0xfafafa,
      roughness: 0.35,
      metalness: 0.04,
      side: THREE.DoubleSide,
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

  static #createWall(width, height, color) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.85,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    return mesh;
  }

  static #createTiledFloor(width, depth) {
    const group = new THREE.Group();
    const tileSize = 0.6;
    const cols = Math.ceil(width / tileSize);
    const rows = Math.ceil(depth / tileSize);

    const tileMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8d4ce,
      roughness: 0.4,
      metalness: 0.05,
    });

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const geometry = new THREE.PlaneGeometry(tileSize - 0.02, tileSize - 0.02);
        const tile = new THREE.Mesh(geometry, tileMaterial);
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

export { LoungeRoom };

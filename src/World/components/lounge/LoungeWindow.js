import * as THREE from 'three';

class LoungeWindow {
  static create() {
    const group = new THREE.Group();
    group.name = 'Window';

    const windowWidth = 2.8;
    const windowHeight = 1.4;
    const frameThickness = 0.08;
    const frameDepth = 0.1;

    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x88aacc,
      transparent: true,
      opacity: 0.35,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.6,
    });

    const topFrame = new THREE.Mesh(
      new THREE.BoxGeometry(windowWidth + frameThickness * 2, frameThickness, frameDepth),
      frameMaterial
    );
    topFrame.position.y = windowHeight / 2 + frameThickness / 2;
    group.add(topFrame);

    const bottomFrame = topFrame.clone();
    bottomFrame.position.y = -windowHeight / 2 - frameThickness / 2;
    group.add(bottomFrame);

    const leftFrame = new THREE.Mesh(
      new THREE.BoxGeometry(frameThickness, windowHeight, frameDepth),
      frameMaterial
    );
    leftFrame.position.x = -windowWidth / 2 - frameThickness / 2;
    group.add(leftFrame);

    const rightFrame = leftFrame.clone();
    rightFrame.position.x = windowWidth / 2 + frameThickness / 2;
    group.add(rightFrame);

    const mullionV = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, windowHeight, frameDepth * 0.8),
      frameMaterial
    );
    mullionV.position.x = 0;
    group.add(mullionV);

    const mullionH = new THREE.Mesh(
      new THREE.BoxGeometry(windowWidth, 0.04, frameDepth * 0.8),
      frameMaterial
    );
    group.add(mullionH);

    const paneW = windowWidth / 2 - 0.04;
    const paneH = windowHeight / 2 - 0.04;
    const panePositions = [
      [-paneW / 2 - 0.02, paneH / 2 + 0.02],
      [paneW / 2 + 0.02, paneH / 2 + 0.02],
      [-paneW / 2 - 0.02, -paneH / 2 - 0.02],
      [paneW / 2 + 0.02, -paneH / 2 - 0.02],
    ];

    for (const [px, py] of panePositions) {
      const pane = new THREE.Mesh(
        new THREE.PlaneGeometry(paneW, paneH),
        glassMaterial
      );
      pane.position.set(px, py, 0);
      group.add(pane);
    }

    group.position.set(0, 1.8, -2.74);

    return {
      group,
      windowWidth,
      windowHeight,
      topY: 1.8 + windowHeight / 2 + frameThickness,
    };
  }
}

export { LoungeWindow };

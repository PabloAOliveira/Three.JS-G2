import * as THREE from 'three';

class OrangeWindow {
  static create() {
    const group = new THREE.Group();
    group.name = 'OrangeWindow';

    const windowWidth = 4.0;
    const windowHeight = 1.6;
    const frameThickness = 0.1;
    const frameDepth = 0.12;

    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a2a3a,
      transparent: true,
      opacity: 0.7,
      roughness: 0.02,
      metalness: 0.2,
      reflectivity: 0.9,
    });

    const frames = [
      { w: windowWidth + frameThickness * 2, h: frameThickness, x: 0, y: windowHeight / 2 + frameThickness / 2 },
      { w: windowWidth + frameThickness * 2, h: frameThickness, x: 0, y: -windowHeight / 2 - frameThickness / 2 },
      { w: frameThickness, h: windowHeight, x: -windowWidth / 2 - frameThickness / 2, y: 0 },
      { w: frameThickness, h: windowHeight, x: windowWidth / 2 + frameThickness / 2, y: 0 },
    ];

    for (const f of frames) {
      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(f.w, f.h, frameDepth),
        frameMaterial
      );
      frame.position.set(f.x, f.y, 0);
      group.add(frame);
    }

    const paneW = windowWidth / 4 - 0.03;
    const paneH = windowHeight / 2 - 0.03;

    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 4; col++) {
        const px = -windowWidth / 2 + paneW / 2 + 0.03 + col * (paneW + 0.03);
        const py = row === 0
          ? paneH / 2 + 0.02
          : -paneH / 2 - 0.02;

        const pane = new THREE.Mesh(
          new THREE.PlaneGeometry(paneW, paneH),
          glassMaterial
        );
        pane.position.set(px, py, 0);
        group.add(pane);
      }
    }

    const hMullion = new THREE.Mesh(
      new THREE.BoxGeometry(windowWidth, 0.05, frameDepth * 0.8),
      frameMaterial
    );
    group.add(hMullion);

    for (let col = 1; col < 4; col++) {
      const px = -windowWidth / 2 + col * (windowWidth / 4);
      const vMullion = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, windowHeight, frameDepth * 0.8),
        frameMaterial
      );
      vMullion.position.set(px, 0, 0);
      group.add(vMullion);
    }

    group.position.set(0, 2.2, -2.94);

    return group;
  }
}

export { OrangeWindow };

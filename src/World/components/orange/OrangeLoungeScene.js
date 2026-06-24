import * as THREE from 'three';
import { OrangeRoom } from './OrangeRoom.js';
import { OrangeWindow } from './OrangeWindow.js';
import { SeatingPlatform } from './SeatingPlatform.js';
import { Puff } from './Puff.js';
import { CeilingStripLight } from './CeilingStripLight.js';
import { Light } from '../Light.js';

class OrangeLoungeScene {
  static create() {
    const group = new THREE.Group();
    group.name = 'OrangeLoungeScene';

    const room = OrangeRoom.create();
    group.add(room.group);

    group.add(OrangeWindow.create());
    group.add(SeatingPlatform.create());
    group.add(Puff.create());

    const stripLight = CeilingStripLight.create(room);
    group.add(stripLight.group);

    const ambient = Light.createAmbientLight(0xffe8d0, 0.25);
    group.add(ambient);

    const fillLight = Light.createDirectionalLight(-3, 4, 5, 0xfff0e0, 0.4);
    fillLight.position.set(-3, 4, 5);
    group.add(fillLight);

    return {
      group,
      lights: { ambient, strip: stripLight.light, fill: fillLight },
    };
  }
}

export { OrangeLoungeScene };

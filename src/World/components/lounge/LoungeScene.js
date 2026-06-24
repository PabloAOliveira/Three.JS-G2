import * as THREE from 'three';
import { LoungeRoom } from './LoungeRoom.js';
import { CeilingLight } from './CeilingLight.js';
import { LoungeWindow } from './LoungeWindow.js';
import { Curtain } from './Curtain.js';
import { Sofa } from './Sofa.js';
import { Armchair } from './Armchair.js';
import { Plant } from './Plant.js';
import { ACUnit } from './ACUnit.js';
import { Light } from '../Light.js';

class LoungeScene {
  static create(physicsWorld) {
    const group = new THREE.Group();
    group.name = 'LoungeScene';

    const room = LoungeRoom.create();
    group.add(room.group);

    const ceilingLight = CeilingLight.create(room);
    group.add(ceilingLight.group);

    const windowObj = LoungeWindow.create();
    group.add(windowObj.group);

    const curtain = Curtain.create(physicsWorld, windowObj);
    group.add(curtain.group);

    group.add(Sofa.create());
    group.add(Armchair.create());
    group.add(Plant.create());
    group.add(ACUnit.create());

    const ambient = Light.createAmbientLight(0xf0f4ff, 0.3);
    group.add(ambient);

    const fillLight = Light.createDirectionalLight(-2, 5, 4, 0xfff5ee, 0.2);
    fillLight.position.set(-2, 5, 4);
    group.add(fillLight);

    return {
      group,
      curtain,
      lights: { ambient, ceiling: ceilingLight.light, fill: fillLight },
    };
  }
}

export { LoungeScene };

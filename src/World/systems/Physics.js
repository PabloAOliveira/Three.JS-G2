import RAPIER from '@dimforge/rapier3d-compat';

class Physics {
  static async init() {
    await RAPIER.init();
    return RAPIER;
  }

  static createWorld() {
    return new RAPIER.World({ x: 0, y: -9.81, z: 0 });
  }
}

export { Physics, RAPIER };

import * as THREE from 'three';
import { RAPIER } from '../../systems/Physics.js';

class Curtain {
  static create(physicsWorld, windowInfo) {
    const group = new THREE.Group();
    group.name = 'Curtain';

    const blindWidth = windowInfo.windowWidth + 0.12;
    const blindMaxDrop = windowInfo.windowHeight + 0.1;
    const blindThickness = 0.025;
    const rollerRadius = 0.035;

    const rollerMaterial = new THREE.MeshStandardMaterial({
      color: 0xaaaaaa,
      roughness: 0.45,
      metalness: 0.15,
    });
    const roller = new THREE.Mesh(
      new THREE.CylinderGeometry(rollerRadius, rollerRadius, blindWidth, 20),
      rollerMaterial
    );
    roller.rotation.z = Math.PI / 2;
    group.add(roller);

    const blindMaterial = new THREE.MeshStandardMaterial({
      color: 0xb5b5b5,
      roughness: 0.92,
      side: THREE.DoubleSide,
    });

    const blindGeometry = new THREE.BoxGeometry(blindWidth, 1, blindThickness);
    const blindMesh = new THREE.Mesh(blindGeometry, blindMaterial);
    blindMesh.castShadow = true;
    blindMesh.receiveShadow = true;
    group.add(blindMesh);

    const bracketMaterial = new THREE.MeshStandardMaterial({ color: 0x999999, roughness: 0.5 });
    for (const x of [-blindWidth / 2 + 0.05, blindWidth / 2 - 0.05]) {
      const bracket = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.08, 0.06),
        bracketMaterial
      );
      bracket.position.set(x, 0.04, 0);
      group.add(bracket);
    }

    const anchorY = windowInfo.topY + 0.04;
    const worldZ = -2.68;
    group.position.set(0, anchorY, worldZ);

    const state = {
      direction: 1,
      speed: 0.35,
      minDrop: 0.06,
      maxDrop: blindMaxDrop * 0.88,
      currentDrop: blindMaxDrop * 0.5,
      anchorY,
      worldZ,
      blindMesh,
      roller,
      rollerRadius,
      collider: null,
    };

    const bodyDesc = RAPIER.RigidBodyDesc.kinematicPositionBased()
      .setTranslation(0, anchorY - state.currentDrop / 2, worldZ);
    const body = physicsWorld.createRigidBody(bodyDesc);

    const colliderDesc = RAPIER.ColliderDesc.cuboid(
      blindWidth / 2,
      state.currentDrop / 2,
      blindThickness / 2
    );
    state.collider = physicsWorld.createCollider(colliderDesc, body);

    Curtain.#applyDrop(state);

    return {
      group,
      body,
      state,
      update(delta, world) {
        state.currentDrop += state.direction * state.speed * delta;

        if (state.currentDrop >= state.maxDrop) {
          state.currentDrop = state.maxDrop;
          state.direction = -1;
        } else if (state.currentDrop <= state.minDrop) {
          state.currentDrop = state.minDrop;
          state.direction = 1;
        }

        Curtain.#applyDrop(state);

        body.setNextKinematicTranslation({
          x: 0,
          y: state.anchorY - state.currentDrop / 2,
          z: state.worldZ,
        });
        state.collider.setHalfExtents({
          x: blindWidth / 2,
          y: state.currentDrop / 2,
          z: blindThickness / 2,
        });

        world.step();
      },
    };
  }

  static #applyDrop(state) {
    state.blindMesh.scale.y = state.currentDrop;
    state.blindMesh.position.y = -state.currentDrop / 2;

    const rollAngle = (state.maxDrop - state.currentDrop) / state.rollerRadius;
    state.roller.rotation.x = rollAngle;
  }
}

export { Curtain };

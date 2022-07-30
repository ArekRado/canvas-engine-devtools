import {
  createSystem,
  AnyState,
  createTransform,
  defaultTransform,
  Entity,
  createMesh,
  defaultMesh,
  componentName,
  generateEntity,
  createEntity,
  Collider,
  getRigidBody,
  updateMesh,
  removeEntity,
} from '@arekrado/canvas-engine';
import { scale } from '@arekrado/vector-2d';
import { debugComponentName } from '../../debugComponentName';
import { RigidBodyContour } from '../../type';
import { colorRed } from '../../util/color';
import {
  createRigidBodyContour,
  removeRigidBodyContour,
  updateRigidBodyContour,
} from './rigidBodyContourCrud';

export const syncRigidBodyContoursWithRigidBodies = ({
  state,
}: {
  state: AnyState;
}): AnyState => {
  const rigidBodies: [Entity, Collider][] = Object.entries(
    state.component[componentName.rigidBody]
  );
  const rigidBodyContours: [Entity, RigidBodyContour][] = Object.entries(
    state.component[debugComponentName.rigidBodyContour] || {}
  );

  rigidBodies.forEach(([rigidBodyEntity, rigidBody]) => {
    const connectedContour = rigidBodyContours.find(
      ([rigidBodyContourEntity, rigidBodyContour]) =>
        rigidBodyContour.rigidBodyEntity === rigidBodyEntity
    );

    if (connectedContour) {
      state = updateRigidBodyContour({
        state,
        entity: connectedContour[0],
        update: () => ({}),
      });
    } else {
      const entity = generateEntity();
      state = createEntity({ state, entity });
      state = createRigidBodyContour({
        state,
        entity,
        data: {
          rigidBodyEntity,
        },
      });
    }
  });

  rigidBodyContours.forEach(([rigidBodyContourEntity, rigidBodyContour]) => {
    const hasCollider = rigidBodies.find(
      ([rigidBodyEntity, rigidBody]) =>
        rigidBodyEntity === rigidBodyContour.rigidBodyEntity
    );

    if (hasCollider === undefined) {
      state = removeEntity({
        state,
        entity: rigidBodyContourEntity,
      });
    }
  });

  return state;
};

export const rigidBodyContourSystem = (state: AnyState): AnyState =>
  createSystem<RigidBodyContour>({
    name: debugComponentName.rigidBodyContour,
    componentName: debugComponentName.rigidBodyContour,
    state,
    create: ({ state, entity, component }) => {
      state = createTransform({
        state,
        entity,
        data: defaultTransform({
          parentId: component.rigidBodyEntity,
        }),
      });

      state = createMesh({
        state,
        entity,
        data: defaultMesh({
          materialEntity: [],
          updatable: true,
          data: {
            type: 'lines',
            points: [
              [0, 0],
              [0, 2],
            ],
            colors: [colorRed, colorRed],
          },
        }),
      });

      return state;
    },
    update: ({ state, entity, component }) => {
      const rigidBody = getRigidBody({
        state,
        entity: component.rigidBodyEntity,
      });

      state = updateMesh({
        state,
        entity,
        update: (mesh) =>
          mesh.data.type === 'lines'
            ? {
                data: {
                  ...mesh.data,
                  points: [[0, 0], scale(1000, rigidBody?.force ?? [0, 0])],
                },
              }
            : {},
      });

      return state;
    },
  });

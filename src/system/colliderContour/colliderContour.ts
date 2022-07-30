import {
  createSystem,
  AnyState,
  createTransform,
  defaultTransform,
  Entity,
  getCollider,
  createMesh,
  defaultMesh,
  Color,
  componentName,
  generateEntity,
  createEntity,
  Collider,
  removeEntity,
  addEventHandler,
  AllEvents,
  CanvasEngineEvent,
  updateMesh,
  createAnimation,
  defaultAnimation,
  removeAnimation,
  CollisionEvent,
} from '@arekrado/canvas-engine';
import { Vector2D } from '@arekrado/vector-2d';
import { debugComponentName } from '../../debugComponentName';
import { ColliderContour } from '../../type';
import { colorGray6, colorWhite } from '../../util/color';
import { createColliderContour } from './colliderContourCrud';

export const syncColliderContoursWithColliders = ({
  state,
}: {
  state: AnyState;
}): AnyState => {
  const colliders: [Entity, Collider][] = Object.entries(
    state.component[componentName.collider]
  );
  const colliderContours: [Entity, ColliderContour][] = Object.entries(
    state.component[debugComponentName.colliderContour] || {}
  );

  colliders.forEach(([colliderEntity, collider]) => {
    const connectedContour = colliderContours.find(
      ([colliderContourEntity, colliderContour]) =>
        colliderContour.colliderEntity === colliderEntity
    );

    if (connectedContour) {
      // state = updateColliderContour({
      //   state,
      //   entity,
      //   data: {
      //     colliderEntity,
      //   },
      // });
    } else {
      const entity = generateEntity();
      state = createEntity({ state, entity });
      state = createColliderContour({
        state,
        entity,
        data: {
          colliderEntity,
          color: colorGray6,
        },
      });
    }
  });

  colliderContours.forEach(([colliderContourEntity, colliderContour]) => {
    const hasCollider = colliders.find(
      ([colliderEntity, collider]) =>
        colliderEntity === colliderContour.colliderEntity
    );

    if (hasCollider === undefined) {
      state = removeEntity({
        state,
        entity: colliderContourEntity,
      });
    }
  });

  return state;
};

const mapColliderToLines = ({
  collider,
  colliderContour,
}: {
  collider: Collider;
  colliderContour: ColliderContour;
}) => {
  let points: Vector2D[] = [];
  const data = collider.data[0];

  switch (data.type) {
    case 'line':
      points = [data.position, data.position2];
      break;
    case 'rectangle':
      points = [
        data.position,
        [data.position[0] + data.size[0], data.position[1]],
        [data.position[0] + data.size[0], data.position[1] + data.size[1]],
        [data.position[0], data.position[1] + data.size[1]],
      ];
      break;
    case 'polygon':
      points = data.verticles;
      break;
    case 'circle':
      const pointsLength = 15;
      points = Array.from({ length: pointsLength }).reduce<Vector2D[]>(
        (acc, _, i) => {
          const step = (Math.PI * 2) / (pointsLength - 1);
          const point: Vector2D = [
            Math.sin(step * i) * data.radius,
            Math.cos(step * i) * data.radius,
          ];

          return [...acc, point];
        },
        [] as Vector2D[]
      );
      break;
  }

  return {
    points,
    colors: points.reduce(
      (acc) => [...acc, colliderContour.color],
      [] as Color[]
    ),
  };
};

export const colliderContourSystem = (state: AnyState): AnyState => {
  addEventHandler((data: { state: AnyState; event: AllEvents }) => {
    if (data.event.type === CanvasEngineEvent.colliderCollision) {
      const collisionEvent = data.event as CollisionEvent;

      Object.entries(
        data.state.component[debugComponentName.colliderContour] ?? {}
      ).forEach(
        ([colliderContourEntity, colliderContour]: [
          Entity,
          ColliderContour
        ]) => {
          if (
            colliderContour.colliderEntity ===
              collisionEvent.payload?.collider1.entity ||
            colliderContour.colliderEntity ===
              collisionEvent.payload?.collider2.entity
          ) {
            data.state = removeAnimation({
              entity: colliderContourEntity,
              state: data.state,
            });

            data.state = createAnimation({
              entity: colliderContourEntity,
              state: data.state,
              data: defaultAnimation({
                isPlaying: true,
                deleteWhenFinished: true,
                properties: [
                  {
                    path: 'color',
                    component: debugComponentName.colliderContour,
                    entity: colliderContourEntity,
                    keyframes: [
                      {
                        duration: 300,
                        timingFunction: 'Linear',
                        valueRange: [colorWhite, colorGray6],
                      },
                    ],
                  },
                ],
              }),
            });
          }
        }
      );
    }

    return data.state;
  });

  return createSystem<ColliderContour>({
    name: debugComponentName.colliderContour,
    componentName: debugComponentName.colliderContour,
    state,
    create: ({ state, entity, component }) => {
      const collider = getCollider({
        state,
        entity: component.colliderEntity,
      });

      if (!collider) {
        return state;
      }

      state = createTransform({
        state,
        entity,
        data: defaultTransform({
          parentId: component.colliderEntity,
        }),
      });

      const { points, colors } = mapColliderToLines({
        collider,
        colliderContour: component,
      });

      state = createMesh({
        state,
        entity,
        data: defaultMesh({
          updatable: true,
          materialEntity: [],
          data: {
            type: 'lines',
            points,
            colors,
          },
        }),
      });

      return state;
    },
    update: ({ state, entity, component }) => {
      state = updateMesh({
        state,
        entity,
        update: (mesh) =>
          mesh.data.type === 'lines'
            ? {
                data: {
                  ...mesh.data,
                  colors: mesh.data.points.reduce(
                    (acc) => [...acc, component.color],
                    [] as Color[]
                  ),
                },
              }
            : {},
      });

      return state;
    },
  });
};

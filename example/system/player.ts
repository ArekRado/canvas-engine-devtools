import {
  CollideBox,
  Entity,
  getComponent,
  getEntity,
  Guid,
  setComponent,
  setEntity,
  Component,
  createSystem,
  State,
  componentName,
  CollideType,
  removeEntity,
} from '@arekrado/canvas-engine';
import {
  add,
  magnitude,
  scale,
  sub,
  vector,
  vectorZero,
} from '@arekrado/vector-2d';
import { Player } from '../component/player';
import { gameComponentName } from '../util/gameComponentName';

const getCollisionsWith = (
  entityName: string,
  collideBox: CollideBox,
  state: State
): CollideType[] =>
  collideBox.collisions.filter((collision) => {
    const entity = getEntity({
      entityId: collision.entityId,
      state,
    });

    return entity?.name === entityName;
  });

const gravity = vector(0, 20);

type JumpGravity = (params: {
  state: State;
  entity: Entity;
  player: Player;
  topCollide: CollideBox;
}) => State;
const jumpGravity: JumpGravity = ({ state, entity, player, topCollide }) => {
  let newState = state;
  if (player.isJumping) {
    const topCollisions = getCollisionsWith(
      gameComponentName.tile,
      topCollide,
      newState
    );

    if (topCollisions.length > 0) {
      return setComponent<Player>('player', {
        state: newState,
        data: {
          ...player,
          isJumping: false,
          jumpVelocity: vectorZero(),
        },
      });
    } else {
      const playerPosition = add(
        entity.position,
        scale(newState.time.delta / 1000, player.jumpVelocity)
      );

      const jumpVelocity = sub(player.jumpVelocity, gravity);

      newState = setEntity({
        state: newState,
        entity: {
          ...entity,
          position: playerPosition,
        },
      });

      newState = setComponent<Player>('player', {
        state: newState,
        data: {
          ...player,
          isJumping: magnitude(jumpVelocity) > 0,
          jumpVelocity,
        },
      });
    }
  }

  return newState;
};

type FallGravity = (params: {
  state: State;
  entity: Entity;
  player: Player;
  bottomCollide: CollideBox;
}) => State;
const fallGravity: FallGravity = ({ state, entity, player, bottomCollide }) => {
  let newState = state;

  const bottomCollisions = getCollisionsWith(
    gameComponentName.tile,
    bottomCollide,
    newState
  );

  if (player.isJumping === false && bottomCollisions.length === 0) {
    const playerPosition = sub(
      entity.position,
      scale(newState.time.delta / 1000, player.fallVelocity)
    );

    let fallVelocity = add(player.fallVelocity, gravity);

    newState = setEntity({
      state: newState,
      entity: {
        ...entity,
        position: playerPosition,
      },
    });

    newState = setComponent<Player>('player', {
      state: newState,
      data: {
        ...player,
        fallVelocity,
      },
    });
  }

  return newState;
};

type Move = (params: {
  state: State;
  entityId: Guid;
  player: Player;
  leftCollide: CollideBox;
  rightCollide: CollideBox;
  topCollide: CollideBox;
}) => State;
const move: Move = ({
  state,
  entityId,
  player,
  leftCollide,
  rightCollide,
  topCollide,
}) => {
  const entity = getEntity({ state, entityId });
  const sprite = getComponent(componentName.sprite, { state, entityId });
  let newState = state;

  const topCollisions = getCollisionsWith(
    gameComponentName.tile,
    topCollide,
    newState
  );
  const rightCollisions = getCollisionsWith(
    gameComponentName.tile,
    rightCollide,
    newState
  );
  const leftCollisions = getCollisionsWith(
    gameComponentName.tile,
    leftCollide,
    newState
  );

  if (entity && sprite) {
    // Jump
    if (
      topCollisions.length === 0 &&
      state.keyboard['w']?.isDown &&
      player.isJumping === false &&
      magnitude(player.fallVelocity) === 0
    ) {
      newState = setComponent<Player>('player', {
        state: newState,
        data: {
          ...player,
          isJumping: true,
          fallVelocity: vectorZero(),
          jumpVelocity: vector(0, 500),
        },
      });
    }

    // Move right
    if (rightCollisions.length === 0 && state.keyboard['d']?.isPressed) {
      newState = setEntity({
        state: newState,
        entity: {
          ...entity,
          position: add(entity.position, vector(3, 0)),
        },
      });

      newState = setComponent(componentName.sprite, {
        state: newState,
        data: {
          ...sprite,
          anchor: vector(0, 1),
          scale: vector(3, 3),
        },
      });
    }

    // Move left
    if (leftCollisions.length === 0 && state.keyboard['a']?.isPressed) {
      newState = setEntity({
        state: newState,
        entity: {
          ...entity,
          position: add(entity.position, vector(-3, 0)),
        },
      });

      newState = setComponent(componentName.sprite, {
        state: newState,
        data: {
          ...sprite,
          anchor: vector(0.67, 1),
          scale: vector(-3, 3),
        },
      });
    }
  }

  return newState;
};

type OnCollideWithGround = (params: {
  player: Player;
  bottomCollide: CollideBox;
  state: State;
  entity: Entity;
}) => State;
const onCollideWithGround: OnCollideWithGround = ({
  player,
  bottomCollide,
  state,
  entity,
}) => {
  let newState = state;
  const collisions = getCollisionsWith(
    gameComponentName.tile,
    bottomCollide,
    newState
  );

  if (player.jumpVelocity[1] <= 0 && collisions.length > 0) {
    const collisionEntity = getEntity({
      entityId: collisions[0].entityId,
      state: newState,
    });

    if (collisionEntity) {
      newState = setEntity({
        entity: {
          ...entity,
          position: vector(
            entity.position[0],
            collisionEntity.position[1] + 50
          ),
        },
        state: newState,
      });
    }

    newState = setComponent<Player>('player', {
      state: newState,
      data: {
        ...player,
        isJumping: false,
        fallVelocity: vectorZero(),
        jumpVelocity: vectorZero(),
      },
    });
  }
  return newState;
};
type OnCollideWithCarrot = (params: {
  player: Player;
  bottomCollide: CollideBox;
  state: State;
  entity: Entity;
}) => State;
const onCollideWithCarrot: OnCollideWithCarrot = ({
  player,
  bottomCollide,
  state,
  entity,
}) => {
  let newState = state;

  const bottomCollisions = getCollisionsWith(
    gameComponentName.carrot,
    bottomCollide,
    newState
  );

  if (player.jumpVelocity[1] <= 0 && bottomCollisions.length > 0) {
    newState = removeEntity({
      entityId: bottomCollisions[0].entityId,
      state: newState,
    });
  }
  return newState;
};

export const playerSystem = (state: State) =>
  createSystem<Component<Player>>({
    name: 'player',
    state,
    tick: ({ state, component: player }) => {
      const bottomCollide = getComponent<CollideBox>(componentName.collideBox, {
        entityId: player.bottomCollideId,
        state,
      });

      const leftCollide = getComponent<CollideBox>(componentName.collideBox, {
        entityId: player.leftCollideId,
        state,
      });

      const rightCollide = getComponent<CollideBox>(componentName.collideBox, {
        entityId: player.rightCollideId,
        state,
      });

      const topCollide = getComponent<CollideBox>(componentName.collideBox, {
        entityId: player.topCollideId,
        state,
      });

      const entity = getEntity({
        entityId: player.entityId,
        state,
      });

      if (
        bottomCollide &&
        entity &&
        leftCollide &&
        rightCollide &&
        topCollide
      ) {
        let newState = state;

        newState = jumpGravity({
          entity,
          state: newState,
          player,
          topCollide,
        });

        newState = fallGravity({
          entity,
          state: newState,
          player,
          bottomCollide,
        });

        newState = onCollideWithGround({
          player,
          bottomCollide,
          state: newState,
          entity,
        });

        newState = onCollideWithCarrot({
          player,
          bottomCollide,
          state: newState,
          entity,
        });

        newState = move({
          entityId: entity.id,
          state: newState,
          player,
          leftCollide,
          rightCollide,
          topCollide,
        });

        return newState;
      }
      return state;
    },
  });

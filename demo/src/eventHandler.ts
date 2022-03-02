import { ECSEvent } from '../../node_modules/@arekrado/canvas-engine';
import { State } from './type';

type AllEvents = ECSEvent<any, any>;

export const eventHandler = ({
  state,
  event,
}: {
  state: State;
  event: AllEvents;
}): State => {
  switch (
    event.type
    // Camera
    // case CameraEvent.Type.resize:
    //   return handleResize({ state, event });
  ) {
  }

  return state;
};

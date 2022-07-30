import { createComponentCrud } from '@arekrado/canvas-engine';
import { debugComponentName } from '../../debugComponentName';
import { Debug } from '../../type';

const crud = createComponentCrud<Debug>({
  name: debugComponentName.debug,
});

export const getDebug = crud.getComponent;
export const createDebug = crud.createComponent;
export const updateDebug = crud.updateComponent;
export const removeDebug = crud.removeComponent;

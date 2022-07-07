import { createComponentCrud } from '@arekrado/canvas-engine';
import { debugComponentName } from '../../debugComponentName';
import { ColliderContour } from '../../type';

const crud = createComponentCrud<ColliderContour>({
  name: debugComponentName.colliderContour,
});

export const getColliderContour = crud.getComponent;
export const createColliderContour = crud.createComponent;
export const updateColliderContour = crud.updateComponent;
export const removeColliderContour = crud.removeComponent;

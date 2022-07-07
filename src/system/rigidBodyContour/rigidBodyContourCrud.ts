import { createComponentCrud } from '@arekrado/canvas-engine';
import { debugComponentName } from '../../debugComponentName';
import { RigidBodyContour } from '../../type';

const crud = createComponentCrud<RigidBodyContour>({
  name: debugComponentName.rigidBodyContour,
});

export const getRigidBodyContour = crud.getComponent;
export const createRigidBodyContour = crud.createComponent;
export const updateRigidBodyContour = crud.updateComponent;
export const removeRigidBodyContour = crud.removeComponent;

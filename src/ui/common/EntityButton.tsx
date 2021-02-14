import { Entity } from '@arekrado/canvas-engine';
import React, { useContext } from 'react';
import { EditorContext } from '../../context/editor';
import { Button, ButtonProps } from './Button';

export type EntityInputProps = {
  entity: Entity;
  className?: string;
} & ButtonProps;

export const EntityButton: React.FC<EntityInputProps> = ({
  entity,
  ...props
}) => {
  const editorState = useContext(EditorContext);

  return (
    <Button
      {...props}
      onClick={() =>
        editorState.dispatch({ type: 'SetEntityId', payload: entity.id })
      }
      onMouseEnter={() =>
        editorState.dispatch({ type: 'SetHoveredEntityId', payload: entity.id })
      }
      onMouseLeave={() =>
        editorState.dispatch({ type: 'SetHoveredEntityId', payload: undefined })
      }
      className={`text-left ${props.className}`}
    >
      {entity.name}
    </Button>
  );
};

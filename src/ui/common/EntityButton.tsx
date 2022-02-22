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
        editorState.dispatch({ type: 'SetSelectedEntity', payload: entity })
      }
      onMouseEnter={() =>
        editorState.dispatch({ type: 'SetHoveredEntity', payload: entity })
      }
      onMouseLeave={() =>
        editorState.dispatch({ type: 'SetHoveredEntity', payload: undefined })
      }
      className={`text-left ${props.className}`}
    >
      {entity}
    </Button>
  );
};

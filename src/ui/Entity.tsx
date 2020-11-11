import {
  Guid,
  humanFriendlyEntity,
} from '@arekrado/canvas-engine/dist/util/uuid';
import React from 'react';

type EntityProps = {
  value: Guid;
  isHumanFriendly: boolean;
};
export const Entity: React.FC<EntityProps> = ({ value, isHumanFriendly }) => (
  <div className="truncate">
    {isHumanFriendly ? humanFriendlyEntity(value) : value}
  </div>
);

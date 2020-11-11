import React from 'react';
import { Input } from './Input';
import { Vector2D, vector } from '@arekrado/vector-2d';

type VectorProps = {
  value: Vector2D;
  onChange: (value: Vector2D) => void;
};
export const Vector: React.FC<VectorProps> = ({ value: [x, y], onChange }) => (
  <div className="flex">
    <Input
      inputClassName="flex-1"
      type="number"
      value={x}
      onChange={(event) =>
        onChange(vector(parseInt(event.target.value, 10), y))
      }
    />
    <Input
      inputClassName="flex-1"
      type="number"
      value={y}
      onChange={(event) =>
        onChange(vector(x, parseInt(event.target.value, 10)))
      }
    />
  </div>
);

import { Sprite as SpriteType } from '@arekrado/canvas-engine/dist/component';
import React, { useContext } from 'react';
import { AppContext } from '../../context/app';
import { Select } from '../common/Select';

type SpriteProps = {
  component: SpriteType;
};
export const Sprite: React.FC<SpriteProps> = ({ component }) => {
  const appState = useContext(AppContext);

  const setSpriteData = (data: Partial<SpriteType['data']>): void =>
    appState.dispatch({
      type: 'SetSpriteComponent',
      payload: {
        ...component,
        data: {
          ...component.data,
          ...data,
        },
      },
    });

  return (
    <div className="grid grid-cols-12 gap-1 mt-3">
      <div className="col-span-4"> src </div>
      <div className="col-span-8">
        {appState.asset.sprite.length === 0 ? (
          'Sprite assets are empty'
        ) : (
          <Select
            value={component.data.src}
            onChange={(e) => setSpriteData({ src: e.target.value })}
            options={appState.asset.sprite.map((sprite) => ({
              label: sprite.name,
              value: sprite.src,
              disabled: false,
            }))}
          />
        )}
      </div>
      <div className="col-span-12">
        <img src={component.data.src} />
      </div>
    </div>
  );
};

import { Sprite as SpriteType } from '@arekrado/canvas-engine';
import React, { useContext } from 'react';
import { AppContext } from '../../context/app';
import { InlineInput } from '../common/InlineInput';
import { InlineVector } from '../common/InlineVector';
import { Select } from '../common/Select';

type SpriteProps = {
  component: SpriteType;
};
export const Sprite: React.FC<SpriteProps> = ({ component }) => {
  const appState = useContext(AppContext);

  const setSpriteData = (data: Partial<SpriteType>): void =>
    appState.dispatch({
      type: 'SetSpriteComponent',
      payload: {
        ...component,
        ...data,
      },
    });

  return (
    <div className="flex flex-col mt-3">
      <div className="grid grid-cols-12 gap-1 mt-3">
        <div className="col-span-4"> src </div>
        <div className="col-span-8">
          {appState.asset.sprite.length === 0 ? (
            'Sprite assets are empty'
          ) : (
            <Select
              value={component.src}
              onChange={(e) => setSpriteData({ src: e.target.value })}
              options={appState.asset.sprite.map((sprite) => ({
                label: sprite.name,
                value: sprite.src,
                disabled: false,
              }))}
            />
          )}
        </div>
      </div>

      <InlineVector
        label="anchor"
        name="anchor"
        id="anchor"
        value={component.anchor}
        onChange={(e) => setSpriteData({ anchor: e })}
      />

      <InlineVector
        label="scale"
        name="scale"
        id="scale"
        value={component.scale}
        onChange={(e) => setSpriteData({ scale: e })}
      />

      <InlineInput
        label="rotation"
        name="rotation"
        id="rotation"
        value={component.rotation}
        onChange={(e) =>
          setSpriteData({ rotation: parseFloat(e.target.value) })
        }
      />

      <div className=" mt-3 w-12 h-12">
        <img src={component.src} />
      </div>
    </div>
  );
};

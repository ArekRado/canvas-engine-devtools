import React, { FC, useContext } from 'react';
import { Asset, Mouse, State, Time } from '@arekrado/canvas-engine';
import { ModalWrapper } from './ModalWrapper';
import { AppContext } from '../../context/app';
import { InlineInput } from '../common/InlineInput';
import { InlineVector } from '../common/InlineVector';
import { InlineCheckbox } from '../common/InlineCheckbox';

const TimeDetails: FC<{ time: Time }> = ({ time }) => (
  <>
    <div className="text-white mb-3">Time:</div>
    <InlineInput
      label="delta"
      name="delta"
      id="time.delta"
      value={time.delta}
      type="number"
      disabled={true}
      onChange={() => {}}
    />
    <InlineInput
      label="timeNow"
      name="timeNow"
      id="time.timeNow"
      value={time.timeNow}
      type="number"
      disabled={true}
      onChange={() => {}}
    />
    <InlineInput
      label="previousTimeNow"
      name="previousTimeNow"
      id="time.previousTimeNow"
      value={time.previousTimeNow}
      type="number"
      disabled={true}
      onChange={() => {}}
    />
  </>
);

const MouseDetails: FC<{ mouse: Mouse }> = ({ mouse }) => (
  <>
    <div className="text-white mb-3">Mouse:</div>
    <InlineInput
      label="buttons"
      name="buttons"
      id="mouse.buttons"
      value={mouse.buttons}
      type="number"
      disabled={true}
      onChange={() => {}}
    />
    <InlineVector
      label="position"
      name="position"
      id="mouse.position"
      value={mouse.position}
      disabled={true}
      onChange={() => {}}
    />
    <InlineCheckbox
      label="isMoving"
      name="isMoving"
      id="mouse.isMoving"
      value={mouse.isMoving}
      disabled={true}
      onChange={() => {}}
    />
    <InlineCheckbox
      label="isButtonUp"
      name="isButtonUp"
      id="mouse.isButtonUp"
      value={mouse.isButtonUp}
      disabled={true}
      onChange={() => {}}
    />
    <InlineCheckbox
      label="isButtonDown"
      name="isButtonDown"
      id="mouse.isButtonDown"
      value={mouse.isButtonDown}
      disabled={true}
      onChange={() => {}}
    />
    <div className="mb-3">{JSON.stringify(mouse.lastClick)}</div>
  </>
);

const AssetDetails: FC<{ asset: Asset }> = ({ asset }) => (
  <>
    <div className="text-white mb-3">Assets:</div>
    <div className="text-white mb-3">Assets Sprite:</div>
    <div className="mb-3">
      {asset.sprite.map((sprite) => (
        <div key={sprite.src} className="col-span-12 grid grid-cols-12">
          <div className="col-span-4">{sprite.name}</div>
          <div className="col-span-8">{sprite.src}</div>
        </div>
      ))}
    </div>
    <div className="text-white mb-3">Assets Blueprint:</div>
    <div className="mb-3">
      {asset.blueprint.map((blueprint) => (
        <div key={blueprint.name}>{blueprint.name}</div>
      ))}
    </div>
  </>
);

const SystemDetails: FC<{ system: State['system'] }> = ({ system }) => (
  <>
    <div className="text-white mb-3">Systems:</div>
    <div className="mb-3">
      {system.map((system, index) => (
        <div key={`${system.name}${index}`}>
          {system.priority} - {system.name}
        </div>
      ))}
    </div>
  </>
);

export const MoreStateDetailsModal: React.FC = () => {
  const appState = useContext(AppContext);

  return (
    <ModalWrapper name="moreStateDetails">
      {() => (
        <div className="flex flex-col">
          <InlineCheckbox
            label="isDebugInitialized"
            name="isDebugInitialized"
            id="appState.isDebugInitialized"
            value={appState.isDebugInitialized}
            disabled={true}
            onChange={() => {}}
          />
          <InlineCheckbox
            label="isDrawEnabled"
            name="isDrawEnabled"
            id="appState.isDrawEnabled"
            value={appState.isDrawEnabled}
            disabled={true}
            onChange={() => {}}
          />

          <TimeDetails time={appState.time} />
          <MouseDetails mouse={appState.mouse} />
          <AssetDetails asset={appState.asset} />
          <SystemDetails system={appState.system} />
        </div>
      )}
    </ModalWrapper>
  );
};

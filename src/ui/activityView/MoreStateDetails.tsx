import React, { FC, useContext } from 'react';
import { AnySystem, Mouse, Time } from '@arekrado/canvas-engine';
import { getTime } from '@arekrado/canvas-engine/system/time';
import { getMouse } from '@arekrado/canvas-engine/system/mouse';
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

const SystemDetails: FC<{ system: AnySystem[] }> = ({ system }) => (
  <>
    <div className="text-white mb-3">Systems:</div>
    <div className="mb-3">
      {[...system]
        .sort((a, b) => (a.priority > b.priority ? 1 : -1))
        .map((system, index) => (
          <div key={`${system.name}${index}`}>
            {system.priority} - {system.name}
          </div>
        ))}
    </div>
  </>
);

export const MoreStateDetailsName = 'MoreStateDetails';

export const MoreStateDetails: React.FC = () => {
  const appState = useContext(AppContext);
  const time = getTime({ state: appState });
  const mouse = getMouse({ state: appState });

  return (
    <div className="flex flex-1 flex-col m-2 overflow-y-auto">
      {/* <InlineCheckbox
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
      /> */}

      {time && <TimeDetails time={time} />}
      {mouse && <MouseDetails mouse={mouse} />}
      <SystemDetails system={appState.system} />
    </div>
  );
};
